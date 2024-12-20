import React, { useState, useEffect } from "react";
import "../Checkin/checkinpage.css";
import miennam from "../../../assets/miennam.jpeg";
import mientrung from "../../../assets/mientrung.jpg";
import mienbac from "../../../assets/mienbac.jpeg";
import phuquoc from "../../../assets/phuquoc.jpg";
import ChooseAreaCard from "./chooseAreaCard/ChooseAreaCard";
import ChooseProvince from "./chooseProvince/ChooseProvince";
import TourCard from "../Homepage/TourCard/TourCard";
import { useNavigate } from "react-router-dom";
import { CityService } from "../../../services/apis/CityService";
import Loader from "../../Components/Loading";
import { TourService } from "../../../services/apis/TourService";

const Checkinpage = () => {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tourData, setTourData] = useState([]);

  // const tourCard = [
  //   {
  //     image: phuquoc,
  //     title: "Tour Đảo Phú Quốc",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. 1",
  //     location: "Phú Quốc, Kiên Giang",
  //     people: "2 người",
  //     nights: "2N/1Đ",
  //     rating: "4.5",
  //     price: "5.000.000",
  //     feedback: "25",
  //     number: "2",
  //   },
  // ];

  const loadDataCityFavorites = async () => {
    try {
      setLoading(true);
      const response = await CityService.getFavoriteCity();
      setProvinces(response);
    } catch (error) {
      console.log("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTourData = async () => {
    try {
      const response = await TourService.getTopTour();
      console.log("tourData", response);
      setTourData(response);
    } catch (error) {
      console.error("Error fetching tour data", error);
    }
  };

  useEffect(() => {
    document.title = "Check-in";
    window.scrollTo(0, 0);
    loadDataCityFavorites();
    loadTourData();
  }, []);

  return (
    <>
      <div className="checkInPage-header mt-5">
        <h4 className="text-center py-3 text-head">
          Plan for Trips đồng hành cùng bạn trên hành trình khám phá Việt Nam
        </h4>
        <h1 className="text-center" style={{ color: "black" }}>
          NHỮNG NƠI THAM QUAN PHỔ BIẾN TRÊN MỌI MIỀN
        </h1>
        <p className="text-center w-50 mx-auto">
          Tham quan những địa điểm du lịch phổ biến nhất ở mỗi miền của Việt
          Nam. Hãy chọn miền bạn muốn khám phá! Plan for Trips sẽ giúp bạn tìm
          kiếm những địa điểm du lịch phù hợp
        </p>
      </div>
      <div className="checkInPage-card-chooseArea">
        <ChooseAreaCard
          img={mienbac}
          chooseArea="Miền Bắc"
          linkto={"/check-in/area/MB"}
        />
        <ChooseAreaCard
          img={mientrung}
          chooseArea="Miền Trung"
          linkto={"/check-in/area/MT"}
        />
        <ChooseAreaCard
          img={miennam}
          chooseArea="Miền Nam"
          linkto={"/check-in/area/MN"}
        />
      </div>
      <div className="checkInPage-text mt-5">
        <h2 className="text-center" style={{ fontWeight: "700" }}>
          TOP CÁC TỈNH ĐƯỢC YÊU THÍCH
        </h2>
        <p className="text-center w-50 mx-auto">
          Các tỉnh được du khách yêu thích và thường xuyên tham quan nhất ở Việt
          Nam
        </p>
      </div>
      {loading ? (
        <Loader rong={"20vh"} />
      ) : (
        <>
          <div className="checkInPage-card-chooseProvince">
            {provinces.map((province) => (
              <ChooseProvince
                key={province.city_id}
                img={province.image_url}
                provinceName={province.name_city}
                linkTo={`/check-in/city/${province.city_id}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="checkInPage-text mt-5">
        <h2 className="text-center">
          TOUR DU LỊCH PLAN FOR TRIPS GỢI Ý CHO BẠN
        </h2>
        <p className="text-center w-50 mx-auto">
          Các tour du lịch cố địch được Plan for Trips gợi ý cho bạn. Hãy chọn
          tour phù hợp với bạn nhất! Plan for Trips giúp bạn tổng hợp lại các
          combo dịch vụ thành 1 tour du lịch cho bạn
        </p>
      </div>
      <div className="checkInPage-card-chooseTour mb-5">
        {tourData.map((tour) => (
          <TourCard
            key={tour.tourId}
            image={tour.tourImage}
            title={tour.tourTitle}
            description={
              tour.tourDescription.length > 150
                ? `${tour.tourDescription.substring(0, 150)}...`
                : tour.tourDescription
            }
            location={
              tour.tourDestination.includes("-")
                ? tour.tourDestination.split("-")[1]
                : tour.tourDestination
            }
            people={tour.tourPeople}
            nights={tour.tourDays}
            rating={tour.tourRating}
            contentButton={"Xem chi tiết"}
            tags={tour.tourTags}
            numberPeopleUsed={tour.tourUsed}
            handleClick={() => {}}
          />
        ))}
      </div>
    </>
  );
};

export default Checkinpage;
