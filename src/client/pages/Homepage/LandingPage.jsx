import React, { useEffect, useState } from "react";
import logo from "../../../assets/beach.jpg";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
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
import { CityService } from "../../../services/apis/CityService";
import Loader from "../../Components/Loading";
import { TourService } from "../../../services/apis/TourService";

const LandingPage = () => {
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tourData, setTourData] = useState([]);

  const loadCityData = async () => {
    try {
      setLoading(true);
      const response = await CityService.getPopularCity();
      setCityData(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTourData = async () => {
    try {
      setLoading(true);
      const response = await TourService.getTopTour();
      // console.log("tourData", response);
      setTourData(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Trang chủ";
    window.scrollTo(0, 0);
    loadCityData();
    loadTourData();
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
                Bạn có hào hứng khi khám phá Việt Nam cùng chúng tôi chứ ? Chúng
                tôi sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất khi
                đồng hành cùng bạn trên hành trình khám phá Việt Nam. Plan for
                Trips không chỉ là một website mà sẽ còn phát triển thành ứng
                dụng trên điện thoại để bạn có thể trải nghiệm tốt nhất. Hãy
                cùng trải nghiệm và xây dựng 1 cộng đồng to lớn nhé!
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
              Những nơi tham quan dưới đây là những nơi được du khách nhà Plan
              for Trips đánh giá cao. Bạn có muốn thử trải nghiệm không?
            </p>
            {loading ? (
              <Loader rong={"20vh"} />
            ) : (
              <>
                <section className="checkin-card-container">
                  {cityData.map((city) => (
                    <CheckinCard
                      key={city.city_id}
                      img={city.city_image_url}
                      cityName={city.city_name}
                      // checkinName="Đảo Phú Quý"
                      rating="4.5"
                      linkTo={`/check-in/city/${city.city_id}`}
                    />
                  ))}
                </section>
              </>
            )}
            <div className="view-more">
              <button
                className="btn btn-view-more"
                onClick={() => {
                  navigate("/check-in");
                }}
              >
                Xem thêm
              </button>
            </div>
          </section>
          <div className="body">
            <div className="body-content">
              <h1 className="text-center">TOUR ĐẶC SẮC</h1>
              <p className="text-center w-50 mx-auto">
                Bạn nghĩ sao về tour có sẵn nè. Nhà Plan for Trips đã tổng hợp
                các dịch vụ lại thành 1 tour cho bạn rùi nhen. Có đầy đủ các
                tiêu chí nhe!
              </p>
              <div className="content">
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
              <div className="view-more mt-4">
                <button
                  className="btn btn-view-more"
                  onClick={() => {
                    navigate("/tour");
                  }}
                >
                  Xem thêm
                </button>
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
