/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import "./hotel.css";
import provinces from "./provinces";
import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/flatpickr.min.js"; // Import CSS for flatpickr
import HotelCard from "./card/hotelCard";
// import Loading from "../../components/Loading/LoadingAnimation ";
import PriceRangeSlider from "./priceRange/PriceRangeSlider";
import CheckboxGroup from "./checkBox/CheckboxGroup";
import ServicesCheckboxGroup from "./checkBox/ServicesCheckboxGroup";

const Hotel = () => {
  window.scrollTo(0, 0);
  const [inputValue, setInputValue] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [sliderPosition, setSliderPosition] = useState("hotel");

  const [selectedCategory, setSelectedCategory] = useState("hotel");

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
    // Added event parameter here
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
  const itemsPerPage = 5;

  const hotels = [
    "Khách sạn A",
    "Khách sạn B",
    "Khách sạn C",
    "Khách sạn D",
    "Khách sạn E",
    "Khách sạn F",
  ];
  const homestays = [
    "Home stay A",
    "Home stay B",
    "Home stay C",
    "Home stay D",
    "Home stay E",
    "Home stay F",
  ];
  const resorts = [
    "Resort A",
    "Resort B",
    "Resort C",
    "Resort D",
    "Resort E",
    "Resort F",
  ];

  const renderList = () => {
    let list = [];
    if (selectedCategory === "hotel") {
      list = hotels;
    } else if (selectedCategory === "homestay") {
      list = homestays;
    } else if (selectedCategory === "resort") {
      list = resorts;
    }
    const paginatedList = paginate(list, itemsPerPage, currentPage);
    return paginatedList.map((item, index) =>
      HotelCard({ name: item, key: index })
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSliderPosition(category);
    setCurrentPage(1);
  };

  const getTotalLocations = (category) => {
    if (category === "hotel") {
      return hotels.length;
    } else if (category === "homestay") {
      return homestays.length;
    } else if (category === "resort") {
      return resorts.length;
    }
    return 0;
  };

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const totalItems = getTotalLocations(selectedCategory);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const today = new Date();
  const maxDate = new Date(new Date().setFullYear(today.getFullYear() + 1)); // Tính toán ngày 12 tháng sau

  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái isLoading

  const VietnameseHotel = {
    weekdays: {
      shorthand: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      longhand: [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ],
    },
    months: {
      shorthand: [
        "Th1",
        "Th2",
        "Th3",
        "Th4",
        "Th5",
        "Th6",
        "Th7",
        "Th8",
        "Th9",
        "Th10",
        "Th11",
        "Th12",
      ],
      longhand: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    firstDayOfWeek: 1, // tuần bắt đầu từ thứ 2
    rangeSeparator: " đến ",
    weekAbbreviation: "Tuần",
    scrollTitle: "Cuộn để tăng giảm",
    toggleTitle: "Nhấp để chuyển đổi",
    ordinal: (nth) => {
      if (nth > 1) return "th";
      return "";
    },
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    if (!isLoading) {
      const departInputHotel = document.getElementById("date-depart-hotel");
      const returnInputHotel = document.getElementById("date-return-hotel");

      if (departInputHotel && returnInputHotel) {
        const departPicker = flatpickr(departInputHotel, {
          altInput: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          locale: VietnameseHotel,
          minDate: today,
          maxDate: maxDate,
          onChange: function (selectedDates, dateStr, instance) {
            const minReturnDate = selectedDates[0]; // Ngày đi đã chọn
            const returnDate = returnPicker.selectedDates[0]; // Ngày về đã chọn

            if (returnDate < minReturnDate) {
              returnPicker.setDate(minReturnDate);
            }
          },
        });

        const returnPicker = flatpickr(returnInputHotel, {
          altInput: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          locale: VietnameseHotel,
          minDate: today,
          maxDate: maxDate,
          onChange: function (selectedDates, dateStr, instance) {
            const departDate = departPicker.selectedDates[0]; // Ngày đi đã chọn
            const maxDepartDate = selectedDates[0]; // Ngày về đã chọn

            if (departDate > maxDepartDate) {
              departPicker.setDate(maxDepartDate);
            }
          },
        });

        departPicker.config.onChange.push(function (
          selectedDates,
          dateStr,
          instance
        ) {
          returnPicker.open();
        });

        return () => {
          departPicker.destroy();
          returnPicker.destroy();
        };
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Cleanup function để hủy bỏ các instance của flatpickr khi component unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isLoading]);

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
              <button type="submit" className="btn custom-btn-hotel">
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
              <div className="row mt-5 ms-2">
                <h4 className="price-range">Giá tiền</h4>
                <PriceRangeSlider />
              </div>
              <div className="row mt-5 ms-2">
                <h4 className="price-range">Tiện ích</h4>
                <CheckboxGroup />
              </div>
              <div className="row mt-5 ms-2">
                <h4 className="price-range">Dịch vụ đi kèm</h4>
                <ServicesCheckboxGroup />
              </div>
            </div>
            <div className="col-md-9 custom-list-hotel">
              <div className="select-category">
                <div
                  className={`col-md-4 ${selectedCategory === "hotel" ? "active" : ""
                    }`}
                  onClick={() => handleCategoryClick("hotel")}
                >
                  <h5>Khách sạn</h5>
                  <small>Tổng nơi ở: {getTotalLocations("hotel")}</small>
                </div>
                <div
                  className={`col-md-4 ${selectedCategory === "homestay" ? "active" : ""
                    }`}
                  onClick={() => handleCategoryClick("homestay")}
                >
                  <h5>Home stay</h5>
                  <small>Tổng nơi ở: {getTotalLocations("homestay")}</small>
                </div>
                <div
                  className={`col-md-4 ${selectedCategory === "resort" ? "active" : ""
                    }`}
                  onClick={() => handleCategoryClick("resort")}
                >
                  <h5>Resort</h5>
                  <small>Tổng nơi ở: {getTotalLocations("resort")}</small>
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
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={index + 1 === currentPage ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Hotel;
