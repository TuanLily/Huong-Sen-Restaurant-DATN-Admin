import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { fetchCategoryBlog } from "../../Actions/BlogsCategoriesActions";
import { addBlog } from "../../Actions/BlogActions";
import { SuccessAlert } from "../../Components/Alert/Alert";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

export default function BlogAdd() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const blogCategoryState = useSelector((state) => state.categories);
  const navigate = useNavigate();

  const [poster, setPoster] = useState("");
  const [content, setContent] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoryBlog());

    // Function to get the user's full name from the token and localStorage
    const getValue = () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken); // Correct usage of jwtDecode

        const storedProfile = localStorage.getItem("user_admin");
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);

          // Set the author's username automatically in a hidden input
          setValue("author", parsedProfile.username);
        }
      }
    };

    getValue(); // Call the function on component load
  }, [dispatch, setValue]);

  const handleImageUpload = (fileNames) => {
    if (fileNames.length > 0) {
      setPoster(fileNames[0]);
    }
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    data.poster = poster;
    data.content = content;

    try {
      await dispatch(addBlog(data));
      setOpenSuccess(true);
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (error) {
      console.error("Error adding blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["align", { align: [] }],
      ["clean"],
    ],
  };

  if (loading) {
    return (
      <div className="container">
        <CustomSpinner />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Thêm bài viết</div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Tiêu đề bài viết</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Nhập tiêu đề"
                        {...register("title", {
                          required: "Tiêu đề là bắt buộc",
                        })}
                      />
                      {errors.title && (
                        <p className="text-danger">{errors.title.message}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="poster">Ảnh poster</label>
                      <br />
                      <ImageUploadComponent
                        id="poster"
                        onImageUpload={handleImageUpload}
                      />
                    </div>

                    <input
                      type="hidden"
                      {...register("author", {
                        required: "Tác giả là bắt buộc",
                      })}
                    />
                    {errors.author && (
                      <p className="text-danger">{errors.author.message}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Danh mục</label>
                      {/* Add the form-control class to make it consistent */}
                      <select
                        className="form-control"
                        id="blog_category_id"
                        {...register("blog_category_id", {
                          required: "Vui lòng chọn danh mục!",
                        })}
                      >
                        {blogCategoryState.categories &&
                          blogCategoryState.categories.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      {errors.blog_category_id && (
                        <p className="text-danger">
                          {errors.blog_category_id.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="content">Nội dung</label>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="form-control"
                        modules={modules}
                      />
                      {errors.content && (
                        <p className="text-danger">{errors.content.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="btn-group mt-3" role="group">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    Thêm mới
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/blogs?page=1")}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </form>
          <SuccessAlert
            open={openSuccess}
            onClose={handleSuccessClose}
            message="Thêm bài viết thành công!"
            vertical="top"
            horizontal="right"
          />
        </div>
      </div>
    </div>
  );
}
