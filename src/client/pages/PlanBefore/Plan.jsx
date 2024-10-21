import { useState, useEffect, useRef, useContext } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleInputChange } from "../../../utils/FormatMoney"; // Đường dẫn tới file FormatMoney.js
import provinces from "../../../utils/Provinces.json"; // Đường dẫn tới file Province.json
import { useSnackbar } from "notistack"; // Thêm Notistack
import "./Plan.css";
import { flatpickrConfig } from "../../../utils/ConfigFlatpickr";
import { DateFormatter } from "../../../utils/DateFormat";
import { PlanServiceApi } from "../../../services/apis/PlanServiceApi";
import { generateTripPlan } from "../../../services/planService";

function HomePage() {
  const { enqueueSnackbar } = useSnackbar(); // Sử dụng Notistack
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [showNumberBox, setShowNumberBox] = useState(false);

  const ngayDiRef = useRef(null);
  const ngayVeRef = useRef(null);
  // const [loiNgay, setLoiNgay] = useState("");

  const [budget, setBudget] = useState(""); // Trạng thái cho ngân sách
  // const [error, setError] = useState(""); // Trạng thái cho thông báo lỗi

  const [queryCurrentCity, setQueryCurrentCity] = useState(""); // Tỉnh, thành phố đang ở
  const [queryDestination, setQueryDestination] = useState(""); // Điểm đến
  const [filteredCurrentCities, setFilteredCurrentCities] = useState([]); // Gợi ý cho tỉnh, thành phố đang ở
  const [filteredDestinations, setFilteredDestinations] = useState([]); // Gợi ý cho điểm đến

  const [formData, setFormData] = useState({
    location: "",
    destination: "",
    startDate: "",
    endDate: "",
    numberPeople: 0,
    budget: 0.0,
  });

  const [planData, setPlanData] = useState({
    location: "Hồ Chí Minh",
    destination: "Vũng Tàu",
    startDate: "10-10-2024 08:00:00",
    endDate: "13-10-2024 14:00:00",
    numberPeople: 2,
    budget: 5000,
  });

  const handlePlan = async () => {
    // if (validatePlan()) {
    // setFormData({
    //   ...formData,
    //   location: queryCurrentCity,
    //   destination: queryDestination,
    //   startDate: DateFormatter(ngayDiRef.current.value),
    //   endDate: DateFormatter(ngayDiRef.current.value),
    //   numberPeople: adults + children + infants,
    //   budget: budget,
    // });
    try {
      const response = await PlanServiceApi.getData(planData);
      console.log(response.data);
      const tripPlan = await generateTripPlan(response.data);
      console.log(tripPlan);
      if (tripPlan) {
        console.log("Setting trip plan:", tripPlan);
        localStorage.setItem("tripData", JSON.stringify(tripPlan));
        // Chuyển hướng sau khi đã cập nhật tripPlan
        // window.location.href = "/plan/trip";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validatePlan = () => {
    const totalPeople = adults + children + infants;
    const errorMessages = [
      totalPeople > 20 && "Số lượng người không được vượt quá 20!",
      (children > 0 || infants > 0) &&
        adults === 0 &&
        "Cần ít nhất 1 người lớn nếu có trẻ em hoặc trẻ sơ sinh!",
      !queryCurrentCity && "Vui lòng chọn thành phố hiện tại!",
      !queryDestination && "Vui lòng chọn điểm đến!",
      !ngayDiRef.current.value && "Vui lòng chọn ngày đi!",
      !ngayVeRef.current.value && "Vui lòng chọn ngày về!",
      !budget && "Vui lòng nhập ngân sách!",
      adults === 0 &&
        children === 0 &&
        infants === 0 &&
        "Vui lòng chọn ít nhất một người!",
    ].filter(Boolean); // Remove undefined values

    // Show the first error message if any
    if (errorMessages.length > 0) {
      enqueueSnackbar(errorMessages[0], { variant: "error" });
      return false;
    }

    return true;
  };

  const handleBudgetChange = (event) => {
    handleInputChange(event, setBudget, (errorMessage) => {
      if (errorMessage) {
        enqueueSnackbar(errorMessage, {
          // Sử dụng notistack để hiện thông báo lỗi
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    });
  };

  // Xử lý khi người dùng nhập tỉnh, thành phố đang ở
  const handleInputChangeCurrentCity = (event) => {
    const value = event.target.value.trim();
    setQueryCurrentCity(value);
    setFilteredCurrentCities(
      value
        ? provinces.results.filter((province) =>
            province.province_name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  // Xử lý khi người dùng nhập điểm đến
  const handleInputChangeDestination = (event) => {
    const value = event.target.value.trim();
    setQueryDestination(value);
    setFilteredDestinations(
      value
        ? provinces.results.filter((province) =>
            province.province_name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  // Khi chọn gợi ý tỉnh, thành phố
  const handleCurrentCitySuggestionClick = (provinceName) => {
    setQueryCurrentCity(provinceName); // Điền tỉnh đã chọn vào input
    setFilteredCurrentCities([]); // Xóa danh sách gợi ý sau khi chọn
  };

  // Khi chọn gợi ý điểm đến
  const handleDestinationSuggestionClick = (provinceName) => {
    setQueryDestination(provinceName); // Điền tỉnh đã chọn vào input
    setFilteredDestinations([]); // Xóa danh sách gợi ý sau khi chọn
  };

  const today = new Date();
  const maxDate = new Date(new Date().setFullYear(today.getFullYear() + 1));

  useEffect(() => {
    document.title = "Lên kế hoạch";
    window.scrollTo(0, 200);
    if (ngayDiRef.current && ngayVeRef.current) {
      const ngayDiPicker = flatpickr(ngayDiRef.current, {
        altInput: true,
        altFormat: "d-m-Y H:i", // Định dạng hiển thị ngày và giờ
        dateFormat: "Y-m-d H:i", // Định dạng cho giá trị thực
        locale: flatpickrConfig,
        minDate: today,
        maxDate: maxDate,
        enableTime: true, // Bật chọn giờ
        time_24hr: true, // Sử dụng định dạng 24 giờ
        onChange: function (selectedDates) {
          const ngayDi = selectedDates[0];
          const ngayVe = ngayVePicker.selectedDates[0];

          if (ngayVe && ngayVe < ngayDi) {
            ngayVePicker.setDate(ngayDi);
            enqueueSnackbar("Ngày về không thể trước ngày đi!", {
              variant: "error",
            });
          }
        },
      });

      const ngayVePicker = flatpickr(ngayVeRef.current, {
        altInput: true,
        altFormat: "d-m-Y H:i", // Định dạng hiển thị ngày và giờ
        dateFormat: "Y-m-d H:i", // Định dạng cho giá trị thực
        locale: flatpickrConfig,
        minDate: today,
        maxDate: maxDate,
        enableTime: true, // Bật chọn giờ
        time_24hr: true, // Sử dụng định dạng 24 giờ
        onChange: function (selectedDates) {
          const ngayDi = ngayDiPicker.selectedDates[0];
          const ngayVe = selectedDates[0];

          if (ngayDi && ngayVe < ngayDi) {
            enqueueSnackbar("Ngày về không thể trước ngày đi!", {
              variant: "error",
            });
          }
        },
      });

      // Mở ngayVePicker khi ngày đi được chọn
      ngayDiPicker.config.onChange.push(() => {
        ngayVePicker.open();
      });

      return () => {
        ngayDiPicker.destroy();
        ngayVePicker.destroy();
      };
    }
  }, []);

  const handleIncrement = (type) => {
    const totalPeople = adults + children + infants;

    if (totalPeople >= 20) {
      enqueueSnackbar("Số lượng người không được vượt quá 20!", {
        variant: "error",
      });
      return;
    }

    const incrementMap = {
      adult: () => setAdults(adults + 1),
      child: () => setChildren(children + 1),
      infant: () => setInfants(infants + 1),
    };

    incrementMap[type]?.(); // Call the appropriate increment function
  };

  const handleDecrement = (type) => {
    const decrementMap = {
      adult: () => adults > 0 && setAdults(adults - 1),
      child: () => children > 0 && setChildren(children - 1),
      infant: () => infants > 0 && setInfants(infants - 1),
    };

    decrementMap[type]?.(); // Call the appropriate decrement function
  };

  return (
    <div className="plan-container">
      <div className="overlay"></div>

      <>
        <h1 className="text-white">Nhập điểm đến của bạn</h1>
        <h3 className="text-white">
          Plan for Trips, Nơi những chuyến đi tạo nên những ký ức đẹp.
        </h3>
      </>

      <div className="form-container p-4 bg-light rounded">
        {/* Nhập điểm đến */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
            <label htmlFor="current-city" className="form-label">
              Vị trí hiện tại
            </label>
            <input
              type="text"
              id="current-city"
              value={queryCurrentCity}
              onChange={handleInputChangeCurrentCity}
              placeholder="Nhập tỉnh hoặc thành phố nơi bạn sống"
              className="homepage-input"
            />
            {/* Hiển thị gợi ý */}
            {filteredCurrentCities.length > 0 && (
              <ul className="suggestions-list">
                {filteredCurrentCities.map((province) => (
                  <li
                    key={province.province_id}
                    onClick={() =>
                      handleCurrentCitySuggestionClick(province.province_name)
                    }
                  >
                    {province.province_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-md-6 d-flex flex-column">
            <label htmlFor="destination" className="form-label">
              Điểm đến
            </label>
            <input
              type="text"
              id="destination"
              value={queryDestination}
              onChange={handleInputChangeDestination}
              placeholder="Nhập thành phố hoặc địa điểm du lịch"
              className="homepage-input"
            />
            {/* Hiển thị gợi ý */}
            {filteredDestinations.length > 0 && (
              <ul className="suggestions-list">
                {filteredDestinations.map((province) => (
                  <li
                    key={province.province_id}
                    onClick={() =>
                      handleDestinationSuggestionClick(province.province_name)
                    }
                  >
                    {province.province_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Ngày đi và Ngày về */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
            <label htmlFor="ngay-di" className="form-label">
              Ngày đi
            </label>
            <input
              ref={ngayDiRef}
              id="ngay-di"
              className="homepage-input"
              placeholder="Chọn ngày, giờ đi"
            />
          </div>
          <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
            <label htmlFor="ngay-ve" className="form-label">
              Ngày về
            </label>
            <input
              ref={ngayVeRef}
              id="ngay-ve"
              className="homepage-input"
              placeholder="Chọn ngày, giờ về"
            />
          </div>
        </div>

        {/* Nhập ngân sách */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 d-flex flex-column">
            <label htmlFor="budget" className="form-label">
              Chi phí cho chuyến đi (VNĐ)
            </label>
            <input
              type="text"
              id="budget"
              className="homepage-input"
              placeholder="Ví dụ: 5,000,000₫"
              value={budget}
              onChange={handleBudgetChange}
            />
          </div>
          <div className="col-md-6 mb-3 d-flex flex-column">
            <label htmlFor="people" className="form-label">
              Số lượng người
            </label>
            <input
              type="text"
              id="people"
              className="homepage-input"
              value={`${adults} người lớn, ${children} trẻ em, ${infants} trẻ sơ sinh`}
              readOnly
              onClick={() => setShowNumberBox(!showNumberBox)}
            />
            {showNumberBox && (
              <div className="number-box">
                <ul>
                  <li>
                    <div className="number-left">
                      <p>Người lớn</p>
                    </div>
                    <div className="number-right">
                      <button
                        className="decrement"
                        onClick={() => handleDecrement("adult")}
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        className="increment"
                        onClick={() => handleIncrement("adult")}
                      >
                        +
                      </button>
                    </div>
                  </li>

                  <li>
                    <div className="number-left">
                      <p>Trẻ em</p>
                    </div>
                    <div className="number-right">
                      <button
                        className="decrement"
                        onClick={() => handleDecrement("child")}
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        className="increment"
                        onClick={() => handleIncrement("child")}
                      >
                        +
                      </button>
                    </div>
                  </li>

                  <li>
                    <div className="number-left">
                      <p>Trẻ sơ sinh</p>
                    </div>
                    <div className="number-right">
                      <button
                        className="decrement"
                        onClick={() => handleDecrement("infant")}
                      >
                        -
                      </button>
                      <span>{infants}</span>
                      <button
                        className="increment"
                        onClick={() => handleIncrement("infant")}
                      >
                        +
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Nút lên kế hoạch */}
        <button
          type="button"
          className="homepage-button"
          onClick={(e) => {
            e.preventDefault();
            handlePlan();
          }}
        >
          Lên kế hoạch
        </button>
      </div>
    </div>
  );
}

export default HomePage;
