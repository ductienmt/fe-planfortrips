import React from 'react'
import "../IntroVehicle/introvehicle.css"
const IntroVehicle = () => {
  const cardfooter = [
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
    {
      imgURL: "https://th.bing.com/th/id/OIP.Njdt0hqu8WUuMuZ3W8TNvwHaEK?rs=1&pid=ImgDetMain",

    },
  ]
  return (
    <>
      <div className="introvehicle-body">
        <div className="introvehicle-header">
          <div className="content-header">
            <div className="text-header">
              <h4 style={{ color: "#F0F0F0", fontWeight: "bold", fontSize: "30px" }}>Tìm Hành Trình Chuyến Xe Hoàn Hảo Của bạn</h4>
              <small style={{ color: "#F0F0F0", fontSize: "25px" }}>Khám phá các lựa chọn du lịch xe buýt thoải mái và giá cả phải chăng trên khắp đất nước</small>
            </div>
            <div className="input-header">
              <div className='item-1'>
                <input type="text" name="" id="" />
              </div>
              <div className="item-2">
                <input type="date" />
              </div>
              <div className="item-3">
                <button>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CARD  */}
        <div className="footer-header">
          <div className="text-footer">
            <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>Các Chuyến Đi Yêu Thích</h3>
          </div>
          <div className="card-footer">
            {cardfooter.map((card, index) => (
              <div key={index} className="card-map">
                <div className='item-card'>
                  <img src={card.imgURL} alt="" />
                </div>
                <div className="item-text">
                  <b>ưetyui</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default IntroVehicle