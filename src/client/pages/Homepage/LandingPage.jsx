import React, { useEffect } from "react";
import logo from "../../../assets/beach.jpg";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import CheckinCard from "./checkinCard/CheckinCard";
import phuquoc from "../../../assets/phuquoc.jpg";
import caurong from "../../../assets/caurong.webp";
import phuquy from "../../../assets/phuquy.jpg";
import TourCard from "./TourCard/TourCard";
import Gallery from "./Gallery/Gallery";
import feedback1 from "../../../assets/feedback1.webp";
import feedback2 from "../../../assets/feedback2.jpg";
import feedback3 from "../../../assets/feedback3.jpg";
import feedback4 from "../../../assets/feedback4.jpg";
import feedback5 from "../../../assets/feedback5.jpg";
import feedback6 from "../../../assets/feedback6.jpeg";

const LandingPage = () => {
  useEffect(() => {
    document.title = "Trang chủ";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="landing-page">
        <div className="header-landing">
          <div className="landing-page-img">
            <img src={logo} alt="" />
          </div>
          <div className="landing-page-content">
            <div className="content">
              <h1>Hành Trình Khám Phá</h1>
              <h1>Việt Nam Cùng Chúng Tôi</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus corporis itaque eos porro atque tenetur nesciunt, et
                nam nihil quam. Voluptate dolores pariatur doloremque minima
                sunt quas. Mollitia, qui sed!
              </p>
            </div>
            <div className="button-landing">
              <a href="#section-landing" className="btn btn-explore">
                Khám phá ngay
              </a>
              <Link to="/plan" className="btn btn-plan">
                Lên kế hoạch
              </Link>
            </div>
          </div>
        </div>
        <div className="body-landing">
          <section className="head" id="section-landing">
            <h4 className="text-center py-3 text-head">
              Plan for Trips đồng hành cùng bạn trên hành trình khám phá Việt
              Nam
            </h4>
            <h1 className="text-center">NHỮNG NƠI THAM QUAN PHỔ BIẾN</h1>
            <p className="text-center w-50 mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores non quibusdam a culpa repellat? Magni ad et
              exercitationem voluptates reiciendis sint cumque non, rem tempora
              temporibus corrupti quidem. Vel, facere.
            </p>
            <section className="checkin-card-container">
              <CheckinCard
                img={phuquy}
                cityName="Bình Thuận"
                checkinName="Đảo Phú Quý"
                rating="4.5"
              />
              <CheckinCard
                img={caurong}
                cityName="Đà Nẵng"
                checkinName="Cầu Rồng"
                rating="4.8"
              />
              <CheckinCard
                img={phuquoc}
                cityName="Kiên Giang"
                checkinName="Đảo Phú Quốc"
                rating="4.7"
              />
            </section>
            <div className="view-more">
              <button className="btn btn-view-more">Xem thêm</button>
            </div>
          </section>
          <div className="body">
            <div className="body-content">
              <h1 className="text-center">TOUR ĐẶC SẮC</h1>
              <p className="text-center w-50 mx-auto">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Deserunt laborum, assumenda accusamus asperiores impedit tempora
                adipisci, modi fugiat magni itaque unde quas aperiam qui porro
                temporibus sequi. Sit, porro id?
              </p>
              <div className="content">
                <TourCard
                  image={phuquoc}
                  title="Tour Đảo Phú Quốc"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  location="Phú Quốc, Kiên Giang"
                  people="2 người"
                  nights="2N/1Đ"
                  rating="4.5"
                  price="1.000.000"
                  feedback="25"
                  number="2"
                  handleClick={() => {}}
                />
                <TourCard
                  image={phuquy}
                  title="Tour Đảo Phú Quý"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  location="Phú Quý, Bình Thuận"
                  people="10 người"
                  nights="7N/6Đ"
                  rating="4.8"
                  price="1.000.000"
                  feedback="25"
                  number="10"
                  handleClick={() => {}}
                />
                <TourCard
                  image={caurong}
                  title="Tour Đà Nẵng"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  location="Đà Nẵng"
                  people="5 người"
                  nights="5N/4Đ"
                  rating="4.9"
                  price="1.000.000"
                  feedback="25"
                  number="5"
                  handleClick={() => {}}
                />
              </div>
              <div className="view-more mt-4">
                <button className="btn btn-view-more">Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-landing">
          <div className="head">
            <h1 className="text-center">HÌNH ẢNH</h1>
            <p className="text-center w-50 mx-auto">
              Hình ảnh được Plan for Trips thu thập từ các feedback từ khách
              hàng
            </p>
          </div>
          <div className="body">
            <Gallery
              image1={feedback1}
              image2={feedback2}
              image3={feedback3}
              image4={feedback4}
              image5={feedback5}
              image6={feedback6}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
