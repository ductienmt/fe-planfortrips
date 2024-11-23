import "./ChooseProvinceDetail.css";
import phuquoc from "../../../../assets/phuquoc.jpg";
import ChooseProvince from "../chooseProvince/ChooseProvince";
import TourCard from "../../Homepage/TourCard/TourCard";
import { useNavigate } from "react-router-dom";

const ChooseProvinceDetail = () => {
  const navigate = useNavigate();
  const provincesFollowArea = [
    { img: phuquoc, provinceName: "Hưng Yên" },
    { img: phuquoc, provinceName: "Hà Nội" },
    { img: phuquoc, provinceName: "Hạ Long" },
    { img: phuquoc, provinceName: "Cao Bằng" },
    { img: phuquoc, provinceName: "Lào Cai" },
    { img: phuquoc, provinceName: "Điện Biên" },
  ];

  const tourCard = [
    {
      image: phuquoc,
      title: "Tour Đảo Phú Quốc",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      location: "Phú Quốc, Kiên Giang",
      people: "2 người",
      nights: "2N/1Đ",
      rating: "4.5",
      price: "5.000.000",
      feedback: "25",
      number: "2",
    },
  ];
  const handleCardClick = (area) => {
    if (area === "Miền Bắc") {
      navigate("/check-in/mien-bac/hung-yen"); // Đường dẫn đến trang khách sạn
    }
    // Bạn có thể thêm logic khác nếu cần điều hướng theo từng vùng miền.
  };
  return (
    <>
      <div className="chooseProvinceDetail-container">
        <div className="checkInPage-text mt-5">
          <h2 className="text-center">TOP ĐỊA ĐIỂM THAM QUAN Ở CÁC TỈNH</h2>
          <p className="text-center w-50 mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            non quibusdam a culpa repellat? Magni ad et exercitationem
            voluptates reiciendis sint cumque non, rem tempora temporibus
            corrupti quidem. Vel, facere.
          </p>
        </div>
        <div className="checkInPage-card-chooseProvince">
          {provincesFollowArea.map((province, index) => (
            <ChooseProvince
              key={index} // Sử dụng index làm key (tốt hơn là sử dụng ID nếu có)
              img={province.img}
              provinceName={province.provinceName}
              onClick={() => handleCardClick("Miền Bắc")}
            />
          ))}
        </div>

        <div className="checkInPage-text mt-5">
          <h2 className="text-center">GỢI Ý TOUR DU LỊCH DÀNH CHO BẠN</h2>
          <p className="text-center w-50 mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            non quibusdam a culpa repellat? Magni ad et exercitationem
            voluptates reiciendis sint cumque non, rem tempora temporibus
            corrupti quidem. Vel, facere.
          </p>
        </div>
        <div className="checkInPage-card-chooseTour mt-5">
          {tourCard.map((tour, index) => (
            <TourCard
              key={index}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              location={tour.location}
              people={tour.people}
              nights={tour.nights}
              rating={tour.rating}
              price={tour.price}
              feedback={tour.feedback}
              number={tour.number}
              handleClick={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default ChooseProvinceDetail;
