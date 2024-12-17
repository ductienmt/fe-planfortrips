import React, { useEffect, useState } from "react";
import "../IntroHotel/introhotel.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InputOption from "../../../Components/Input/InputOption";
import { CouponService } from "../../../../services/apis/CouponService";
import { HotelService } from "../../../../services/apis/HotelService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Carousel } from "antd";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import ApprovalIcon from "@mui/icons-material/Approval";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Pagination,
  TablePagination,
  Typography,
} from "@mui/material";
import Loader from "../../../Components/Loading";
import { CheckinService } from "../../../../services/apis/CheckinService";
import MapComponent from "../mapCheckin/mapCheckin";
import { use } from "react";
const imgheader = [
  "src/assets/hotel1.jpg",
  "src/assets/hotel2.jpg",
  "src/assets/hotel3.jpg",
  "src/assets/hotel4.jpg",
  "src/assets/hotel5.jpg",
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const dealinVN = [
  {
    namedeeal: "Đà Nẵng",
    icon: <BeachAccessIcon />,
  },
  {
    namedeeal: "Hồ Chí Minh",
    icon: <TempleBuddhistIcon />,
  },
  {
    namedeeal: "Nha Trang",
    icon: <BeachAccessIcon />,
  },
  {
    namedeeal: "Đà Lạt",
    icon: <ApprovalIcon />,
  },
  {
    namedeeal: "Ninh Thuận",
    icon: <BeachAccessIcon />,
  },
  {
    namedeeal: "Bình Thuận",
    icon: <BeachAccessIcon />,
  },
  {
    namedeeal: "Vũng Tàu",
    icon: <BeachAccessIcon />,
  },
  {
    namedeeal: "Gia Lai",
    icon: <ApprovalIcon />,
  },
];

const traveloption = [
  "Hồ Chí Minh",
  "Đà Lạt",
  "Lâm Đồng",
  "Đồng Nai",
  "Bình Dương",
];

const IntroHotel = () => {
  const [selectedDeal, setSelectedDeal] = useState("");
  const [date, setDate] = useState("");
  const [coupon, setCoupon] = useState([]);
  const handDatechange = (event) => {
    setDate(event.target.value);
  };
  const [checkinItem, setCheckinItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const [hotel, setHotel] = useState([]);
  const [checkin, setCheckin] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Kiểm soát dropdown
  const [inputValue, setInputValue] = useState(""); // Giá trị input
  const [selectedOption, setSelectedOption] = useState(""); // Tùy chọn được chọn
  const [isModal, setIsModal] = useState(false);
  const [errors, setErrors] = useState();
  const options = [
    {
      key: 1,
      value: "1 Đêm",
    },
    {
      key: 2,
      value: "2 Đêm",
    },
    {
      key: 3,
      value: "3 Đêm",
    },
    {
      key: 4,
      value: "4 Đêm",
    },
    {
      key: 5,
      value: "5 Đêm",
    },
  ];
  const validateSearch = () => {
    const newErrors = {};
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() - 1);
    if (!date) newErrors.date = "Vui lòng chọn ngày";
    if (new Date(date) < today)
      newErrors.date = "Ngày phải lớn hay ngày hiện tại";
    if (!selectedOption) newErrors.days = "Vui lòng chọn số đêm ở";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Đổi trạng thái mở/đóng
  };

  const handleOptionClick = (option) => {
    setInputValue(option.value); // Gán giá trị vào input
    setSelectedOption(option.key); // Cập nhật tùy chọn được chọn
    setIsOpen(false); // Đóng dropdown
  };
  useEffect(() => {}, []);
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Cập nhật giá trị input
  };
  const handleSearch = () => {
    if (!validateSearch()) return;
    navigate("/hotel-page", {
      state: {
        keyword: keyword,
        date: date,
        days: selectedOption,
      },
    });
  };
  // const handleSearch = async () => {
  //   const response = await HotelService.getAvailableHotels(
  //     keyword,
  //     date,
  //     selectedOption,
  //     page,
  //     limit
  //   );
  //   if (response) {
  //     setHotelAvailable(response);
  //   }
  // };
  useEffect(() => {
    document.title = "Khách sạn";

    const fetch = async () => {
      setIsLoading(true);
      const dataCoupon = await CouponService.getCoupons(0, 6, "");
      const dataHotel = await HotelService.getHotels(page, limit, selectedDeal);
      const dataCheckin = await CheckinService.getCheckins();
      if (dataCoupon) {
        setCoupon(dataCoupon.listResponse);
      }
      if (dataHotel) {
        setHotel(dataHotel.hotelResponseList);
        setTotalPage(dataHotel.totalPage);
        setIsLoading(false);
      }
      if (dataCheckin) {
        const data = dataCheckin.data;
        setCheckin(data.checkinResponses.slice(0, 8));
        console.log(checkin);
      }
    };
    fetch();
  }, [page, selectedDeal]);
  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      enqueueSnackbar("Đã sao chép", {
        variant: "success",
        autoHideDuration: 3000,
      });
    });
  };
  const handleDealClick = (deal) => {
    setSelectedDeal(deal.namedeeal);
  };
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const handleClick = (index) => {
    setCheckinItem(checkin[index]);
    console.log(checkinItem);
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
 
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="introhotel-container">
        <div className="header">
          <div className="item">
            <Carousel
              autoplay
              slidesToShow={2}
              slidesToScroll={2}
              dots={true}
              infinite={true}
              style={{ marginBottom:"30px" }}
            >
              {imgheader.map((i, index) => (
                <div className="img1" style={{ padding:"50px", marginBottom:"30px" }} key={index}>
                  <img src={i} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="content-header">
          <div className="title">
            <b style={{ color: "rgb(1,148,243)" }}>Khách sạn xem gần đây</b>
          </div>

          <div className="main-header">
            <div className="input">
              <b style={{ color: "#777777" }}>
                Thành phố, địa điểm hoặc tên khách sạn:
              </b>
              <InputOption
                setKeyword={setKeyword}
                options={traveloption}
                placeholder="Thành phố, khách sạn, điểm đến "
              />
            </div>
            <b style={{ color: "#777777" }}>Chọn ngày:</b>
            <div className="date-night">
              <div className="input-night">
                <input
                  className="input-date"
                  type="date"
                  value={date}
                  onChange={handDatechange}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />

                {errors?.date && <p className="text-danger">{errors.date}</p>}
              </div>

              <div className="input-night">
                {/* Ô nhập liệu */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onClick={toggleDropdown} // Hiển thị dropdown khi nhấp
                  placeholder="Chọn đêm"
                  style={{
                    outline: "none",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                {errors?.days && <p className="text-danger">{errors.days}</p>}

                {/* Dropdown */}
                {isOpen && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 1000,
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                    }}
                  >
                    {options
                      .filter((option) =>
                        option.value
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      ) // Lọc kết quả
                      .map((option) => (
                        <li
                          key={option.key}
                          onClick={() => handleOptionClick(option)} // Chọn tùy chọn
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          {option.value}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
            <br />
            <div className="header-button">
              <button onClick={() => handleSearch()}>Tìm khách sạn </button>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="main-container">
          <div>
            <a style={{ fontSize: "30px", fontWeight: "bold" }}> Mã voucher</a>
          </div>
          <div className="voucher-container">
            {coupon.map((voucher, index) => (
              <div className="voucher-card" key={index}>
                <div className="voucher-content">
                  <h4 className="voucher-title">
                    Giảm {voucher.discount_value}{" "}
                    {voucher.discount_type ? "%" : "VNĐ"}
                  </h4>
                  <p className="voucher-details">
                    từ {voucher.start_date} đến {voucher.end_date}
                  </p>
                </div>
                <div className="voucher-divider">
                  <span className="divider-circle left"></span>
                  <span className="divider-line"></span>
                  <span className="divider-circle right"></span>
                </div>
                <div className="voucher-footer">
                  <button
                    className="voucher-button"
                    id={voucher.code}
                    onClick={() => copyCoupon(voucher.code)}
                  >
                    <span className="voucher-code">{voucher.code}</span>
                    <ContentCopyIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <br />
          <br />
          <div>
            <a style={{ fontSize: "30px", fontWeight: "bold" }}>
              {" "}
              Deal nội địa
            </a>
          </div>
          <div className="deal">
            {dealinVN.map((deal, index) => (
              /* From Uiverse.io by adamgiebl */
              <button
                className="btn-hotel"
                key={index}
                onClick={() => handleDealClick(deal)}
              >
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg className="svg-hotel" width="30px" height="30px">
                      {deal.icon}
                    </svg>
                  </div>
                </div>
                <span className="span-hotel">{deal.namedeeal}</span>
              </button>
            ))}
          </div>
          <br />
          {hotel?.length > 0 ? (
            <div className="deal-card">
              {hotel.map((card, index) => (
                <div key={index} className="card">
                  <div className="image">
                    <img
                      src={
                        card.images[0] && card.images[0].url
                          ? card.images[0].url
                          : "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt={card.name || "Khách sạn"}
                    />
                  </div>
                  <div className="content text-center">
                    <div className="content-item">
                      <p className="card-title">
                        {card.name || "Tên khách sạn"}
                      </p>
                      <p className="card-description">
                        {card.description || "Mô tả không có sẵn"}
                      </p>
                      <div className="price-info">
                        <p className="card-price-new">
                          {card.newprice || "Liên hệ để biết giá"}
                        </p>
                      </div>
                      <div className="card-button">
                        <Link
                          to={`/hotel-page/${card.hotel_id}`}
                          className="buy-button"
                          style={{ textDecoration: "none",textAlign:"center" }}
                        >
                          Đặt ngay
                        </Link>
                        <Link
                          to={`/hotel-page/${card.hotel_id}`} className="details-buttons"
                          style={{ textDecoration: "none",textAlign:"center" }}
                          >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Pagination */}
              <Pagination
                count={totalPage}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                showFirstButton
                showLastButton
              />
            </div>
          ) : (
            <div className="no-data">
              <p>Không có khách sạn nào phù hợp.</p>
            </div>
          )}
          <br />
          <br />
          <div>
            <a style={{ fontSize: "30px", fontWeight: "bold" }}>
              {" "}
              Giá tốt các địa điểm nội địa
            </a>
          </div>
          <div className="deal-img mb-3">
            {checkin.map((c, index) => (
              <div
                key={index}
                className="item-img"
                onClick={() => handleClick(index)}
              >
                <div className="img-container">
                  <img
                    src={c.images[0]?.url || "src/assets/placeNotFound.webp"}
                    alt={c.cityName}
                    className="main-img"
                  />
                  <div className="img-hover">
                    <img
                      src={c.images[1]?.url || "src/assets/placeNotFound.webp"}
                      alt="Hover Image"
                    />
                  </div>
                  <div className="img-text">
                    <div className="type-text">
                      <a style={{ fontWeight: "bold" }}>{c.name}</a>
                    </div>
                    <div className="addres-text">
                      <a style={{ fontWeight: "bold" }}>{c.addres}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isModal && checkinItem !== null && (
              <Modal
                open={isModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="row">
                    <div className="col-md-6">
                      <Box
                        sx={{ width: 500, height: 450, overflowY: "scroll" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Thành phố: <strong>{checkinItem.cityName}</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Địa chỉ: <strong>{checkinItem.address}</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Tên: <strong>{checkinItem.name}</strong>
                        </Typography>

                        <ImageList variant="masonry" cols={3} gap={8}>
                          {checkinItem.images.map((item) => (
                            <ImageListItem key={item.id}>
                              <img
                                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.url}?w=248&fit=crop&auto=format`}
                                alt={item.id}
                                loading="lazy"
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Box>
                    </div>
                    <div className="col-md-6">
                      <MapComponent
                        latitude={checkinItem.latitude}
                        longitude={checkinItem.longitude}
                      />
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroHotel;
