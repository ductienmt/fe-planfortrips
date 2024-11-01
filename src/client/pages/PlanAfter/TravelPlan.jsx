import { useEffect, useState } from "react";
import PlanSummary from "./PlanSummary";
import TransportationCard from "./TransportationCard";
import AccommodationCard from "./AccommodationCard";
import AttractionCard from "./AttractionCard";
import "./TravelPlan.css";
import { ScheduleService } from "../../../services/apis/ScheduleService";

function TravelPlan() {
  const [selectedCard, setSelectedCard] = useState("transportation");
  const tripData = JSON.parse(sessionStorage.getItem("tripData"));
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

  // Hàm này chỉ được gọi khi nhấn next hoặc back trong AttractionCard
  const handleAttractionSelected = () => {
    setSelectedCard("attraction"); // Luôn chọn AttractionCard khi nhấn next hoặc back
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
          img="https://flane.vn/wp-content/uploads/2023/12/xe-phuong-trang-7.png"
          departureTime={formatTime(
            tripData.transportation.departure.departureTime
          )}
          arrivalTime={formatTime(
            tripData.transportation.departure.arrivalTime
          )}
          nameVehicle={tripData.transportation.departure.carName}
          seatCode={seats}
          scheduleId={tripData.transportation.departure.scheduleId}
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
          name={tripData.accomodation.nameHotel}
          room={tripData.accomodation.nameRoom}
          roomtype={tripData.accomodation.roomType}
          checkin={tripData.accomodation.checkin}
          checkout={tripData.accomodation.checkout}
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
          onNext={handleAttractionSelected} // Truyền hàm này vào props
          onBack={handleAttractionSelected} // Truyền hàm này vào props
        />
      </section>
    </main>
  );
}

export default TravelPlan;
