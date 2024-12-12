import { useEffect, useState } from "react";
import PlanSummary from "./PlanSummary";
import TransportationCard from "./TransportationCard";
import AccommodationCard from "./AccommodationCard";
import AttractionCard from "./AttractionCard";
import "./TravelPlan.css";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import { Link, useNavigate } from "react-router-dom";
import { TicketService } from "../../../services/apis/TicketService";
import { useAuth } from "../../../context/AuthContext/AuthProvider";
import { useSnackbar } from "notistack";
import { convertToVND } from "../../../utils/FormatMoney";
import Loader from "../../Components/Loading";

function TravelPlan() {
  const [selectedCard, setSelectedCard] = useState("transportation");
  const [tripData, setTripData] = useState(
    JSON.parse(sessionStorage.getItem("tripData")) || {}
  );
  // const tripData = JSON.parse(sessionStorage.getItem("tripData"));
  const [summaryItems, setSummaryItems] = useState([]);
  const [accommodationItems, setAccommodationItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { role, username } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const getLastThreeWords = (text) => {
    const words = text.split(" ");
    return words.length <= 3 ? text : words.slice(-3).join(" ");
  };

  const seatsDe = tripData?.transportation?.departure?.seatBook
    ? tripData.transportation.departure.seatBook
        .map((seat) => seat.seat_number)
        .join(", ")
    : "Chưa có dữ liệu chỗ ngồi";

  const seatsRe = tripData?.transportation?.return?.seatBook
    ? tripData.transportation.departure.seatBook
        .map((seat) => seat.seat_number)
        .join(", ")
    : "Chưa có dữ liệu chỗ ngồi";

  const calculateDuration = (departureTime, arrivalTime) => {
    const [departureHours, departureMinutes] = departureTime
      .split(":")
      .map(Number);
    const [arrivalHours, arrivalMinutes] = arrivalTime.split(":").map(Number);

    const departureDate = new Date();
    const arrivalDate = new Date();

    departureDate.setHours(departureHours, departureMinutes);
    arrivalDate.setHours(arrivalHours, arrivalMinutes);

    let diffInMs = arrivalDate.getTime() - departureDate.getTime();

    if (diffInMs < 0) {
      diffInMs += 24 * 60 * 60 * 1000;
    }

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const formatTime = (dateTime) => {
    if (typeof dateTime !== "string") {
      return "";
    }
    const timePart = dateTime.split("T")[1];
    if (!timePart) {
      return "";
    }

    return timePart.split(":").slice(0, 2).join(":");
  };

  const formatDate = (dateTime) => {
    const datePart = dateTime.split(" ")[0];
    return datePart; // Trả về chỉ phần ngày
  };

  const formatDateT = (dateTime) => {
    const datePart = dateTime.split("T")[0];
    return datePart; // Trả về chỉ phần ngày
  };

  const handleCardClick = (card) => {
    setSelectedCard(card === selectedCard ? null : card); // Nếu click lại thì bỏ chọn
    if (card == "attraction") handleAttractionSelected();
    // if (card == "transportation") handleTransportationSelected();
  };

  const handleAttractionSelected = () => {
    setSelectedCard("attraction");
  };

  // const handleTransportationSelected = () => {
  //   setSelectedCard("transportation");
  // };

  const handleSubmit = async () => {
    try {
      if (!role) {
        sessionStorage.setItem("previousUrl", window.location.pathname);
        enqueueSnackbar("Vui lòng đăng nhập để tiếp tục", {
          variant: "error",
          autoHideDuration: 1000,
          onExit: () => {
            navigate("/login");
          },
        });
        return;
      } else {
        const transportationDeparturePlanData = {
          carId: tripData.transportation.departure.vehicleCode,
          totalPrice: tripData.transportation.departure.totalPrice,
          startDate: tripData.transportation?.departure?.departureTime?.replace(
            "T",
            " "
          ),
          endDate: tripData.transportation?.departure?.arrivalTime?.replace(
            "T",
            " "
          ),
          ticketId: null,
        };
        const transportationReturnPlanData = {
          carId: tripData.transportation.return.vehicleCode,
          totalPrice: tripData.transportation?.return?.totalPrice,
          startDate: tripData.transportation?.return?.departureTime?.replace(
            "T",
            " "
          ),
          endDate: tripData.transportation.return.arrivalTime.replace("T", " "),
          ticketId: null,
        };
        const hotelPlanData = {
          hotelId: tripData.accomodation.hotelId,
          totalPrice: tripData.accomodation.total,
          startDate: tripData.accomodation.rooms.checkin,
          endDate: tripData.accomodation.rooms.checkout,
          ticketId: null,
        };
        const planData = {
          planName: `Khám phá ${tripData.userData.destination.toLowerCase()}`,
          startDate: tripData.userData.startDate.replace("T", " "),
          endDate: tripData.userData.endDate.replace("T", " "),
          location: tripData.userData.location,
          destination: tripData.userData.destination,
          budget: tripData.userData.budget,
          numberPeople: tripData.userData.numberPeople,
          totalPrice: tripData.estimatedCost,
          discountPrice: 0,
          finalPrice: tripData.estimatedCost,
          planDetails: [
            transportationDeparturePlanData,
            transportationReturnPlanData,
            hotelPlanData,
          ],
        };
        sessionStorage.setItem("planData", JSON.stringify(planData));
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/booking/plan");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      alert("Tạo chuyến đi thất bại!");
    }
  };

  const newSummaryItems = tripData.userData
    ? [
        {
          label: "Xuất phát",
          value: getLastThreeWords(tripData.userData.location),
        },
        {
          label: "Điểm đến",
          value: getLastThreeWords(tripData.userData.destination),
        },
        {
          label: "Ngày đi",
          value: formatDate(tripData.userData.startDate),
        },
        {
          label: "Ngày về",
          value: formatDate(tripData.userData.endDate),
        },
        {
          label: "Số lượng người",
          value: tripData.userData.numberPeople,
        },
        {
          label: "Ngân sách",
          value: convertToVND(tripData.userData.budget),
        },
      ]
    : [];

  const loadTripData = () => {
    const tripDataFromStorage = JSON.parse(sessionStorage.getItem("tripData"));
    if (tripDataFromStorage) {
      setTripData(tripDataFromStorage);
    }
  };

  useEffect(() => {
    if (tripData) {
      // console.log(tripData.userData?.budget);

      setSummaryItems(newSummaryItems);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader rong={"80vh"} />
      ) : (
        <>
          <main className="travel-plan">
            <PlanSummary summaryItems={summaryItems} />
            <section className="travel-details">
              <TransportationCard
                className={
                  selectedCard === "transportation"
                    ? "active"
                    : selectedCard
                      ? "inactive"
                      : ""
                }
                onClick={() => handleCardClick("transportation")}
                // onNext = {handleTransportationSelected}
                vehicleCode={tripData.transportation.departure.vehicleCode}
                departureTime={formatTime(
                  tripData.transportation.departure.departureTime
                )}
                departureDate={formatDateT(
                  tripData.transportation.departure.departureTime
                )}
                arrivalDate={formatDateT(
                  tripData.transportation.departure.arrivalTime
                )}
                arrivalTime={formatTime(
                  tripData.transportation.departure.arrivalTime
                )}
                nameVehicle={tripData.transportation.departure.carName}
                seatCode={seatsDe}
                scheduleId={tripData.transportation.departure.scheduleId}
                timeCommunicate={calculateDuration(
                  formatTime(tripData.transportation.departure.departureTime),
                  formatTime(tripData.transportation.departure.arrivalTime)
                )}
                total={tripData.transportation?.departure?.totalPrice}
                routeId={tripData.transportation?.departure?.routeId}
                originalLocation={tripData.userData?.location}
                destination={tripData.userData?.destination}
                re={tripData.transportation?.return}
                numPeople={tripData.userData?.numberPeople}
                loadAgain={loadTripData}
              />
              <AccommodationCard
                className={
                  selectedCard === "accommodation"
                    ? "active"
                    : selectedCard
                      ? "inactive"
                      : ""
                }
                onClick={() => handleCardClick("accommodation")}
                accomodation={tripData.accomodation}
                destination={tripData.userData.destination}
              />
              <AttractionCard
                className={
                  selectedCard === "attraction"
                    ? "active"
                    : selectedCard
                      ? "inactive"
                      : ""
                }
                onClick={() => handleCardClick("attraction")}
                onNext={handleAttractionSelected}
                onBack={handleAttractionSelected}
                checkin={tripData.checkins}
              />
            </section>
            <div
              className="travel-plan-footer"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {/* <button className="travel-plan-footer-button">Edit</button> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="travel-plan-footer-button btn"
                style={{
                  width: "30%",
                  backgroundColor: "#0976CF",
                  color: "white",
                  height: "50px",
                  fontSize: "20px",
                }}
              >
                Xác nhận kế hoạch
              </button>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default TravelPlan;
