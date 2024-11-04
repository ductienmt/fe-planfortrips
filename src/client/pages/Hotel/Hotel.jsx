import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar"; // Nhập component SearchBar
import HotDealsNotification from "./HotDealsNotification"; // Nhập component HotDealsNotification
import ResultsSummary from "./ResultsSummary"; // Nhập component ResultsSummary
import AccommodationCard from "./AccommodationCard"; // Nhập component AccommodationCard
import SearchResults from "./SearchResults";
import "./HotelBooking.css";
import { getHotels } from "../../../services/apis/HotelService";

const Hotel = () => {
  //   const accommodations = [
  //     {
  //       id: 1,
  //       image:
  //         "https://cdn.builder.io/api/v1/image/assets/TEMP/0afa468541fbb0828e6619ab0d2ecf2959503298e98771fc00d8775aded4ce71?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
  //       name: "Khách sạn A",
  //       address: "74 ĐL Trần Hưng Đạo, Bắc Cường, Lào Cai",
  //       amenities: ["Ăn sáng", "Free Wifi", "Gym"],
  //       rating: 4,
  //       reviews: "1k+",
  //       originalPrice: 5900000,
  //       discountedPrice: 2999000,
  //     },
  //     {
  //       id: 2,
  //       image:
  //         "https://cdn.builder.io/api/v1/image/assets/TEMP/d13112004b701393119034284a1f9039f7be95736d582accaf128e58ff864c55?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
  //       name: "Khách sạn B",
  //       address: "086, Đường Thanh Niên, thành phố Lào Cai",
  //       amenities: ["Ăn sáng", "Free Wifi", "Gym"],
  //       rating: 5,
  //       reviews: "1k+",
  //       originalPrice: 3690000,
  //       discountedPrice: 1750000,
  //     },

  // Thêm các đối tượng accommodation khác nếu cần
  //   ];
  const [pagePresent, setPagePresent] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await getHotels(pagePresent, 10);
        setHotels(hotelData.hotelResponseList);
        setTotalPages(hotelData.totalPage);
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
      }
    };
    fetchHotel();
  }, [pagePresent]);
  return (
    <main>
      <SearchBar />

      <section>
        <SearchResults />
        <HotDealsNotification />
        <ResultsSummary />
        {hotels.map((accommodation) => (
          <AccommodationCard key={accommodation.id} {...accommodation} />
        ))}{" "}
        *
      </section>
    </main>
  );
};

export default Hotel;
