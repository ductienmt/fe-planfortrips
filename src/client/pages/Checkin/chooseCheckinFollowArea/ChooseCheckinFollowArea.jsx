import PlaceCard from "../placeCard/PlaceCard";
import "./ChooseCheckinFollowArea.css";
import hotay from "../../../../assets/hotay.jpg";
import phuquoc from "../../../../assets/phuquoc.jpg";
import TourCard from "../../Homepage/TourCard/TourCard";

const ChooseCheckinFollowArea = () => {

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

  return (
    <>
      <div className="chooseCheckinCard-container">
        <div className=" mt-5">
          <h2 className="text-center">TOP ĐỊA ĐIỂM THAM QUAN Ở CÁC TỈNH</h2>
          <p className="text-center w-50 mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            non quibusdam a culpa repellat? Magni ad et exercitationem
            voluptates reiciendis sint cumque non, rem tempora temporibus
            corrupti quidem. Vel, facere.
          </p>
        </div>
        <div className="placeCard-container">
            <PlaceCard
            img={hotay}
            fee= "0.00"
            name= "Đền Quán Thánh"
            address= "Số 42-44 Quán Thánh, Ba Đình"
            />
            <PlaceCard
            img={hotay}
            fee= "0.00"
            name= "Đền Quán Thánh"
            address= "Số 42-44 Quán Thánh, Ba Đình"
            />
            <PlaceCard
            img={hotay}
            fee= "0.00"
            name= "Đền Quán Thánh"
            address= "Số 42-44 Quán Thánh, Ba Đình"
            />
            <PlaceCard
            img={hotay}
            fee= "0.00"
            name= "Đền Quán Thánh"
            address= "Số 42-44 Quán Thánh, Ba Đình"
            />
            <PlaceCard
            img={hotay}
            fee= "0.00"
            name= "Đền Quán Thánh"
            address= "Số 42-44 Quán Thánh, Ba Đình"
            />
            <PlaceCard
            img={hotay}
            fee= "0.00"
            name= "Đền Quán Thánh"
            address= "Số 42-44 Quán Thánh, Ba Đình"
            />
        </div>
        <div className="checkInPage-text mt-5">
        <h2 className="text-center">GỢI Ý TOUR DU LỊCH DÀNH CHO BẠN</h2>
        <p className="text-center w-50 mx-auto">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          non quibusdam a culpa repellat? Magni ad et exercitationem voluptates
          reiciendis sint cumque non, rem tempora temporibus corrupti quidem.
          Vel, facere.
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
export default ChooseCheckinFollowArea;
