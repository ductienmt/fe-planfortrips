import React, { useEffect, useState } from "react";
import "./ChooseHotel.css";
import ChooseHotelCard from "../accpmodationComponent/ChooseHotelCard";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { useNavigate } from "react-router-dom";
import { HotelService } from "../../../services/apis/HotelService";
import Loader from "../../../client/Components/Loading";

const ChooseHotel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [hotelmData, setHotelmData] = useState([]);

  const fetchHotelData = async () => {
    setIsLoading(true);
    try {
      const response = await HotelService.detail();
      setHotelmData(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching hotel data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Chọn khách sạn";
    fetchHotelData();
  }, []);

  const handleClick = (hotelId) => {
    navigate(`/enterprise/accomodation/room-management?id=${hotelId}`);
  };
  return (
    <>
      {isLoading ? (
        <div className="w-100">
          <Loader rong={"80vh"} />
        </div>
      ) : (
        <>
          <div className="enterprise-chooseHotel-container">
            <div className="chooseHotel-title">
              <h1
                style={{
                  fontSize: "30px",
                  textTransform: "uppercase",
                  color: "#ADADAD",
                }}
              >
                Chọn khách sạn
              </h1>
            </div>
            <div className="chooseHotel-content mt-3">
              <div className="nav-filterCombobox-chooseHotel">
                <InputFlied
                  nameInput={"search"}
                  content={"Tìm kiếm"}
                  typeInput={"text"}
                  dai={"31%"}
                />
              </div>
            </div>
            <div className="chooseHotel-selection">
              {/* <div className="chooseHotel-container"> */}
              {hotelmData.map((hotel) => (
                <div key={hotel.hotel_id} className="chooseHotel-container">
                  <ChooseHotelCard {...hotel} />
                  <button
                    className="select-chooseHotel-btn"
                    onClick={() => {
                      handleClick(hotel.hotel_id);
                    }}
                  >
                    Chọn ngay
                  </button>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </>
      )}
    </>
  );
};
export default ChooseHotel;
