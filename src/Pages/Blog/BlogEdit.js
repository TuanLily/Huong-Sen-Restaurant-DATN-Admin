import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlog, updateBlog } from "../../Actions/BlogActions";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { SuccessAlert } from "../../Components/Alert/Alert";
import { useForm } from "react-hook-form";
import { fetchCategoryBlog } from "../../Actions/BlogsCategoriesActions";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getPermissions } from "../../Actions/GetQuyenHanAction";
import { jwtDecode as jwt_decode } from "jwt-decode";

export default function BlogEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const getQuyenHanState = useSelector((state) => state.getQuyenHan);
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
      return (
          permissions.data &&
          permissions.data.some((permission) => permission.name == permissionName)
      );
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const blogState = useSelector((state) => state.blog);
  const blogCategoryState = useSelector((state) => state.categories);

  const [initialPoster, setInitialPoster] = useState(null);
  const [poster, setPoster] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // Track Quill content
  const [author, setAuthor] = useState(""); // Track author
  const [initialCategoryId, setInitialCategoryId] = useState(null); // Lưu id danh mục ban đầu

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      await dispatch(fetchBlog(id)); // Fetch the specific blog by ID
      await dispatch(fetchCategoryBlog());
      setLoading(false);
    };

    fetchBlogData();
  }, [dispatch, id]);

  useEffect(() => {
    const blog = blogState.blog.find((b) => b.id === parseInt(id));
    if (blog) {
      setValue("title", blog.title);
      setValue("blog_category_id", blog.blog_category_id);
      setInitialCategoryId(blog.blog_category_id); // Lưu lại ID danh mục ban đầu
      setInitialPoster(blog.poster);
      setPoster(blog.poster);
      setContent(blog.content); // Set Quill content
      setAuthor(blog.author); // Store the author's name
    }
  }, [blogState.blog, id, setValue]);

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const updatedData = {
      ...data,
      poster: poster || initialPoster, // Update poster if there's a new one
      content,
      author, // Keep the original author
    };

    try {
      await dispatch(updateBlog(id, updatedData));
      setOpenSuccess(true);
      reset();
      setTimeout(() => {
        navigate("/blogs");
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (fileNames) => {
    if (fileNames.length > 0) {
      setPoster(fileNames[0]);
      setValue("poster", fileNames[0]);
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

  const canViewCategories = hasPermission("Xem danh mục bài viết");

  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Chỉnh sửa bài viết</div>
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
                      {/* Display author but don't submit it */}
                      <label htmlFor="author">Tác giả</label>
                      <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={author}
                        disabled // Disable field to avoid modification
                      />
                    </div>
                   
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Danh mục</label>
                      {/* <select
                        className="form-select"
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
                      </select> */}
                      <select
                        className={`form-select ${!hasPermission("Xem danh mục bài viết") ? 'is-invalid' : ''}`} 
                        id="blog_category_id"
                        {...register("blog_category_id", {
                          required: hasPermission("Xem danh mục bài viết") ? "Vui lòng chọn danh mục!" : false,
                        })}
                        disabled={!hasPermission("Xem danh mục bài viết")}
                      >
                        {hasPermission("Xem danh mục bài viết") ? (
                          blogCategoryState.categories &&
                          blogCategoryState.categories.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        ) : (
                          <option value={blogState.blog[0]?.blog_category_id} disabled selected>
                            Bạn không có quyền xem danh mục
                          </option>
                        )}
                      </select>

                      {!hasPermission("Xem danh mục bài viết") && (
                        <p className="text-danger">Bạn không có quyền xem danh mục!</p>
                      )}

                      {errors.blog_category_id && (
                        <p className="text-danger">
                          {errors.blog_category_id.message}
                        </p>
                      )}

                       <div className="form-group">
                      <label htmlFor="poster">Ảnh poster</label>
                      <br />
                      <ImageUploadComponent
                        id="poster"
                        onImageUpload={handleImageUpload}
                      />
                      {initialPoster && (
                        <div>
                          <img
                            src={initialPoster}
                            alt="Poster"
                            style={{ maxWidth: "100px", marginTop: "10px" }}
                          />
                        </div>
                      )}
                    </div>
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
                  <button type="submit" className="btn btn-success">
                    Cập Nhật
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
            message="Cập nhật thông tin bài viết thành công!"
            vertical="top"
            horizontal="right"
          />
        </div>
      </div>
    </div>
  );
}
