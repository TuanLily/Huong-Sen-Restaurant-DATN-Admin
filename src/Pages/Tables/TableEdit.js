import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { updateTable } from "../../Actions/TablesActions";
import { SuccessAlert, DangerAlert } from "../../Components/Alert/Alert";

export default function TableEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { table } = useSelector((state) => state.tables); // Giả sử bạn có `table` trong state

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: table
  });

  useEffect(() => {
    // Load table data if necessary
  }, [id]);

  const handleSuccessClose = () => {
    setOpenSuccess(false);
    navigate("/tables"); // Điều hướng sau khi đóng thông báo thành công
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(updateTable(id, data));
      setOpenSuccess(true);
      reset();
    } catch (error) {
      setErrorMessage(error.message);
      setOpenError(true);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Cập Nhật Bàn Ăn</div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="number">Số Bàn</label>
                      <input
                        type="number"
                        className="form-control"
                        id="number"
                        placeholder="Nhập số bàn"
                        {...register("number", {
                          required: "Số bàn là bắt buộc",
                          valueAsNumber: true,
                          min: { value: 0, message: "Số bàn không được âm" },
                        })}
                      />
                      {errors.number && <p className="text-danger">{errors.number.message}</p>}
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="capacity">Số Lượng Người Tối Đa</label>
                      <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        placeholder="Nhập số lượng người tối đa"
                        {...register("capacity", {
                          required: "Số lượng người tối đa là bắt buộc",
                          valueAsNumber: true,
                          min: { value: 0, message: "Số lượng người không được âm" },
                          max: { value: 8, message: "Số lượng người không được quá 8 người" },
                        })}
                      />
                      {errors.capacity && <p className="text-danger">{errors.capacity.message}</p>}
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="status">Trạng Thái</label>
                      <select
                        id="status"
                        className="form-control"
                        {...register("status", { required: "Trạng thái là bắt buộc" })}
                      >
                        <option value="1">Bàn trống</option>
                        <option value="0">Có khách</option>
                      </select>
                      {errors.status && <p className="text-danger">{errors.status.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="btn-group mt-3" role="group">
                  <button type="submit" className="btn btn-success">Cập Nhật</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/tables")}
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
            message="Cập nhật bàn ăn thành công!"
            vertical="top"
            horizontal="right"
          />
          <DangerAlert
            open={openError}
            onClose={handleErrorClose}
            message={errorMessage}
            vertical="top"
            horizontal="right"
          />
        </div>
      </div>
    </div>
  );
}
