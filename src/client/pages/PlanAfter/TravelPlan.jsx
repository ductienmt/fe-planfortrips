import { useEffect, useState } from "react";
import PlanSummary from "./PlanSummary";
import TransportationCard from "./TransportationCard";
import AccommodationCard from "./AccommodationCard";
import AttractionCard from "./AttractionCard";
import "./TravelPlan.css";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import { Link } from "react-router-dom";
import { TicketService } from "../../../services/apis/TicketService";

function TravelPlan() {
  const [selectedCard, setSelectedCard] = useState("transportation");
  const tripData = JSON.parse(localStorage.getItem("tripData"));
  const [summaryItems, setSummaryItems] = useState([]);
  const [accommodationItems, setAccommodationItems] = useState([]);

  const seats = tripData.transportation.departure.seatBook
    .map((seat) => seat.seat_number)
    .join(", ");

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

  const convertToVND = (amount) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}.000VNĐ`;
  };

  const formatDate = (dateTime) => {
    const datePart = dateTime.split(" ")[0];
    return datePart; // Trả về chỉ phần ngày
  };

  const handleCardClick = (card) => {
    setSelectedCard(card === selectedCard ? null : card); // Nếu click lại thì bỏ chọn
    console.log(card);
    if (card == "attraction") handleAttractionSelected();
  };

  const handleAttractionSelected = () => {
    setSelectedCard("attraction");
  };

  const handleSubmit = async () => {
    try {
      const response = await TicketService.create();
      if (response.status === 201) {
        alert("Tạo chuyến đi thành công!");
      } else {
        alert("Tạo chuyến đi thất bại!");
      }
    } catch (error) {
      alert("Tạo chuyến đi thất bại!");
    }
  };

  const newSummaryItems = tripData.userData
    ? [
        { label: "Location", value: tripData.userData.location },
        { label: "Destination", value: tripData.userData.destination },
        {
          label: "Start Date",
          value: formatDate(tripData.userData.startDate),
        },
        {
          label: "End Date",
          value: formatDate(tripData.userData.endDate),
        },
        {
          label: "Number of People",
          value: tripData.userData.numberPeople,
        },
        {
          label: "Budget",
          value: convertToVND(tripData.userData.budget),
        },
      ]
    : [];

  useEffect(() => {
    if (tripData) {
      setSummaryItems(newSummaryItems);
    }
  }, []);

  return (
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
          vehicleCode={tripData.transportation.departure.vehicleCode}
          departureTime={formatTime(
            tripData.transportation.departure.departureTime
          )}
          arrivalTime={formatTime(
            tripData.transportation.departure.arrivalTime
          )}
          nameVehicle={tripData.transportation.departure.carName}
          seatCode={seats}
          scheduleId={tripData.transportation.departure.scheduleId}
          timeCommunicate={calculateDuration(
            formatTime(tripData.transportation.departure.departureTime),
            formatTime(tripData.transportation.departure.arrivalTime)
          )}
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
        />
        <AttractionCard
          className={
            selectedCard === "attraction"
              ? "active"
              : selectedCard
              ? "inactive"
              : ""
          }
          onClick={
            () => handleCardClick("attraction") // Gọi hàm này khi click vào AttractionCard
          }
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
  );
}

export default TravelPlan;
