import "./ChooseProvinceDetail.css";
import phuquoc from "../../../../assets/phuquoc.jpg";
import ChooseProvince from "../chooseProvince/ChooseProvince";
import TourCard from "../../Homepage/TourCard/TourCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CityService } from "../../../../services/apis/CityService";
import Loader from "../../../Components/Loading";

const ChooseProvinceDetail = () => {
  const navigate = useNavigate();
  const { area } = useParams();
  const [provincesFollowArea, setProvincesFollowArea] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCitiesData = async (id) => {
    try {
      setLoading(true);
      const response = await CityService.getCitiesByAreaId(id);
      // console.log("cities", response);
      setProvincesFollowArea(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Các tỉnh thành";
    console.log("ChooseProvinceDetail id", area);

    loadCitiesData(area);
  }, [area]);

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
      {loading ? (
        <Loader rong={"80vh"} />
      ) : (
        <>
          <div className="chooseProvinceDetail-container">
            <div className="checkInPage-text mt-5">
              <h2 className="text-center" style={{ fontWeight: "700" }}>
                CÁC TỈNH CỦA KHU VỰC
              </h2>
              <p className="text-center w-50 mx-auto">
                Các tỉnh của khu vực này, bạn{" "}
                <span style={{ fontStyle: "italic" }}>Click</span> vào thành phố
                bạn muốn xem các điểm check-in nhé !
              </p>
            </div>
            <div className="checkInPage-card-chooseProvince">
              {provincesFollowArea.map((province, index) => (
                <ChooseProvince
                  key={index}
                  img={
                    province.image ||
                    "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asadphoto-457882.jpg&fm=jpg"
                  }
                  provinceName={province.nameCity}
                  linkTo={`/check-in/city/${province.id}`}
                />
              ))}
            </div>

            <div className="checkInPage-text mt-5">
              <h2 className="text-center">GỢI Ý TOUR DU LỊCH DÀNH CHO BẠN</h2>
              <p className="text-center w-50 mx-auto">
                Các tour du lịch tới các địa điểm thành phố mà Plan for Trips
                gợi ý nè !
              </p>
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
export default ChooseProvinceDetail;
