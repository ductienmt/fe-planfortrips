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

const Checkinpage = () => {
  const navigate = useNavigate();
  const provinces = [
    { img: phuquoc, provinceName: "Phú Quốc" },
    { img: phuquoc, provinceName: "Hà Nội" },
    { img: phuquoc, provinceName: "Hạ Long" },
    { img: phuquoc, provinceName: "Đà Nẵng" },
    { img: phuquoc, provinceName: "Nha Trang" },
    { img: phuquoc, provinceName: "Huế" },
  ];

  const tourCard = [
    {
      image: phuquoc,
      title: "Tour Đảo Phú Quốc",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. 1",
      location: "Phú Quốc, Kiên Giang",
      people: "2 người",
      nights: "2N/1Đ",
      rating: "4.5",
      price: "5.000.000",
      feedback: "25",
      number: "2",
    },
  ];

  useEffect(() => {
    document.title = "Check-in";
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
      <div className="checkInPage-card-chooseProvince">
        {provinces.map((province, index) => (
          <ChooseProvince
            key={index}
            img={province.img}
            provinceName={province.provinceName}
          />
        ))}
      </div>
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
      <div className="checkInPage-card-chooseTour mt-5 mb-5">
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
    </>
  );
};

export default Checkinpage;
