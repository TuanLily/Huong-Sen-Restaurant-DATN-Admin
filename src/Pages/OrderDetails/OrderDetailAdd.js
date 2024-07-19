import { Link } from 'react-router-dom'

export default function OrderDetailAdd () {
    return (
        <div className="container">
          <div className="page-inner">
            <div class="row">
              <form class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">Thêm chi tiết đơn hàng</div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Mã đơn hàng</label>
                          <select class="form-select">
                            <option>1</option>
                            <option>3</option>
                            <option>5</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Mã sản phẩm</label>
                          <select class="form-select">
                            <option>1</option>
                            <option>3</option>
                            <option>5</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="">Số lượng</label>
                          <input type="number" class="form-control" id="" />
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                          <label for="">Giá bán</label>
                          <input type="number" class="form-control" id="" />
                        </div>
                        <div class="form-group">
                          <label for="">Thành tiền</label>
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