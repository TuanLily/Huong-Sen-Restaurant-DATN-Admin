import { Link } from 'react-router-dom'

export default function ProductEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật sản phẩm</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label for="name">Tên sản phẩm</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên sản phẩm"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="code">Mã hiệu sản phẩm</label>
                                            <input type="text" className="form-control" id="code" placeholder="Nhập mã hiệu sản phẩm"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="price">Giá niêm yết</label>
                                            <input type="text" className="form-control" id="price" placeholder="Nhập giá niêm yết"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Danh mục</label>
                                            <select className="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label for="saleEmail">Giá khuyến mãi</label>
                                            <input type="text" className="form-control" id="saleEmail" placeholder="Nhập giá khuyến mãi"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlFile1">Ảnh sản phẩm</label><br/>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="description">Mô tả sản phẩm</label>
                                            <textarea className="form-control" id="description" rows="4"></textarea>
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
    )
}