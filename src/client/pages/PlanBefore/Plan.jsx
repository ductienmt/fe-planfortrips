// import { useState, useEffect, useRef, useContext } from "react";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { handleInputChange } from "../../../utils/FormatMoney";
// import provinces from "../../../utils/Provinces.json";
// import { useSnackbar } from "notistack";
// import "./Plan.css";
// import { flatpickrConfig } from "../../../utils/ConfigFlatpickr";
// import { DateFormatter } from "../../../utils/DateFormat";
// import { PlanServiceApi } from "../../../services/apis/PlanServiceApi";
// import { generateTripPlan } from "../../../services/planService";
// import Loading from "../../Components/Loading";
// import { useNavigate } from "react-router-dom";

// function PlanBefore() {
//   const [loading, setLoading] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();
//   const [adults, setAdults] = useState(0);
//   const [children, setChildren] = useState(0);
//   const [infants, setInfants] = useState(0);
//   const nagigate = useNavigate();

//   const [showNumberBox, setShowNumberBox] = useState(false);

//   const ngayDiRef = useRef(null);
//   const ngayVeRef = useRef(null);

//   const [budget, setBudget] = useState("");

//   const [queryCurrentCity, setQueryCurrentCity] = useState("");
//   const [queryDestination, setQueryDestination] = useState("");
//   const [filteredCurrentCities, setFilteredCurrentCities] = useState([]);
//   const [filteredDestinations, setFilteredDestinations] = useState([]);

//   const [formData, setFormData] = useState({
//     location: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     numberPeople: 0,
//     budget: 0.0,
//   });

//   const [planData, setPlanData] = useState({
//     location: "Hồ Chí Minh",
//     destination: "Vũng Tàu",
//     startDate: "25-10-2024 08:00:00",
//     endDate: "28-10-2024 14:00:00",
//     numberPeople: 3,
//     budget: 5000,
//   });

//   const parseBudget = (budget) => {
//     const budgetNumber = parseFloat(budget.replace(/,/g, ""));
//     return budgetNumber / 1000;
//   };

//   const handlePlan = async () => {
//     console.log(queryCurrentCity);

//     if (validatePlan()) {
//       setFormData({
//         ...formData,
//         location: queryCurrentCity,
//         destination: queryDestination,
//         startDate: DateFormatter(ngayDiRef.current.value),
//         endDate: DateFormatter(ngayDiRef.current.value),
//         numberPeople: adults + children + infants,
//         budget: parseBudget(budget),
//       });
//       console.log(formData);
//       try {
//         const response = await PlanServiceApi.getData(formData);
//         setLoading(true);
//         console.log(response.data);
//         const tripPlan = await generateTripPlan(response.data);
//         console.log(tripPlan);
//         if (tripPlan.estimatedCost < tripPlan.userData.budget) {
//           console.log("Setting trip plan:", tripPlan);
//           sessionStorage.setItem("tripData", JSON.stringify(tripPlan));
//           nagigate("/plan/trip");
//         }
//         if (tripPlan.notification) {
//           enqueueSnackbar("Không đủ chi phí lên kế hoạch bạn", {
//             variant: "info",
//             autoHideDuration: 2000,
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         enqueueSnackbar("Lỗi khi lên kế hoạch!", {
//           variant: "error",
//           autoHideDuration: 2000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const validatePlan = () => {
//     const totalPeople = adults + children + infants;
//     const errorMessages = [
//       totalPeople > 20 && "Số lượng người không được vượt quá 20!",
//       (children > 0 || infants > 0) &&
//         adults === 0 &&
//         "Cần ít nhất 1 người lớn nếu có trẻ em hoặc trẻ sơ sinh!",
//       !queryCurrentCity && "Vui lòng chọn thành phố hiện tại!",
//       !queryDestination && "Vui lòng chọn điểm đến!",
//       !ngayDiRef.current.value && "Vui lòng chọn ngày đi!",
//       !ngayVeRef.current.value && "Vui lòng chọn ngày về!",
//       !budget && "Vui lòng nhập ngân sách!",
//       adults === 0 &&
//         children === 0 &&
//         infants === 0 &&
//         "Vui lòng chọn ít nhất một người!",
//     ].filter(Boolean);

//     if (errorMessages.length > 0) {
//       enqueueSnackbar(errorMessages[0], { variant: "error" });
//       return false;
//     }
//     return true;
//   };

//   const handleBudgetChange = (event) => {
//     handleInputChange(event, setBudget, (errorMessage) => {
//       if (errorMessage) {
//         enqueueSnackbar(errorMessage, {
//           variant: "error",
//           autoHideDuration: 3000,
//         });
//       }
//     });
//   };

//   // Xử lý khi người dùng nhập tỉnh, thành phố đang ở
//   const handleInputChangeCurrentCity = (event) => {
//     const value = event.target.value.trim();
//     setQueryCurrentCity(value);
//     setFilteredCurrentCities(
//       value
//         ? provinces.results.filter((province) =>
//             province.province_name.toLowerCase().includes(value.toLowerCase())
//           )
//         : []
//     );
//   };

//   // Xử lý khi người dùng nhập điểm đến
//   const handleInputChangeDestination = (event) => {
//     const value = event.target.value.trim();
//     setQueryDestination(value);
//     setFilteredDestinations(
//       value
//         ? provinces.results.filter((province) =>
//             province.province_name.toLowerCase().includes(value.toLowerCase())
//           )
//         : []
//     );
//   };

//   // Khi chọn gợi ý tỉnh, thành phố
//   const handleCurrentCitySuggestionClick = (provinceName) => {
//     setQueryCurrentCity(provinceName); // Điền tỉnh đã chọn vào input
//     setFilteredCurrentCities([]); // Xóa danh sách gợi ý sau khi chọn
//   };

//   // Khi chọn gợi ý điểm đến
//   const handleDestinationSuggestionClick = (provinceName) => {
//     setQueryDestination(provinceName); // Điền tỉnh đã chọn vào input
//     setFilteredDestinations([]); // Xóa danh sách gợi ý sau khi chọn
//   };

//   const today = new Date();
//   const maxDate = new Date(new Date().setFullYear(today.getFullYear() + 1));

//   useEffect(() => {
//     document.title = "Lên kế hoạch";
//     window.scrollTo(0, 200);

//     if (ngayDiRef.current && ngayVeRef.current) {
//       const ngayDiPicker = flatpickr(ngayDiRef.current, {
//         altInput: true,
//         altFormat: "d-m-Y H:i", // Định dạng hiển thị ngày và giờ
//         dateFormat: "Y-m-d H:i", // Định dạng cho giá trị thực
//         locale: flatpickrConfig,
//         minDate: today,
//         maxDate: maxDate,
//         enableTime: true, // Bật chọn giờ
//         time_24hr: true, // Sử dụng định dạng 24 giờ
//         onChange: function (selectedDates) {
//           const ngayDi = selectedDates[0];
//           const ngayVe = ngayVePicker.selectedDates[0];

//           if (ngayVe && ngayVe < ngayDi) {
//             ngayVePicker.setDate(ngayDi);
//             enqueueSnackbar("Ngày về không thể trước ngày đi!", {
//               variant: "error",
//             });
//           }
//         },
//       });

//       const ngayVePicker = flatpickr(ngayVeRef.current, {
//         altInput: true,
//         altFormat: "d-m-Y H:i", // Định dạng hiển thị ngày và giờ
//         dateFormat: "Y-m-d H:i", // Định dạng cho giá trị thực
//         locale: flatpickrConfig,
//         minDate: today,
//         maxDate: maxDate,
//         enableTime: true, // Bật chọn giờ
//         time_24hr: true, // Sử dụng định dạng 24 giờ
//         onChange: function (selectedDates) {
//           const ngayDi = ngayDiPicker.selectedDates[0];
//           const ngayVe = selectedDates[0];

//           if (ngayDi && ngayVe < ngayDi) {
//             enqueueSnackbar("Ngày về không thể trước ngày đi!", {
//               variant: "error",
//             });
//           }
//         },
//       });

//       // Mở ngayVePicker khi ngày đi được chọn
//       ngayDiPicker.config.onChange.push(() => {
//         ngayVePicker.open();
//       });

//       return () => {
//         ngayDiPicker.destroy();
//         ngayVePicker.destroy();
//       };
//     }
//   }, []);

//   const handleIncrement = (type) => {
//     const totalPeople = adults + children + infants;

//     if (totalPeople >= 20) {
//       enqueueSnackbar("Số lượng người không được vượt quá 20!", {
//         variant: "error",
//       });
//       return;
//     }

//     const incrementMap = {
//       adult: () => setAdults(adults + 1),
//       child: () => setChildren(children + 1),
//       infant: () => setInfants(infants + 1),
//     };

//     incrementMap[type]?.(); // Call the appropriate increment function
//   };

//   const handleDecrement = (type) => {
//     const decrementMap = {
//       adult: () => adults > 0 && setAdults(adults - 1),
//       child: () => children > 0 && setChildren(children - 1),
//       infant: () => infants > 0 && setInfants(infants - 1),
//     };

//     decrementMap[type]?.(); // Call the appropriate decrement function
//   };

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           <div className="plan-container">
//             <div className="overlay"></div>

//             <>
//               <h1 className="text-white">Nhập điểm đến của bạn</h1>
//               <h3 className="text-white">
//                 Plan for Trips, Nơi những chuyến đi tạo nên những ký ức đẹp.
//               </h3>
//             </>

//             <div className="form-container p-4 bg-light rounded">
//               {/* Nhập điểm đến */}
//               <div className="row mb-3">
//                 <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
//                   <label htmlFor="current-city" className="form-label">
//                     Vị trí hiện tại
//                   </label>
//                   <input
//                     type="text"
//                     id="current-city"
//                     value={queryCurrentCity}
//                     onChange={handleInputChangeCurrentCity}
//                     placeholder="Nhập tỉnh hoặc thành phố nơi bạn sống"
//                     className="homepage-input"
//                   />
//                   {/* Hiển thị gợi ý */}
//                   {filteredCurrentCities.length > 0 && (
//                     <ul className="suggestions-list">
//                       {filteredCurrentCities.map((province) => (
//                         <li
//                           key={province.province_id}
//                           onClick={() =>
//                             handleCurrentCitySuggestionClick(
//                               province.province_name
//                             )
//                           }
//                         >
//                           {province.province_name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="col-md-6 d-flex flex-column">
//                   <label htmlFor="destination" className="form-label">
//                     Điểm đến
//                   </label>
//                   <input
//                     type="text"
//                     id="destination"
//                     value={queryDestination}
//                     onChange={handleInputChangeDestination}
//                     placeholder="Nhập thành phố hoặc địa điểm du lịch"
//                     className="homepage-input"
//                   />
//                   {/* Hiển thị gợi ý */}
//                   {filteredDestinations.length > 0 && (
//                     <ul className="suggestions-list">
//                       {filteredDestinations.map((province) => (
//                         <li
//                           key={province.province_id}
//                           onClick={() =>
//                             handleDestinationSuggestionClick(
//                               province.province_name
//                             )
//                           }
//                         >
//                           {province.province_name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>

//               {/* Ngày đi và Ngày về */}
//               <div className="row mb-3">
//                 <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
//                   <label htmlFor="ngay-di" className="form-label">
//                     Ngày đi
//                   </label>
//                   <input
//                     ref={ngayDiRef}
//                     id="ngay-di"
//                     className="homepage-input"
//                     placeholder="Chọn ngày, giờ đi"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
//                   <label htmlFor="ngay-ve" className="form-label">
//                     Ngày về
//                   </label>
//                   <input
//                     ref={ngayVeRef}
//                     id="ngay-ve"
//                     className="homepage-input"
//                     placeholder="Chọn ngày, giờ về"
//                   />
//                 </div>
//               </div>

//               {/* Nhập ngân sách */}
//               <div className="row mb-3">
//                 <div className="col-md-6 mb-3 d-flex flex-column">
//                   <label htmlFor="budget" className="form-label">
//                     Chi phí cho chuyến đi (VNĐ)
//                   </label>
//                   <input
//                     type="text"
//                     id="budget"
//                     className="homepage-input"
//                     placeholder="Ví dụ: 5,000,000₫"
//                     value={budget}
//                     onChange={handleBudgetChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3 d-flex flex-column">
//                   <label htmlFor="people" className="form-label">
//                     Số lượng người
//                   </label>
//                   <input
//                     type="text"
//                     id="people"
//                     className="homepage-input"
//                     value={`${adults} người lớn, ${children} trẻ em, ${infants} trẻ sơ sinh`}
//                     readOnly
//                     onClick={() => setShowNumberBox(!showNumberBox)}
//                   />
//                   {showNumberBox && (
//                     <div className="number-box">
//                       <ul>
//                         <li>
//                           <div className="number-left">
//                             <p>Người lớn</p>
//                           </div>
//                           <div className="number-right">
//                             <button
//                               className="decrement"
//                               onClick={() => handleDecrement("adult")}
//                             >
//                               -
//                             </button>
//                             <span>{adults}</span>
//                             <button
//                               className="increment"
//                               onClick={() => handleIncrement("adult")}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </li>

//                         <li>
//                           <div className="number-left">
//                             <p>Trẻ em</p>
//                           </div>
//                           <div className="number-right">
//                             <button
//                               className="decrement"
//                               onClick={() => handleDecrement("child")}
//                             >
//                               -
//                             </button>
//                             <span>{children}</span>
//                             <button
//                               className="increment"
//                               onClick={() => handleIncrement("child")}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </li>

//                         <li>
//                           <div className="number-left">
//                             <p>Trẻ sơ sinh</p>
//                           </div>
//                           <div className="number-right">
//                             <button
//                               className="decrement"
//                               onClick={() => handleDecrement("infant")}
//                             >
//                               -
//                             </button>
//                             <span>{infants}</span>
//                             <button
//                               className="increment"
//                               onClick={() => handleIncrement("infant")}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {/* Nút lên kế hoạch */}
//               <button
//                 type="button"
//                 className="homepage-button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlePlan();
//                 }}
//               >
//                 Lên kế hoạch
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default PlanBefore;

import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleInputChange } from "../../../utils/FormatMoney";
import provinces from "../../../utils/Provinces.json";
import { useSnackbar } from "notistack";
import "./Plan.css";
import { flatpickrConfig } from "../../../utils/ConfigFlatpickr";
import { DateFormatter } from "../../../utils/DateFormat";
import { PlanServiceApi } from "../../../services/apis/PlanServiceApi";
import { generateTripPlan } from "../../../services/planService";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: false,
  adults: 0,
  children: 0,
  showNumberBox: false,
  budget: "",
  queryCurrentCity: "",
  queryDestination: "",
  filteredCurrentCities: [],
  filteredDestinations: [],
  formData: {
    location: "",
    destination: "",
    startDate: "",
    endDate: "",
    numberPeople: 0,
    budget: 0.0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ADULTS":
      return { ...state, adults: action.payload };
    case "SET_CHILDREN":
      return { ...state, children: action.payload };
    case "SET_SHOW_NUMBER_BOX":
      return { ...state, showNumberBox: action.payload };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    case "SET_QUERY_CURRENT_CITY":
      return { ...state, queryCurrentCity: action.payload };
    case "SET_QUERY_DESTINATION":
      return { ...state, queryDestination: action.payload };
    case "SET_FILTERED_CURRENT_CITIES":
      return { ...state, filteredCurrentCities: action.payload };
    case "SET_FILTERED_DESTINATIONS":
      return { ...state, filteredDestinations: action.payload };
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
}

function PlanBefore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const ngayDiRef = useRef(null);
  const ngayVeRef = useRef(null);

  const parseBudget = useCallback((budget) => {
    const budgetNumber = parseFloat(budget.replace(/,/g, ""));
    return budgetNumber / 1000;
  }, []);

  const handlePlan = useCallback(async () => {
    if (validatePlan()) {
      const updatedFormData = {
        location: state.queryCurrentCity,
        destination: state.queryDestination,
        startDate: DateFormatter(ngayDiRef.current.value),
        endDate: DateFormatter(ngayVeRef.current.value),
        numberPeople: state.adults + state.children,
        budget: parseBudget(state.budget),
      };

      dispatch({ type: "SET_FORM_DATA", payload: updatedFormData });

      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await PlanServiceApi.getData(updatedFormData);
        const tripPlan = await generateTripPlan(response.data);
        console.log(tripPlan);

        if (tripPlan?.estimatedCost <= updatedFormData.budget * 1000) {
          sessionStorage.setItem("tripData", JSON.stringify(tripPlan));
          navigate("/plan/trip");
        } else {
          enqueueSnackbar(
            `Chi phí ước tính (${tripPlan.estimatedCost.toLocaleString()} VNĐ) vượt quá ngân sách của bạn (${updatedFormData.budget.toLocaleString()} VNĐ). Vui lòng điều chỉnh kế hoạch.`,
            {
              variant: "error",
              autoHideDuration: 4000,
            }
          );
        }
      } catch (error) {
        console.log(error);

        enqueueSnackbar("Lỗi khi lên kế hoạch! Vui lòng thử lại sau.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  }, [state, parseBudget, navigate, enqueueSnackbar]);

  const validatePlan = useCallback(() => {
    const totalPeople = state.adults + state.children;
    const errorMessages = [
      totalPeople > 20 && "Số lượng người không được vượt quá 20!",
      state.children > 0 &&
        state.adults === 0 &&
        "Cần ít nhất 1 người lớn nếu có trẻ em!",
      !state.queryCurrentCity && "Vui lòng chọn thành phố hiện tại!",
      !state.queryDestination && "Vui lòng chọn điểm đến!",
      !ngayDiRef.current.value && "Vui lòng chọn ngày đi!",
      !ngayVeRef.current.value && "Vui lòng chọn ngày về!",
      !state.budget && "Vui lòng nhập ngân sách!",
      state.adults === 0 &&
        state.children === 0 &&
        "Vui lòng chọn ít nhất một người!",
    ].filter(Boolean);

    if (errorMessages.length > 0) {
      enqueueSnackbar(errorMessages[0], { variant: "error" });
      return false;
    }
    return true;
  }, [state, enqueueSnackbar]);

  const handleBudgetChange = useCallback(
    (event) => {
      handleInputChange(
        event,
        (value) => dispatch({ type: "SET_BUDGET", payload: value }),
        (errorMessage) => {
          if (errorMessage) {
            enqueueSnackbar(errorMessage, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
        }
      );
    },
    [enqueueSnackbar]
  );

  const handleInputChangeCurrentCity = useCallback((event) => {
    const value = event.target.value.trim();
    dispatch({ type: "SET_QUERY_CURRENT_CITY", payload: value });
    dispatch({
      type: "SET_FILTERED_CURRENT_CITIES",
      payload: value
        ? provinces.results.filter((province) =>
            province.province_name.toLowerCase().includes(value.toLowerCase())
          )
        : [],
    });
  }, []);

  const handleInputChangeDestination = useCallback((event) => {
    const value = event.target.value.trim();
    dispatch({ type: "SET_QUERY_DESTINATION", payload: value });
    dispatch({
      type: "SET_FILTERED_DESTINATIONS",
      payload: value
        ? provinces.results.filter((province) =>
            province.province_name.toLowerCase().includes(value.toLowerCase())
          )
        : [],
    });
  }, []);

  const handleCurrentCitySuggestionClick = useCallback((provinceName) => {
    dispatch({ type: "SET_QUERY_CURRENT_CITY", payload: provinceName });
    dispatch({ type: "SET_FILTERED_CURRENT_CITIES", payload: [] });
  }, []);

  const handleDestinationSuggestionClick = useCallback((provinceName) => {
    dispatch({ type: "SET_QUERY_DESTINATION", payload: provinceName });
    dispatch({ type: "SET_FILTERED_DESTINATIONS", payload: [] });
  }, []);

  const handleIncrement = useCallback(
    (type) => {
      const totalPeople = state.adults + state.children;

      if (totalPeople >= 20) {
        enqueueSnackbar("Số lượng người không được vượt quá 20!", {
          variant: "error",
        });
        return;
      }

      const incrementMap = {
        adult: () =>
          dispatch({ type: "SET_ADULTS", payload: state.adults + 1 }),
        child: () =>
          dispatch({ type: "SET_CHILDREN", payload: state.children + 1 }),
      };

      incrementMap[type]?.();
    },
    [state, enqueueSnackbar]
  );

  const handleDecrement = useCallback(
    (type) => {
      const decrementMap = {
        adult: () =>
          state.adults > 0 &&
          dispatch({ type: "SET_ADULTS", payload: state.adults - 1 }),
        child: () =>
          state.children > 0 &&
          dispatch({ type: "SET_CHILDREN", payload: state.children - 1 }),
      };

      decrementMap[type]?.();
    },
    [state]
  );

  useEffect(() => {
    document.title = "Lên kế hoạch";
    window.scrollTo(0, 200);

    if (ngayDiRef.current && ngayVeRef.current) {
      const ngayDiPicker = flatpickr(ngayDiRef.current, {
        altInput: true,
        altFormat: "d-m-Y H:i",
        dateFormat: "Y-m-d H:i",
        locale: flatpickrConfig,
        minDate: new Date(),
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        enableTime: true,
        time_24hr: true,
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
        altFormat: "d-m-Y H:i",
        dateFormat: "Y-m-d H:i",
        locale: flatpickrConfig,
        minDate: new Date(),
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        enableTime: true,
        time_24hr: true,
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

      ngayDiPicker.config.onChange.push(() => {
        ngayVePicker.open();
      });

      return () => {
        ngayDiPicker.destroy();
        ngayVePicker.destroy();
      };
    }
  }, [enqueueSnackbar]);

  return (
    <>
      {state.loading ? (
        <Loading rong={"80vh"} />
      ) : (
        <div className="plan-container">
          <div className="overlay"></div>
          <h1 className="text-white">Nhập điểm đến của bạn</h1>
          <h3 className="text-white">
            Plan for Trips, Nơi những chuyến đi tạo nên những ký ức đẹp.
          </h3>
          <div className="form-container p-4 bg-light rounded">
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0 d-flex flex-column">
                <label htmlFor="current-city" className="form-label">
                  Vị trí hiện tại
                </label>
                <input
                  type="text"
                  id="current-city"
                  value={state.queryCurrentCity}
                  onChange={handleInputChangeCurrentCity}
                  placeholder="Nhập tỉnh hoặc thành phố nơi bạn sống"
                  className="homepage-input"
                />
                {state.filteredCurrentCities.length > 0 && (
                  <ul className="suggestions-list">
                    {state.filteredCurrentCities.map((province) => (
                      <li
                        key={province.province_id}
                        onClick={() =>
                          handleCurrentCitySuggestionClick(
                            province.province_name
                          )
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
                  value={state.queryDestination}
                  onChange={handleInputChangeDestination}
                  placeholder="Nhập thành phố hoặc địa điểm du lịch"
                  className="homepage-input"
                />
                {state.filteredDestinations.length > 0 && (
                  <ul className="suggestions-list">
                    {state.filteredDestinations.map((province) => (
                      <li
                        key={province.province_id}
                        onClick={() =>
                          handleDestinationSuggestionClick(
                            province.province_name
                          )
                        }
                      >
                        {province.province_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
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
                  value={state.budget}
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
                  value={`${state.adults} người lớn, ${state.children} trẻ em`}
                  readOnly
                  onClick={() =>
                    dispatch({
                      type: "SET_SHOW_NUMBER_BOX",
                      payload: !state.showNumberBox,
                    })
                  }
                />
                {state.showNumberBox && (
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
                          <span>{state.adults}</span>
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
                          <span>{state.children}</span>
                          <button
                            className="increment"
                            onClick={() => handleIncrement("child")}
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
      )}
    </>
  );
}

export default PlanBefore;
