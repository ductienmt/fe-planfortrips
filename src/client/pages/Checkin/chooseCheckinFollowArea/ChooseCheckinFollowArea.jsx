import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import PlaceCard from "../placeCard/PlaceCard";
import "./ChooseCheckinFollowArea.css";
import TourCard from "../../Homepage/TourCard/TourCard";
import Loader from "../../../Components/Loading";
import { CheckinService } from "../../../../services/apis/CheckinService";
import { TourService } from "../../../../services/apis/TourService";
import { convertToVNDDB } from "../../../../utils/FormatMoney";

const ChooseCheckinFollowArea = () => {
  const { city } = useParams();
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tourData, setTourData] = useState([]);

  const loadCityData = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await CheckinService.getCheckInByCityId(id);
      setCityData(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTourData = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await TourService.getTourByCity(id);
      setTourData(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Điểm check-in";
    window.scrollTo(0, 0);
    loadCityData(city);
    loadTourData(city);
  }, [city, loadCityData, loadTourData]);

  return (
    <>
      {loading ? (
        <Loader rong={"80vh"} />
      ) : (
        <div className="chooseCheckinCard-container">
          <div className="mt-5">
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
                  place.payFee === 0 ? "Miễn phí" : convertToVNDDB(place.payFee)
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
        </div>
      )}
    </>
  );
};

export default ChooseCheckinFollowArea;
