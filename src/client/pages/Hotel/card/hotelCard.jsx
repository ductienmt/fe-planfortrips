// import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import "./hotelCard.css";
import { Link } from "react-router-dom";
import { convertToVND } from "../../../../utils/FormatMoney";
import RoomCard from "../roomCard/roomCard";

const HotelCard = ({
  img,
  name,
  address,
  totalRate,
  originalPrice,
  discountedPrice,
  hotelAmenities,
  contentButton,
  onClick,
  modalToogle,
  modalTarget,
}) => {
  // const originalPrice = 250000;
  // const discountedPrice = 200000;
  const convertToVNDDB = (price) => {
    return price + ".000VND ";
  };
  const hasDiscount = discountedPrice < originalPrice;
  return (
    <>
      <div className="card custom-card-hotel mb-3" style={{ height: "300px" }}>
        <div className="row g-0" style={{ height: "100%" }}>
          <div className="col-md-4">
            <img
              src={img}
              className="img-fluid rounded-start custom-img-hotel-card"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="card-title mb-0">{name}</h5>
                  <small className="hotel-adr">
                    <i className="fa-solid fa-map-pin me-3"></i>
                    <p className="mb-0">{address}</p>
                  </small>
                  <p className="card-text amenities d-flex">
                    {/* <small>
                      <i className="fa-solid fa-square-parking"></i>Bãi đỗ xe
                    </small>
                    <small>
                      <i className="fa-solid fa-wifi"></i>Wifi
                    </small>
                    <small>
                      <i className="fa-solid fa-person-swimming"></i>Hồ bơi
                    </small> */}
                    {hotelAmenities?.map((ha, index) => (
                      <small key={index}>
                        <img
                          src={ha.icon?.url}
                          alt=""
                          width={"20px"}
                          height={"20px"}
                        />
                        {ha.name}
                      </small>
                    ))}
                  </p>
                  <div className="feed-back-hotel d-flex">
                    <div className="start-feedback">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <span className="total-customer">
                      {totalRate} người đánh giá
                    </span>
                  </div>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                  <div className="row addFav-viewDe">
                    <div className="col-md-3">
                      <button className="">
                        <i className="fa-solid fa-heart-circle-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-9">
                      <button
                        type="button"
                        {...(onClick && { onClick })}
                        {...(modalTarget && { "data-bs-target": modalTarget })}
                        {...(modalToogle && { "data-bs-toggle": modalToogle })}
                      >
                        {contentButton}
                      </button>
                    </div>
                  </div>
                </div>

                <h6 className="col-md-4">
                  <div className="text">Chỉ từ</div>
                  <span className={`price ${hasDiscount ? "discounted" : ""}`}>
                    {convertToVNDDB(originalPrice)}
                  </span>
                  {/* <span>{originalPrice}</span> */}
                  <br />
                  {/* <span>{discountedPrice}</span> */}
                  {hasDiscount && (
                    <span className="new-price">
                      {convertToVNDDB(discountedPrice)}
                    </span>
                  )}
                  <br />
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HotelCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HotelCard;
