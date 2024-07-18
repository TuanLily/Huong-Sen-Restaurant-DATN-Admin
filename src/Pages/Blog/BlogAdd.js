import { Link } from 'react-router-dom'

export default function BlogAdd () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm bài viết</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="td">Tiêu đề bài viết</label>
                                            <input type="text" class="form-control" id="td" placeholder="Nhập tiêu đề"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="tg">Tác giả</label>
                                            <input type="text" class="form-control" id="tg" placeholder="Nhập tác giả"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="nd">Nội dung</label>
                                            <textarea class="form-control" id="nd" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label>Danh mục</label>
                                            <select class="form-select h-75">
                                                <option>Chia sẻ</option>
                                                <option>Mẹo vặt</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Ảnh poster</label><br/>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
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