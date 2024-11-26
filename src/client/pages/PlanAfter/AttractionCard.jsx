import React, { useEffect, useState, useMemo } from "react";
import "./AttractionCard.css";
import { CheckinService } from "../../../services/apis/CheckinService";
import { convertToVND } from "../../../utils/FormatMoney";

function AttractionCard({ className, onClick, onNext, onBack, checkin }) {
  const [attractions, setAttractions] = useState(checkin || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < attractions.length - 1 ? prevIndex + 1 : 0
    );
    onNext();
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : attractions.length - 1
    );
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

            if (imagesResponse?.data?.length > 0) {
              const randomImage =
                imagesResponse.data[
                  Math.floor(Math.random() * imagesResponse.data.length)
                ];
              return { ...place, images: randomImage.url };
            }
          }
          return place;
        })
      );
      // console.log(updatedAttractions);

      setAttractions(updatedAttractions);
    };

    fetchImages();
  }, [checkin]);

  const memoizedAttractions = useMemo(() => attractions, [attractions]);

  return (
    <article className={`attraction-card ${className}`} onClick={onClick}>
      <img
        src={
          memoizedAttractions[currentIndex].images ||
          "https://www.vietfuntravel.com.vn/image/data/dia-diem-vung-tau/diem-du-lich-vung-tau/check-in-top-37-dia-diem-du-lich-o-vung-tau-dep-khong-goc-chet-h26.jpg"
        }
        alt={memoizedAttractions[currentIndex].name}
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
          <h3 className="attraction-name">
            {memoizedAttractions[currentIndex].name}
          </h3>
          <p className="attraction-entry">
            Vé vào cổng:{" "}
            {memoizedAttractions[currentIndex].payFee === 0
              ? "Miễn phí"
              : convertToVND(memoizedAttractions[currentIndex].payFee)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default AttractionCard;
