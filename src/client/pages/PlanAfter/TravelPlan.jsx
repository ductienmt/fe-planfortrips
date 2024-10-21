import { useEffect, useState } from "react";
import PlanSummary from "./PlanSummary";
import TransportationCard from "./TransportationCard";
import AccommodationCard from "./AccommodationCard";
import AttractionCard from "./AttractionCard";
import "./TravelPlan.css";

function TravelPlan() {
  const [selectedCard, setSelectedCard] = useState("transportation");

  const tripData = JSON.parse(localStorage.getItem("tripData"));
  const [tripPlan, setTripPlan] = useState({});
  const [summaryItems, setSummaryItems] = useState([]);
  const [accommodationItems, setAccommodationItems] = useState([]);

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

  const newSummaryItems = tripData.data.userData
    ? [
        { label: "Location", value: tripData.data.userData.location },
        { label: "Destination", value: tripData.data.userData.destination },
        {
          label: "Start Date",
          value: formatDate(tripData.data.userData.startDate),
        },
        {
          label: "End Date",
          value: formatDate(tripData.data.userData.endDate),
        },
        {
          label: "Number of People",
          value: tripData.data.userData.numberPeople,
        },
        {
          label: "Budget",
          value: convertToVND(tripData.data.userData.budget),
        },
      ]
    : [];

  useEffect(() => {
    if (tripData) {
      setTripPlan(tripData);

      setSummaryItems(newSummaryItems);
    } // Cập nhật summaryItems ở đây
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
          img="https://cdn.builder.io/api/v1/image/assets/TEMP/2d3c33d736aad4abccd8a47609cc0bf5d6d61ec0ca67ffba42062bcd29757826?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
          departureTime={formatTime(tripData.data.transportation.departureTime)}
          arrivalTime={formatTime(tripData.data.transportation.arrivalTime)}
          nameVehicle={tripData.data.transportation.carCompanyName}
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
