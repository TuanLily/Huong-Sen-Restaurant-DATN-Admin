import { Link } from 'react-router-dom'

export default function ProductAdd () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm sản phẩm</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="name">Tên sản phẩm</label>
                                            <input type="text" class="form-control" id="name" placeholder="Nhập tên sản phẩm"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="code">Mã hiệu sản phẩm</label>
                                            <input type="text" class="form-control" id="code" placeholder="Nhập mã hiệu sản phẩm"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Giá niêm yết</label>
                                            <input type="text" class="form-control" id="price" placeholder="Nhập giá niêm yết"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Danh mục</label>
                                            <select class="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="saleEmail">Giá khuyến mãi</label>
                                            <input type="text" class="form-control" id="saleEmail" placeholder="Nhập giá khuyến mãi"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Ảnh sản phẩm</label><br/>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="description">Mô tả sản phẩm</label>
                                            <textarea class="form-control" id="description" rows="4"></textarea>
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
    )
}