import PlaceCard from "../placeCard/PlaceCard";
import "./ChooseCheckinFollowArea.css";
import phuquoc from "../../../../assets/phuquoc.jpg";
import TourCard from "../../Homepage/TourCard/TourCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckinService } from "../../../../services/apis/CheckinService";
import { set } from "date-fns";
import Loader from "../../../Components/Loading";

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

  const { city } = useParams();
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCityData = async (id) => {
    try {
      setLoading(true);
      const response = await CheckinService.getCheckInByCityId(id);

      // console.log("cities", response.data);

      setCityData(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("ChooseCheckinFollowArea id", city);
    document.title = "Điểm check-in";
    window.scrollTo(0, 0);
    loadCityData(city);
  }, [city]);

  const convertToVNDD = (amount) => {
    if (amount === undefined || amount === null) {
      return "0 VND";
    }
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".000 VND";
  };

  return (
    <>
      {loading ? (
        <Loader rong={"80vh"} />
      ) : (
        <>
          <div className="chooseCheckinCard-container">
            <div className=" mt-5">
              <h2 className="text-center" style={{ fontWeight: "700" }}>
                CÁC ĐỊA ĐIỂM THAM QUAN Ở TỈNH
              </h2>
              <p className="text-center w-50 mx-auto"></p>
            </div>
            <div className="placeCard-container">
              {cityData.map((place, index) => (
                <PlaceCard
                  key={index}
                  img={place.images[0]?.url}
                  fee={
                    place.payFee === 0
                      ? "Miễn phí"
                      : convertToVNDD(place.payFee)
                  }
                  name={place.name}
                  address={place.address}
                />
              ))}
            </div>
            <div className="checkInPage-text mt-5">
              <h2 className="text-center">GỢI Ý TOUR DU LỊCH DÀNH CHO BẠN</h2>
              <p className="text-center w-50 mx-auto"></p>
            </div>
            <div className="checkInPage-card-chooseTour mb-5">
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
      )}
    </>
  );
};
export default ChooseCheckinFollowArea;
