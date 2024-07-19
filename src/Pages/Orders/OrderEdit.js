import { Link } from 'react-router-dom'

export default function OrderEdit () {
    return (
        <div className="container">
          <div className="page-inner">
            <div class="row">
              <form class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">Cập nhật đơn hàng</div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Mã khách hàng</label>
                          <select class="form-select">
                            <option>1</option>
                            <option>3</option>
                            <option>5</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Mã nhân viên</label>
                          <select class="form-select">
                            <option>1</option>
                            <option>3</option>
                            <option>5</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Mã bàn</label>
                          <select class="form-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                          <label>Trạng thái</label>
                          <select class="form-select">
                            <option>Đang chờ xác nhận</option>
                            <option>Đã xác nhận</option>
                            <option>Đã thanh toán</option>
                            <option>Đã hủy</option>
                            <option>Đã hoàn thành</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="">Tổng tiền</label>
                          <input type="number" class="form-control" id="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-action">
                    <div className="btn-group mt-3" role="group">
                      <button class="btn btn-success">Submit</button>
                      <button class="btn btn-danger">Cancel</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}