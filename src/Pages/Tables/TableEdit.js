import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTable } from '../../Actions/TablesActions';
import { SuccessAlert, DangerAlert } from '../../Components/Alert/Alert';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

export default function TableEdit() {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tables = useSelector(state => state.tables.tables || []);
  const tableState = tables.find((table) => table.id === parseInt(id));

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true); // Start spinner when loading data
      if (tableState) {
        setValue('number', tableState.number);
        setValue('capacity', tableState.capacity);
        setValue('status', tableState.status);
      }
      setLoading(false); // Stop spinner when data is loaded
    };

    fetchTable();
  }, [tableState, setValue]);

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const onSubmit = async (data) => {
    if (data.capacity > 8) {
      setErrorMessage("Số lượng người không được quá 8 người");
      setOpenError(true);
      return;
    }

    setLoading(true);
    const updatedData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    try {
      await dispatch(updateTable(id, updatedData));
      setOpenSuccess(true);
      reset();
      setTimeout(() => {
        navigate('/tables');
      }, 2000); // Navigate after 2 seconds to let user see the success message
    } catch (error) {
      console.error('Error updating table:', error);
      setErrorMessage(error.message);
      setOpenError(true);
    } finally {
      setLoading(false); // Stop spinner when done
    }
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
                <div className="card-title">Chỉnh Sửa Bàn Ăn</div>
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
                          validate: value => !isNaN(value) || "Số bàn phải là số"
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
                        {...register('capacity', {
                          required: 'Số lượng người tối đa là bắt buộc',
                          valueAsNumber: true,
                          validate: {
                            numberCheck: value => !isNaN(value) || "Số lượng người tối đa phải là số",
                            maxCapacity: value => value <= 8 || "Số lượng người không được quá 8 người"
                          }
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
                        {...register('status', { required: 'Trạng thái là bắt buộc' })}
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
                  <button type="submit" className="btn btn-success">Cập nhật</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate('/tables')}
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
