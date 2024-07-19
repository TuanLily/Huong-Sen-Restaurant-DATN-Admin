import { Link } from 'react-router-dom'

export default function PromotionDelete () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <h5 class="card-header">Xác nhận xóa bàn ăn</h5>
                            <div class="card-body">
                                <form action="process_delete.php" method="post">
                                    <p class="card-text">Bạn có chắc muốn xóa bàn ăn này?</p>
                                    <div class="text-center">
                                        <div className="btn-group mt-3" role="group">
                                            <button type="submit" class="btn btn-success mr-2" name="confirm" value="yes">Có, xóa bàn ăn</button>
                                            <button type="submit" class="btn btn-danger" name="confirm" value="no">Không, quay lại</button>
                                        </div>   
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}