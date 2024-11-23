import React, { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import InfoIcon from '@mui/icons-material/Info';
import InputOption from "../../../Components/Input/InputOption"
import Dateform from "../../../Components/Input/DateForm"
import "../VehiclePage/vehiclepage.css"

const buslist = [
  {
    name: "Phương Trang",
    giodi: "2:00",
    gioden: "5:00",
    gia: "140.000",
    ghe: 10,
    danhgia: 5,
  },
  {
    name: "Phương Trang",
    giodi: "2:00",
    gioden: "5:00",
    gia: "140.000",
    ghe: 10,
    danhgia: 5,
  },
  {
    name: "Phương Trang",
    giodi: "2:00",
    gioden: "5:00",
    gia: "140.000",
    ghe: 10,
    danhgia: 5,
  },
  {
    name: "Phương Trang",
    giodi: "2:00",
    gioden: "5:00",
    gia: "140.000",
    ghe: 10,
    danhgia: 5,
  },
  {
    name: "Phương Trang",
    giodi: "2:00",
    gioden: "5:00",
    gia: "140.000",
    ghe: 10,
    danhgia: 5,
  },
  {
    name: "Phương Trang",
    giodi: "2:00",
    gioden: "5:00",
    gia: "140.000",
    ghe: 10,
    danhgia: 5,
  },
]
const VehiclePage = () => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
  };
  return (
    <>
      <div className="vehicle-header">
        <h3 style={{ fontWeight: "bold", color: "#005293" }}>Tìm chuyến xe</h3>
        <div>
          <InputOption />
        </div>
        <div>
          <Dateform />
        </div>
        <div>
          <button className="vehicle-search-button">Tìm kiếm</button>
        </div>
      </div>

      <div className='vehicle-body'>
        <div className='sidebar'>
          <b style={{ fontSize: "18px" }}>Sắp xếp theo</b>
          <hr />
          <div className="filter-sort">
            <label class="custom-checkbox">
              Giá tăng dần
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <hr />
            <label class="custom-checkbox">
              Giá giảm dần
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <hr />
            <label class="custom-checkbox">
              Giờ khởi hành sớm nhất
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <hr />
            <label class="custom-checkbox">
              Giờ khởi hành muộn nhấ
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
          <b style={{ fontSize: "18px" }}>Bộ lọc  </b>
          <hr />
          <b>Thời gian khởi hành</b>
          <div className="filter-date">
            <div>
              Từ <br />
              <select class="option-to" >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div>
              Đến <br />
              <select class="option-form">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <br />
          <b style={{ fontSize: "18px" }}> Khoảng giá </b>
          <div className='filter-price'>
            <b>0đ-100.000đ</b>
          </div>
          <b style={{ fontSize: "18px" }}> Đánh giá </b>
          <div className="filter-review">
            <div className="star-buttons">
              {Array.from({ length: 5 }, (_, index) => {
                const stars = index + 1;
                return (
                  <button
                    key={stars}
                    className={`star-button ${stars <= selectedStars ? 'active' : ''}`}
                    onClick={() => handleStarClick(stars)}
                  >
                    {stars} ⭐
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className='main-content'>
          {buslist.map((bus, index) => (
            <div key={index} className='card'>
              <div className='right'>
                <div className="item1">
                  <div>
                    <h4><b>{bus.giodi}</b></h4>
                  </div>
                  <div>
                    <ArrowRightAltIcon />
                  </div>
                  <div>
                    <h4><b>{bus.gioden}</b></h4>
                  </div>
                </div>
                <div className="item2">
                  <div>
                    <span><b style={{ fontSize: "25px" }}>{bus.name}</b></span> <b style={{ fontSize: "20px" }}>⭐{bus.danhgia}/5</b>
                  </div>
                  <br />
                  <div className='voucher'>
                    <a style={{ textDecoration: "none", fontSize: "15px", color: "#FF6613" }} href="">Voucher +</a>
                  </div>
                </div>
              </div>
              <div className="left">
                <div>
                  <h4 style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>{bus.gia}VND</h4>
                  <p>còn {bus.ghe} chỗ</p>
                </div>
                <div>
                  <InfoIcon />
                </div>
                <div>
                  <button>Đăt vé ngay</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default VehiclePage