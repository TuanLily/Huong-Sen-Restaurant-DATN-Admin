import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteCommentBlog,
  fetchCommentBlog,
} from "../../Actions/CommentBlogActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { format } from "date-fns";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

import { getPermissions } from '../../Actions/GetQuyenHanAction';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export default function CommentBlogList() {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const commentBlogState = useSelector((state) => state.commentBlog);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const getQuyenHanState = useSelector(state => state.getQuyenHan);
  const permissions = getQuyenHanState.getQuyenHan || [];

  useEffect(() => {
      if (token) {
        const decodedToken = jwt_decode(token);
        const userIdFromToken = decodedToken.id;
        dispatch(getPermissions(userIdFromToken));  
      }
      const decodedToken = jwt_decode(token);
      const userIdFromToken = decodedToken.id;
      dispatch(getPermissions(userIdFromToken));
  }, [navigate, dispatch, token]);

  const hasPermission = (permissionName) => {
      return permissions.data && permissions.data.some(permission => permission.name == permissionName);
  };
  
  // const query = new URLSearchParams(location.search);
  const [open, setOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (blogId) {
      dispatch(fetchCommentBlog(blogId));
    }
  }, [dispatch, blogId]);


  const handleClickOpen = (commentId) => {
    setSelectedCommentId(commentId); // Lưu commentId khi mở dialog
    setOpen(true); // Mở dialog
  };

  // Đóng dialog xác nhận
  const handleClose = () => {
    setOpen(false); // Đóng dialog
    setSelectedCommentId(null); // Reset lại commentId
  };

  // Xác nhận xóa bình luận
  const handleConfirm = () => {
    if (selectedCommentId && blogId) {
      dispatch(deleteCommentBlog(selectedCommentId, blogId)); // Xóa comment với blogId và commentId
      handleClose();
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <h3 className="fw-bold mb-3">
          Quản lý bình luận blog cho bài viết #{blogId}
        </h3>
        <div className="card card-round">
          <div className="card-header">
            <div className="card-title">Danh sách bình luận</div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive text-center">
              <table className="table align-items-center mb-0">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Nội dung</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Ngày cập nhật</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {commentBlogState.loading && (
                    <tr>
                      <td colSpan="5">
                        <CustomSpinner />
                      </td>
                    </tr>
                  )}
                  {!commentBlogState.loading &&
                    commentBlogState.commentBlog.length === 0 && (
                      <tr>
                        <td colSpan="5">Không tìm thấy bình luận</td>
                      </tr>
                    )}
                  {!commentBlogState.loading &&
                    commentBlogState.commentBlog.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.content}</td>
                        <td>
                          {format(
                            new Date(item.created_at),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </td>
                        <td>
                          {format(
                            new Date(item.updated_at),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </td>
                        <td>
                          {hasPermission('Xóa bình luận bài viết') && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleClickOpen(item.id)} // Mở dialog và lưu commentId
                            >
                              Xóa
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DialogConfirm open={open} onClose={handleClose} onConfirm={handleConfirm} />
    </div>
  );
}
