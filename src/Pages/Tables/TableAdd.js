import { Link } from "react-router-dom";

export default function TableAdd() {
  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <form className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Thêm bàn ăn</div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Số bàn</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nhập số bàn"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="code">Loại bàn</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder="Nhập loại bàn"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="price">Số lượng</label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Nhập số lượng người"
                      />
                    </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select className="form-select">
                        <option>Trống</option>
                        <option>Đặt trước</option>
                        <option>Đang sử dụng</option>
                        <option>Bảo trì</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <div className="btn-group mt-3" role="group">
                  <button className="btn btn-success">Submit</button>
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
