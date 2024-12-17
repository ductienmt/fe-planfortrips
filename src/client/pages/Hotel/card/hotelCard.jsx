import PropTypes from "prop-types";
import "./hotelCard.css";
import { Star } from "../../../../admin/pages/Components/Star";
import SvgIcon from "./svgIcon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
const HotelCard = ({
  item,
  onClick,
  modalTarget,
  modalToogle,
  contentButton,
  dateDepart = null,
  dateReturn = null,
}) => {
  const navigate = useNavigate();
  const convertToVNDDB = (price) => {
    return price + ".000VND ";
  };
  return (
    <>
      <div className="card custom-card-hotel mb-3">
        <div className="row g-0" style={{ height: "100%" }}>
          {/* Phần Ảnh */}
          <div className="col-md-4" style={{ height: "100%" }}>
            <img
              src={
                Array.isArray(item.images) && item.images.length > 0
                  ? item.images[0].url // Nếu là mảng và có phần tử
                  : typeof item.images === "string" && item.images.trim() !== ""
                    ? item.images // Nếu là chuỗi không rỗng
                    : "src/assets/hotelNotFound.webp" // Nếu rỗng hoặc không hợp lệ
              }
              className="img-fluid rounded-start custom-img-hotel-card"
              alt={item.name}
            />
          </div>
          {/* Phần Tên và Amenities */}
          <div className="col-md-5 d-flex flex-column justify-content-between">
            <div className="px-3 mt-2">
              <h5 className="card-title mb-0">{item?.name}</h5>
              <small className="hotel-adr d-flex align-items-center">
                <i className="fa-solid fa-map-pin me-2"></i>
                <p className="mb-0">{item?.address}</p>
              </small>
              <p className="card-text hotel-amenities grid-icons">
                {item?.hotelAmenities && item.hotelAmenities.length > 0 ? (
                  item.hotelAmenities.map((ha, index) => (
                    // code cũ Hùng
                    // <small className="hotel-amenity-item" key={index}>
                    // <SvgIcon url={regexUrlIcon(ha.icon)} />
                    // <span className="hotel-amenity-name">{ha.name}</span>

                    // code mới Dtien

                    <small className="hotel-amenity-item" key={index}>
                      {/* <SvgIcon url={regexUrlIcon(ha.icon)} /> */}
                      <SvgIcon
                        url={
                          typeof ha.icon === "string" && ha.icon.trim() !== ""
                            ? ha.icon
                            : ha.icon[0]?.url || "src/assets/defaultIcon.webp"
                        }
                      />

                      <span className="amenity-name">{ha.name}</span>
                    </small>
                  ))
                ) : (
                  <small>No amenities available</small>
                )}
              </p>
            </div>
          </div>

          {/* Phần Rating và Nút */}
          <div className="col-md-3 d-flex flex-column justify-content-between">
            <div className="feed-back-hotel d-flex align-items-center mt-2">
              <div className="start-feedback">
                <Star rating={item?.rating}></Star>
              </div>
              {/* <span className="total-customer ms-2">{5} người đánh giá</span> */}
            </div>
            <div>
              <div className="row addFav-viewDe">
                <div className="col-md-3 px-3" style={{ width: "100%" }}>
                  <span>
                    {Array.isArray(item.rooms) && item.rooms.length > 0
                      ? convertToVNDDB(item.rooms[0].price) // Nếu là mảng và có phần tử
                      : item.price // Nếu không có rooms, dùng trực tiếp item.price
                        ? convertToVNDDB(item.price)
                        : "Không có giá"}{" "}
                  </span>

                  {/* <button className="btn-booking bg-warning mb-2 ">
                    <span>Lưu</span>
                  </button> */}

                  {/* code cũ thiếu phần button Dtien bổ sung */}
                  {/* code cũ Hùng */}
                  {/* <Link
                    to={`/hotel-page/${item.hotel_id}`}
                    className="btn-booking mb-2"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Đặt ngay</span>
                  </Link> */}

                  {/* Dtien bổ sung  */}
                  {onClick || modalTarget || modalToogle ? (
                    <button
                      className="btn-booking mb-2"
                      style={{ fontWeight: "700", width: "100%" }}
                      {...(onClick && { onClick })}
                      {...(modalTarget && { "data-bs-target": modalTarget })}
                      {...(modalToogle && { "data-bs-toggle": modalToogle })}
                    >
                      {contentButton}
                    </button>
                  ) : (
                    <Link
                      className="btn-booking mb-2"
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        navigate(`/hotel-page/${item?.hotel_id}?checkIn=${dateDepart}&checkOut=${dateReturn}`);
                      }}
                    >
                      Đặt ngay
                    </Link>
                  )}
                  {/* end bổ sung */}
                </div>
                <div className="col-md-9">
                  {/* Nút khác */}
                  {/* Thêm logic onClick hoặc data attributes nếu cần */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HotelCard.propTypes = {
  hotel_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default HotelCard;
