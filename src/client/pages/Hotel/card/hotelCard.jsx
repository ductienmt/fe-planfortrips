import PropTypes from "prop-types";
import "./hotelCard.css";
import { Star } from "../../../../admin/pages/Components/Star";
import SvgIcon from "./svgIcon";
import { Link, useNavigate } from "react-router-dom";
import { regexUrlIcon } from "../../../../utils/regex";
const HotelCard = ({ item }) => {
  console.log(item);
  // const navigate = useNavigate();
  // const originalPrice = 250000;
  // const discountedPrice = 200000;
  const convertToVNDDB = (price) => {
    return price + ".000VND ";
  };
  // const hasDiscount = discountedPrice < originalPrice;
  return (
    <>
      <div className="card custom-card-hotel mb-3" style={{ height: "300px" }}>
        <div className="row g-0" style={{ height: "100%" }}>
          {/* Phần Ảnh */}
          <div className="col-md-4" style={{ height: "100%" }}>
            <img
              src={item.images[0]?.url ?? "src/assets/hotelNotFound.webp"}
              className="img-fluid rounded-start custom-img-hotel-card"
              alt={item.name}
            />
          </div>
          {/* Phần Tên và Amenities */}
          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div className="px-3 mt-2">
              <h5 className="card-title mb-0">{item?.name}</h5>
              <small className="hotel-adr d-flex align-items-center">
                <i className="fa-solid fa-map-pin me-2"></i>
                <p className="mb-0">{item?.address}</p>
              </small>
              <p className="card-text amenities grid-icons">
                {item?.hotelAmenities && item.hotelAmenities.length > 0 ? (
                  item.hotelAmenities.map((ha, index) => (
                    <small className="amenity-item" key={index}>
                      <SvgIcon url={regexUrlIcon(ha.icon)} />
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
          <div className="col-md-2  d-flex flex-column justify-content-between">
            <div className="feed-back-hotel d-flex align-items-center mt-2">
              <div className="start-feedback">
                <Star rating={item?.rating}></Star>
              </div>
              {/* <span className="total-customer ms-2">{5} người đánh giá</span> */}
            </div>
            <div>
              <div className="row addFav-viewDe">
                <div className="col-md-3 px-3" style={{ width: "200px" }}>
                  <span>{convertToVNDDB(item?.rooms[0]?.price)}</span>
                  {/* <button className="btn-booking bg-warning mb-2 ">
                    <span>Lưu</span>
                  </button> */}
                  <Link to={ `/hotel-page/${item.hotel_id}`} className="btn-booking mb-2" style={{ textDecoration:'none' }}>
                    <span>Đặt ngay</span>
                  </Link>
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
  name: PropTypes.string.isRequired,
};

export default HotelCard;
