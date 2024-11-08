import './AdminList.css'

function AdminList({ title }) {

    const adminListData = [
        {
            id: 1,
            imgUrl: "https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Phương Trang",
            category: "Vận Tải"
        },
        {
            id: 2,
            imgUrl: "https://images.pexels.com/photos/370473/pexels-photo-370473.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Mai Linh",
            category: "Taxi"
        },
        {
            id: 3,
            imgUrl: "https://images.pexels.com/photos/106885/pexels-photo-106885.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Sài Gòn Tour",
            category: "Du Lịch"
        },
        {
            id: 4,
            imgUrl: "https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Vietnam Airlines",
            category: "Hàng Không"
        },
        {
            id: 5,
            imgUrl: "https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Grab",
            category: "Vận Tải Công Nghệ"
        },
        {
            id: 6,
            imgUrl: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Hãng Xe Hoàng Long",
            category: "Vận Tải"
        },
        {
            id: 7,
            imgUrl: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Futa Bus Lines",
            category: "Xe Khách"
        },
        {
            id: 8,
            imgUrl: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Vinasun Taxi",
            category: "Taxi"
        }
    ];
    

    return (
        <>
  <div className="admin__list m-2">
            <div className="admin__list-title ">
                <h4>{title}</h4>
            </div>

            <div className="admin__list-data">
                <div className="admin__list-container">
                    {adminListData.map((item) => (
                        <div key={item.id} className="admin__list-item d-flex">
                            <div className="admin__list-item-img admin__w-20">
                                <img
                                    className="img-fluid rounded"
                                    src={item.imgUrl}
                                    alt={item.title}
                                />
                            </div>
                            <div className="admin__list-item-info admin__w-50">
                                <span className="admin__list-item-info-title">{item.title}</span>
                                <p className="admin__list-item-info-type">
                                    Thể loại: <span className="text-warning text-uppercase">{item.category}</span>
                                </p>
                            </div>

                            <div className="admin__list-item-operation admin__w-30">
                                <div className="admin__list-item-operation-container">
                                    <button className="btn btn-primary me-2">Thêm</button>
                                    <button className="btn btn-danger">Xóa</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
}

export default AdminList;