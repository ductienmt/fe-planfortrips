import React, { useState } from "react";
import "./AttractionCard.css";
import { CheckinService } from "../../../services/apis/CheckinService";
import { convertToVND } from "../../../utils/FormatMoney";

function AttractionCard({ className, onNext, onBack, onClick }) {
  const images = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/ad64cd8877d82df9d182b44b1c469d495e43884e6e543062377d970ae7cff60b?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6",
    "https://images.pexels.com/photos/25852241/pexels-photo-25852241/free-photo-of-bi-n-b-u-tr-i-hoang-hon-c-nh-bi-n.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/25865286/pexels-photo-25865286/free-photo-of-danh-b-t-ca-bi-n-b-bi-n-cat.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/23973693/pexels-photo-23973693/free-photo-of-bi-n-vung-tau.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/27941529/pexels-photo-27941529/free-photo-of-bi-n-d-ng-b-bi-n-ngay-l.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    onNext(); // Gọi hàm onNext để đảm bảo AttractionCard luôn selected khi nhấn next
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(attractions.length - 1);
    }
    onBack();
  };

  useEffect(() => {
    const fetchImages = async () => {
      const updatedAttractions = await Promise.all(
        attractions.map(async (place) => {
          if (!place.images) {
            const id = place.id;
            const imagesResponse = await CheckinService.getImageById(id);
            console.log(imagesResponse);

            // Kiểm tra dữ liệu có sẵn
            if (
              imagesResponse &&
              imagesResponse.data &&
              imagesResponse.data.length > 0
            ) {
              const randomImage =
                imagesResponse.data[
                  Math.floor(Math.random() * imagesResponse.data.length)
                ];
              console.log(randomImage.url);
              return { ...place, images: randomImage.url };
            }
          }
          return place;
        })
      );

      setAttractions(updatedAttractions);
      // console.log(updatedAttractions);
    };

    fetchImages();
  }, [checkin]);

  return (
    <article className={`attraction-card ${className}`} onClick={onClick}>
      <img
        src={images[currentImageIndex]}
        alt="Attraction view"
        className="attraction-image"
      />
      <div className="attraction-overlay">
        <div className="attraction-icons">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/12b6ba1a837c48c12bc83b00b1c52d56db0e95dd9815fba8b6c1db275e2dbab1?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            alt="Back icon"
            className="btn attraction-icon"
            onClick={handleBack}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d27bfed5107909f87698965125127879a69b78d5d3e8dac809a9ca602b326311?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            alt="Next icon"
            className="btn attraction-icon"
            onClick={handleNext}
          />
        </div>
        <div className="attraction-info">
          <h3 className="attraction-name">Bãi sau Vũng Tàu</h3>
          <p className="attraction-entry">Vé vào cổng: Miễn phí</p>
        </div>
      </div>
    </article>
  );
}

export default AttractionCard;
