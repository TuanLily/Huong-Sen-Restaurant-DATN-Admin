import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";
import Picker from "emoji-picker-react";

export default function UserChatsList() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const selectedAdminUser = JSON.parse(localStorage.getItem("user_admin"));

  // Lấy tất cả tin nhắn và nhóm chúng
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp", "desc")),
      (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));

        // Nhóm tin nhắn theo chatId
        const groupedMessages = messagesData.reduce((acc, message) => {
          const key = message.chatId;
          if (!acc[key]) {
            acc[key] = {
              chatId: message.chatId,
              fullname: message.fullname,
              tel: message.tel,
              messages: [],
              timestamp: message.timestamp,
              lastMessage: message.text,
              lastMessageRole: message.role,
            };
          }
          acc[key].messages.push(message);
          // Cập nhật timestamp và lastMessage nếu tin nhắn này mới hơn
          if (message.timestamp > acc[key].timestamp) {
            acc[key].timestamp = message.timestamp;
            acc[key].lastMessage = message.text;
            acc[key].lastMessageRole = message.role;
          }
          return acc;
        }, {});

        // Sắp xếp các nhóm tin nhắn theo timestamp mới nhất
        const sortedGroupedMessages = Object.values(groupedMessages)
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((group) => ({
            ...group,
            // Lấy thông tin của tin nhắn khách hàng gần nhất
            customerInfo:
              group.messages.find((msg) => msg.role === "customer") || {},
          }));

        setMessages(sortedGroupedMessages);
      },
      (error) => {
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Lấy tin nhắn cho cuộc trò chuyện được chọn
  useEffect(() => {
    if (selectedUser) {
      const chatId = selectedUser.chatId;
      const messagesCollection = collection(db, "messages");
      const q = query(
        messagesCollection,
        where("chatId", "==", chatId),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const chatMessagesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
          }));
          setChatMessages(chatMessagesData);
        },
        (error) => {
          console.error("Lỗi khi lấy tin nhắn chat:", error);
        }
      );

      return () => unsubscribe();
    }
  }, [selectedUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatMessageTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Thời gian không hợp lệ";
    }

    const date = new Date(timestamp);
    const now = new Date();
    const timeDifference = now - date;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 1) {
      return "Mới nhất";
    } else if (minutesDifference < 60) {
      return `${minutesDifference} phút trước`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} giờ trước`;
    } else {
      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  };

  const filteredMessages = messages.filter((group) => {
    // Kiểm tra xem group có customerInfo không
    if (!group.customerInfo) {
      return false;
    }

    // Lấy tên khách hàng từ customerInfo
    const customerName = group.customerInfo.fullname || "Không có tên cần tìm";

    // Tìm kiếm dựa trên tên khách hàng
    return customerName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser && selectedAdminUser) {
      // Sử dụng thông tin của khách hàng để tạo chatId
      const chatId =
        selectedUser.chatId ||
        `${selectedUser.customerInfo.fullname}_${selectedUser.customerInfo.tel}`;

      const newMessageData = {
        text: newMessage,
        timestamp: new Date(),
        role: "admin",
        fullname: selectedAdminUser.fullname,
        username: selectedAdminUser.username,
        tel: selectedAdminUser.tel,
        status: "sending",
        chatId: chatId,
      };

      setChatMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage("");

      try {
        const docRef = await addDoc(collection(db, "messages"), {
          ...newMessageData,
          timestamp: serverTimestamp(),
          status: "sent",
        });

        setChatMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.timestamp === newMessageData.timestamp
              ? { ...msg, status: "sent", id: docRef.id }
              : msg
          )
        );
      } catch (error) {
        console.error("Error sending message: ", error);
        // Optionally update the message status to 'error' here
        setChatMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.timestamp === newMessageData.timestamp
              ? { ...msg, status: "error" }
              : msg
          )
        );
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="container">
      <div className="page-inner bg-light rounded p-4 shadow-sm">
        <div className="d-flex align-items-center flex-column flex-md-row mb-4">
          <div>
            <h3 className="fw-bold mb-2">Quản lý chat khách hàng</h3>
            <h6 className="text-muted mb-3">Hương Sen Admin Dashboard</h6>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4 p-3">
            <div
              className="border-start bg-white"
              style={{ height: "640px", overflowY: "auto" }} // Tùy chỉnh kích thước khung hiển thị tài khoản
            >
              <div
                className="sticky-top bg-light p-3"
                style={{ top: 0, zIndex: 100 }}
              >
                <h5 className="fw-bold mb-3"># Danh sách tin nhắn</h5>
                <form
                  className="form-action"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm..."
                    style={{ width: "100%" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>
              <div className="list-group">
                {filteredMessages.map((group, i) => (
                  <Link
                    to={`/user-chats?uid=${group.customerInfo.uid || ""}`}
                    className="list-group-item list-group-item-action d-flex align-items-center p-3 border-bottom"
                    key={i}
                    onClick={() => setSelectedUser(group)}
                  >
                    <img
                      src={
                        group.customerInfo.avatar ||
                        "../../Assets/Images/profile.jpg"
                      }
                      alt="Avatar"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0">
                        <strong>
                          {group.customerInfo.fullname || "Unknown"}
                        </strong>{" "}
                        {group.lastMessageRole !== "admin" && (
                          <i
                            className="fa-solid fa-circle-dot"
                            style={{ color: "blue", fontSize: "small" }}
                          ></i>
                        )}
                      </p>
                      <small className="text-muted">
                        {group.lastMessageRole === "admin" ? "Bạn: " : ""}
                        {group.lastMessage}
                      </small>
                    </div>
                    <span className="text-muted ms-auto">
                      {formatMessageTimestamp(group.timestamp)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="border bg-white rounded">
              <div className="d-flex align-items-center p-3 border-bottom">
                <img
                  src={"../../Assets/Images/profile.jpg"}
                  alt="Avatar"
                  className="me-3 rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
                <p className="mb-0">
                  <strong>
                    {selectedUser
                      ? selectedUser.customerInfo?.fullname || "Unknown"
                      : "Chọn tài khoản để chat"}
                  </strong>
                </p>
                <div className="ms-auto">
                  <div className="dropdown">
                    <button
                      className="btn btn-light"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          Kết thúc trò chuyện
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          <span className="text-danger">Xóa lịch sử chat</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="d-flex flex-column border"
                style={{ height: "500px", overflowY: "auto" }}
              >
                {chatMessages.map((message, index) => (
                  <div
                    key={message.id || index}
                    className={`d-flex ${
                      message.role === "admin"
                        ? "justify-content-end"
                        : "justify-content-start"
                    } mb-3 p-2`}
                  >
                    <div
                      className={`d-flex ${
                        message.role === "admin"
                          ? "flex-row-reverse"
                          : "flex-row"
                      } align-items-end`}
                    >
                      <img
                        src={
                          message.role === "admin"
                            ? "../../Assets/Images/huong-sen-logo.png"
                            : message.avatar ||
                              "../../Assets/Images/profile.jpg"
                        }
                        alt={`${message.role} Avatar`}
                        className="rounded-circle mx-2"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div
                        className={`d-flex flex-column ${
                          message.role === "admin"
                            ? "align-items-end"
                            : "align-items-start"
                        }`}
                      >
                        <div
                          className={`${
                            message.role === "admin"
                              ? "bg-warning text-dark"
                              : "bg-light"
                          } p-3 rounded`}
                          style={{ maxWidth: "300px", wordWrap: "break-word" }}
                        >
                          <small className="text-muted mb-1 d-block">
                            {message.role === "admin"
                              ? "Nhà Hàng Hương Sen"
                              : message.fullname}
                          </small>
                          <p className="mb-0">{message.text}</p>
                        </div>
                        <small className="text-muted mt-1">
                          {message.role === "admin" && (
                            <span className="me-2">
                              {message.status === "sending"
                                ? "Đang gửi..."
                                : "Đã gửi" + " •"}
                            </span>
                          )}
                          {formatMessageTimestamp(message.timestamp)}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {selectedUser && (
                <div className="d-flex align-items-center p-3 border-top bg-light">
                  <input
                    type="text"
                    className="form-control me-3"
                    placeholder="Nhập nội dung..."
                    style={{ flex: 1 }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="btn btn-light me-2"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    😊
                  </button>
                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      style={{
                        position: "absolute",
                        bottom: "-60px",
                        right: "45px",
                      }}
                    >
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
