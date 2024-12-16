/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import "./hotel.css";
import provinces from "./provinces";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/flatpickr.min.js"; // Import CSS for flatpickr
import PriceRangeSlider from "./priceRange/PriceRangeSlider";
import CheckboxGroup from "./checkBox/CheckboxGroup";
import RatingCheckboxGroup from "./checkBox/ServicesCheckboxGroup";
import Loader from "../../Components/Loading";
import { useLocation } from "react-router-dom";
import { HotelService } from "../../../services/apis/HotelService";
import { Pagination } from "@mui/material";
import HotelCard from "./card/hotelCard";
import { enqueueSnackbar } from "notistack";
import { flatpickrConfig } from "../../../utils/ConfigFlatpickr";

const Hotel = () => {
  const location = useLocation();
  const { keyword, date, days } = location.state || {};
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [inputValue, setInputValue] = useState(keyword);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [sliderPosition, setSliderPosition] = useState("hotel");
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("hotel");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hotelAvailable, setHotelAvailable] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [dateDepart, setDateDepart] = useState(date);
  const [dateReturn, setDateReturn] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const response = await HotelService.getAvailableHotels(
        keyword,
        date,
        days,
        page,
        limit
      );
      if (response) {
        setHotelAvailable(response.hotelResponseList);
        setTotalPage(response.totalPage);
      }
      window.scrollTo(0, 0);
    };
    fetch();
  }, [setPage]);
  const filteredHotels = hotelAvailable.filter((hotel) =>
    hotel.hotelAmenities.some((amenity) =>
      selectedAmenities.includes(amenity.name)
    )
  );
  const filteredHotelsByRating = selectedRating
  ? hotelAvailable.filter((hotel) => hotel.rating <= selectedRating)
  : hotelAvailable;
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const handleInputChange = (event) => {
    const query = event.target.value;
    setInputValue(query);
    if (query) {
      const filtered = provinces.filter((province) =>
        province.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProvinces(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (province) => {
    setInputValue(province);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".input-custom-hotel")) {
      setShowSuggestions(false);
      setShowGuestOptions(false);
    }
  };

  const totalGuests = adults + children + infants;

  const handleInputClick = () => {
    setShowGuestOptions(!showGuestOptions);
  };

  const handleGuestChange = (type, operation, event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (type === "adults") {
      setAdults(
        operation === "increment" ? adults + 1 : Math.max(0, adults - 1)
      );
    } else if (type === "children") {
      setChildren(
        operation === "increment" ? children + 1 : Math.max(0, children - 1)
      );
    } else if (type === "infants") {
      setInfants(
        operation === "increment" ? infants + 1 : Math.max(0, infants - 1)
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const renderList = () => {
    const filteredHotels = hotelAvailable.filter((hotel) => {
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.some((amenity) =>
          hotel.hotelAmenities.some(
            (hotelAmenity) => hotelAmenity.name === amenity
          )
        );

      const matchesRating = !selectedRating || hotel.rating <= selectedRating;

      return matchesAmenities || matchesRating;
    });

    return filteredHotels.map((item, index) => (
      <li key={index}>
        <HotelCard item={item} dateDepart={dateDepart ?? null}
  dateReturn={dateReturn ?? null}/>
      </li>
    ));
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSliderPosition(category);
    setCurrentPage(1);
  };

  const today = new Date();
  const maxDate = new Date(new Date().setFullYear(today.getFullYear() + 1)); // Tính toán ngày 12 tháng sau

  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái isLoading

  const validation = () => {
    const today = new Date();
    if (!dateReturn || dateReturn.trim() === '') {
      setError("Ngày về không được để trống");
      return false;
    }
  
    const departDate = new Date(dateDepart);
    const returnDate = new Date(dateReturn);
    if (isNaN(departDate.getTime())) {
      setError("Ngày đi không hợp lệ");
      return false;
    }
    if (isNaN(returnDate.getTime())) {
      setError("Ngày về không hợp lệ");
      return false;
    }
    if (departDate < today) {
      setError("Ngày đi không được nhỏ hơn ngày hiện tại");
      return false;
    }
    if (departDate > returnDate) {
      setError("Ngày đi không được lớn hơn ngày về");
      return false;
    }
    setError('');
    return true;
  };
  function addDaysToDate(dateStr, days) {
    const [day, month, year] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    date.setDate(date.getDate() + days);

    const newDateStr = date.toISOString().split("T")[0];
    console.log(newDateStr);

    return newDateStr;
  }
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm 1 vào tháng vì `getMonth()` trả về tháng từ 0-11
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo ngày luôn có 2 chữ số
    return `${year}-${month}-${day}`; // Trả về chuỗi theo định dạng yyyy-mm-dd
  };

  useEffect(() => {
    document.title = "Khách sạn";

    document.addEventListener("click", handleClickOutside);

    if (!isLoading) {
      const departInputHotel = document.getElementById("date-depart-hotel");
      const returnInputHotel = document.getElementById("date-return-hotel");

      if (departInputHotel && returnInputHotel) {
        // Tính toán ngày về mặc định từ ngày đi
        const defaultReturnDate = addDaysToDate(date, days);

        // Khởi tạo departPicker với ngày đi
        const departPicker = flatpickr(departInputHotel, {
          altInput: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          locale: flatpickrConfig,
          minDate: today,
          maxDate: maxDate,
          defaultDate: date,
          onChange: function (selectedDates, dateStr, instance) {
            const departDate = selectedDates[0];
            const returnDate = returnPicker.selectedDates[0];

            if (returnDate && returnDate < departDate) {
              returnPicker.setDate(departDate);
            }
            setDateDepart(formatDate(departDate));
            console.log(dateDepart);
          },
        });
        const returnPicker = flatpickr(returnInputHotel, {
          altInput: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          locale: flatpickrConfig,
          minDate: today,
          maxDate: maxDate,
          defaultDate: defaultReturnDate,
          onChange: function (selectedDates, dateStr, instance) {
            const returnDate = selectedDates[0];
            const departDate = departPicker.selectedDates[0];
            if (departDate && returnDate < departDate) {
              departPicker.setDate(returnDate);
            }
            setDateReturn(formatDate(returnDate));
          },
        });

        departPicker.config.onChange.push(
          function (selectedDates, dateStr, instance) {
            returnPicker.open();
          }
        );

        return () => {
          departPicker.destroy();
          returnPicker.destroy();
        };
      }
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLoading]);

  const convertToDate = (dateStr) => {
    console.log(dateDepart);
    console.log(dateReturn);
    if (!dateStr || typeof dateStr !== "string") {
      throw new Error("Ngày không hợp lệ");
    }

    const [day, month, year] = dateStr.split("-").map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error("Ngày, tháng hoặc năm không hợp lệ");
    }

    return new Date(year, month - 1, day);
  };

  const handleSearchHotel = async (e) => {
    e.preventDefault();
    if (!validation()) {
      enqueueSnackbar(error, { variant: "error",hideIconVariant: 3000 });
      return;
    }
    const departDate = convertToDate(dateDepart);
    const returnDate = convertToDate(dateReturn);
    const day = (returnDate - departDate) / (1000 * 3600 * 24);
    const resposne = await HotelService.getAvailableHotels(
      inputValue,
      dateDepart,
      day,
      0,
      10
    );
    if (resposne) {
      setHotelAvailable(resposne.hotelResponseList);
      console.log(hotelAvailable);
      setTotalPage(resposne.totalPage);
    }
  };

  return (
    <>
      {!isLoading ? (
        <section className="container-fluid container-hotel gx-0">
          <div className="background-hotel">
            <form action="" className="form-hotel">
              <div className="input-custom-hotel">
                <i className="fas fa-map-marker-alt"></i>
                <input
                  type="text"
                  placeholder="Chọn nơi bạn đến"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {showSuggestions && (
                  <ul className="suggestions-list">
                    {filteredProvinces.map((province, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(province)}
                      >
                        {province}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="input-custom-hotel">
                <i className="far fa-calendar-alt"></i>
                <input id="date-depart-hotel" placeholder="Ngày đi" />
              </div>
              <div className="input-custom-hotel">
                <i className="far fa-calendar-alt"></i>
                <input id="date-return-hotel" placeholder="Ngày về" />
              </div>
              <div className="input-custom-hotel">
                <i className="fas fa-user-check"></i>
                <input
                  type="text"
                  placeholder="Số người"
                  required
                  readOnly
                  value={totalGuests > 0 ? totalGuests : ""}
                  onClick={handleInputClick}
                />
                {showGuestOptions && (
                  <div className="guest-options">
                    <div className="guest-option">
                      <span>Người lớn</span>
                      <button
                        onClick={(event) =>
                          handleGuestChange("adults", "decrement", event)
                        }
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        onClick={(event) =>
                          handleGuestChange("adults", "increment", event)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="guest-option">
                      <span>Trẻ em</span>
                      <button
                        onClick={(event) =>
                          handleGuestChange("children", "decrement", event)
                        }
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        onClick={(event) =>
                          handleGuestChange("children", "increment", event)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="guest-option">
                      <span>Em bé</span>
                      <button
                        onClick={(event) =>
                          handleGuestChange("infants", "decrement", event)
                        }
                      >
                        -
                      </button>
                      <span>{infants}</span>
                      <button
                        onClick={(event) =>
                          handleGuestChange("infants", "increment", event)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="btn custom-btn-hotel"
                onClick={(e) => handleSearchHotel(e)}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="hide-text-search-hotel"> Tìm</span>
              </button>
            </form>
          </div>
          <div className="col-md-12 row m-0 filter">
            <div className="col-md-3 custom-filter">
              <div className="row mt-5 ms-2">
                <h1>Bộ lọc</h1>
              </div>
              {/* <div className="row mt-5 ms-2">
                <h4 className="price-range">Giá tiền</h4>
                <PriceRangeSlider />
              </div> */}
              <div className="row mt-5 ms-2">
                <h4 className="price-range">Tiện ích</h4>
                <CheckboxGroup setSelectedAmenities={setSelectedAmenities} />
              </div>
              <div className="row mt-5 ms-2">
                <h4 className="price-range">Đánh giá</h4>
                <RatingCheckboxGroup setSelectedRating={setSelectedRating} />
              </div>
            </div>
            <div className="col-md-9 custom-list-hotel">
              <div className="select-category">
                <div
                  className={`col-md-12 ${
                    selectedCategory === "hotel" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("hotel")}
                >
                  <h5>Khách sạn</h5>
                  <small>Tổng nơi ở: {hotelAvailable.length}</small>
                </div>
                <div className={`slider-bar ${sliderPosition}`}></div>
              </div>
              <div className="column-sort">
                <div className="sort-title">
                  <h6>Hiển thị 1 trong 3 nơi</h6>
                </div>
                <div className="sort-button">
                  <button className="btn custom-btn-hotel">
                    <i className="fa-solid fa-sort-amount-down-alt"></i>
                    <span className="hide-text-sort-hotel">
                      Sắp xếp theo giá
                    </span>
                  </button>
                </div>
              </div>
              <ul className="hotel-list">{renderList()}</ul>
              <br />
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
          </div>
        </section>
      ) : (
        <Loader rong={"80vh"} />
      )}
    </>
  );
};

export default Hotel;
