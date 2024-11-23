import React, { useState } from "react";
import "./TourPage.css"; // Đảm bảo bạn đã import file CSS này
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faEarthEurope,
  faStarHalfStroke,
  faTicket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import TourCard from "./TourCard/TourCard";

function TourPage() {
  const [search, setSearch] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const tours = [
    {
      id: 1,
      title: "Khám Phá Hà Nội",
      description: "Khám phá vẻ đẹp thủ đô Hà Nội với những di tích lịch sử và văn hóa nổi tiếng.",
      date: "15 Tháng 10, 2023",
      image: "https://images.pexels.com/photos/50859/pexels-photo-50859.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Hồ Minh Nhựt",
        role: "Hướng dẫn viên du lịch",
        image: "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#HàNội", "#DuLịch", "#VănHóa"]
    },
    {
      id: 2,
      title: "Vịnh Hạ Long - Di Sản Thế Giới",
      description: "Chuyến tham quan Vịnh Hạ Long, nơi sở hữu phong cảnh tuyệt đẹp và những đảo đá vôi kỳ vĩ.",
      date: "10 Tháng 11, 2023",
      image: "https://images.pexels.com/photos/58597/pexels-photo-58597.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Nguyễn Thị Lan",
        role: "Hướng dẫn viên",
        image: "https://images.pexels.com/photos/3766126/pexels-photo-3766126.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#HạLong", "#DiSảnThếGiới", "#VịnhHạLong"]
    },
    {
      id: 3,
      title: "Sapa - Đỉnh Fansipan",
      description: "Chinh phục đỉnh Fansipan, nóc nhà của Đông Dương, và tận hưởng vẻ đẹp thiên nhiên hoang sơ.",
      date: "5 Tháng 12, 2023",
      image: "https://images.pexels.com/photos/28747659/pexels-photo-28747659/free-photo-of-phong-c-nh-nui-non-tuy-t-d-p-lao-cai-vi-t-nam.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Trần Văn Hải",
        role: "Hướng dẫn viên leo núi",
        image: "https://images.pexels.com/photos/1296398/pexels-photo-1296398.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#Sapa", "#Fansipan", "#DuLịchMạoHiểm"]
    },
    {
      id: 4,
      title: "Phong Nha - Kẻ Bàng",
      description: "Tham quan các hang động nổi tiếng trong hệ thống Phong Nha - Kẻ Bàng, nơi được UNESCO công nhận.",
      date: "22 Tháng 1, 2024",
      image: "https://tse3.mm.bing.net/th?id=OIP.lRiZJZ2WH6U9wdSkWItGpAHaE7&pid=Api&P=0&h=180",
      author: {
        name: "Lê Minh Tuấn",
        role: "Chuyên gia thám hiểm",
        image: "https://images.pexels.com/photos/1551742/pexels-photo-1551742.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#PhongNha", "#KẻBàng", "#HangĐộng"]
    },
    {
      id: 5,
      title: "Hội An - Phố Cổ",
      description: "Khám phá Hội An với các công trình kiến trúc cổ kính và không khí yên bình của một thành phố di sản.",
      date: "18 Tháng 2, 2024",
      image: "https://images.pexels.com/photos/92090/pexels-photo-92090.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Nguyễn Thanh Thảo",
        role: "Hướng dẫn viên du lịch",
        image: "https://images.pexels.com/photos/1675476/pexels-photo-1675476.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#HộiAn", "#PhốCổ", "#DiSản"]
    },
    {
      id: 6,
      title: "Đà Lạt - Thành Phố Ngàn Hoa",
      description: "Khám phá Đà Lạt, với khí hậu mát mẻ, những thác nước hùng vĩ và vườn hoa tuyệt đẹp.",
      date: "28 Tháng 3, 2024",
      image: "https://images.pexels.com/photos/2131616/pexels-photo-2131616.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Phan Quang Duy",
        role: "Hướng dẫn viên du lịch",
        image: "https://images.pexels.com/photos/1797396/pexels-photo-1797396.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#ĐàLạt", "#NgànHoa", "#ThiênNhiên"]
    },
    {
      id: 7,
      title: "Cù Lao Chàm",
      description: "Khám phá đảo Cù Lao Chàm với bãi biển hoang sơ và các hoạt động thể thao dưới nước hấp dẫn.",
      date: "9 Tháng 4, 2024",
      image: "https://images.pexels.com/photos/2164513/pexels-photo-2164513.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Lâm Minh Khoa",
        role: "Hướng dẫn viên biển đảo",
        image: "https://images.pexels.com/photos/2131593/pexels-photo-2131593.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#CùLaoChàm", "#DuLịchBiển", "#ThểThaoNước"]
    },
    {
      id: 8,
      title: "Mộc Châu - Cao Nguyên Mùa Hoa",
      description: "Khám phá Mộc Châu với những đồi chè xanh ngắt và các mùa hoa đặc trưng.",
      date: "20 Tháng 5, 2024",
      image: "https://images.pexels.com/photos/4669490/pexels-photo-4669490.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: {
        name: "Mai Thị Lan",
        role: "Hướng dẫn viên nông thôn",
        image: "https://images.pexels.com/photos/1717209/pexels-photo-1717209.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      hashtags: ["#MộcChâu", "#HoaMùa", "#CaoNguyên"]
    }
  ];
  

  const destinations = [
    "Hà Nội",
    "TP. HCM",
    "Đà Nẵng",
    "Bali",
    "Paris",
    "Hàn Quốc",
  ]; // Dữ liệu giả cho điểm đến

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Lọc dữ liệu điểm đến dựa trên input người dùng
    if (value) {
      setFilteredDestinations(
        destinations.filter((destination) =>
          destination.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectDestination = (destination) => {
    setSearch(destination);
    setShowDropdown(false); // Ẩn dropdown sau khi chọn điểm đến
  };

  return (
    <div className="c-tour py-3">
      <div className="c-tour-container">
        {/* Header */}
        <header className="tour-header">
          <div className="tour-header-content">
            <h1>Khám phá thế giới với tour du lịch tuyệt vời</h1>
            <p>Đặt tour ngay hôm nay với giá ưu đãi cực kỳ hấp dẫn!</p>
            <form className="tour-search-form">
              <div className="tour-search-destination">
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="form-control w-100"
                  value={search}
                  onChange={handleSearch}
                />

                {/* Dropdown Search Điểm Đến */}
                {showDropdown && (
                  <div className="tour-search-destination-dropdown">
                    {filteredDestinations.map((destination, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleSelectDestination(destination)}
                      >
                        {destination}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input type="date" />
              <select className="form-select">
                <option value="">Khởi hành từ</option>
              </select>
              <button type="submit" className="btn-search">
                Tìm
              </button>
            </form>
          </div>
        </header>
        {/* Header */}

        <div className="tour-content container">
          {/* Sumary */}
          <div className="tour-content-summary">
            <div className="content-summary-item d-flex">
              <div className="content-summary-item-icon">
                <FontAwesomeIcon icon={faEarthEurope} />
              </div>
              <div className="content-summary-item-content">
                <span className="fs-4 fw-bold">1000+ Tours</span>
                <p className="fs-5 fs-light">Chất lượng trong và ngoài nước</p>
              </div>
            </div>

            <div className="content-summary-item d-flex">
              <div className="content-summary-item-icon">
                <FontAwesomeIcon icon={faStarHalfStroke} />
              </div>
              <div className="content-summary-item-content">
                <span className="fs-4 fw-bold">10k đánh giá 5 sao</span>
                <p className="fs-5 fs-light">Từ những khách hàng đã đặt tour</p>
              </div>
            </div>

            <div className="content-summary-item d-flex">
              <div className="content-summary-item-icon">
                <FontAwesomeIcon icon={faTicket} />
              </div>
              <div className="content-summary-item-content">
                <span className="fs-4 fw-bold">100+ ưu đãi mỗi ngày</span>
                <p className="fs-5 fs-light" style={{ textWrap: "nowrap" }}>
                  Cho khách đặt sớm, theo nhóm, phút chót
                </p>
              </div>
            </div>
          </div>

          {/* Tour có sẵn */}
          <div className="tour-content-data mt-4">
                  <div className="tour-content-title">
                      <h3 className="fw-bold fs-2" style={{fontFamily: 'Italic'}}>#Tour của chúng tôi</h3>
                    </div>  
          <div className="tour-list row gx-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour}/>
      ))}
    </div>
          

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPage;
