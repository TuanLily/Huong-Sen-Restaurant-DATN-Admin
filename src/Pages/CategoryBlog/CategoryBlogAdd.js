import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCategoryBlog } from "../../Actions/BlogsCategoriesActions";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function CategoryBlogAdd() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const onSubmit = (data) => {
    const currentDate = new Date().toISOString();
    const categoryData = {
      ...data,
      status: 1,
      created_at: currentDate,
      updated_at: currentDate,
    };

    dispatch(addCategoryBlog(categoryData))
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
          navigate("/category-blog");
        }, 2000);
      ((error) => {
        console.error("Failed to add category blog:", error);
      });
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Thêm danh mục</div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="name">Tên danh mục</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nhập tên danh mục"
                        {...register("name", {
                          required: "Tên danh mục là bắt buộc",
                        })}
                      />
                      {errors.name && (
                        <p className="text-danger">{errors.name.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="status">Trạng thái</label>
                      <select
                        id="status"
                        className="form-control"
                        {...register("status")}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="btn-group mt-3" role="group">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/category-blog")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
          <SuccessAlert
            open={openSuccess}
            onClose={handleSuccessClose}
            message="Thêm danh mục thành công!"
            vertical="top"
            horizontal="right"
          />
        </div>
      </div>
    </div>
  );
}
