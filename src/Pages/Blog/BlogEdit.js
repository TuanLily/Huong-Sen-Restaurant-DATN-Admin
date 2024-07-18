import { Link } from 'react-router-dom'

export default function BlogEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật bài viết</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label for="td">Tiêu đề bài viết</label>
                                            <input type="text" className="form-control" id="td" placeholder="Nhập tiêu đề"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="tg">Tác giả</label>
                                            <input type="text" className="form-control" id="tg" placeholder="Nhập tác giả"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="nd">Nội dung</label>
                                            <textarea className="form-control" id="nd" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label>Danh mục</label>
                                            <select className="form-select h-75">
                                                <option>Chia sẻ</option>
                                                <option>Mẹo vặt</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlFile1">Ảnh poster</label><br/>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
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