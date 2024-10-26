import React, { useEffect, useState } from "react";
import SearchBar from "./HotelComponent/SearchBar";
import HotDealsNotification from "./HotelComponent/HotDealsNotification";
import ResultsSummary from "./HotelComponent/ResultsSummary";
import AccommodationCard from "./HotelComponent/AccommodationCard";
import SearchResults from "./HotelComponent/SearchResults";
import { HotelService } from "../../../../services/apis/HotelService";
import { CircularProgress } from "@mui/material";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const hotelList = await HotelService.getHotels(page, limit, keyword);
        setHotels(hotelList.hotelResponseList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    };

    fetchProduct();
  }, [limit, page, keyword]);
  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </React.Fragment>
    );
  }
  return (
    <main>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <section>
        <SearchResults />
        <HotDealsNotification />
        <ResultsSummary />
        {isLoading ? (
          <GradientCircularProgress />
        ) : (
          hotels.map((hotel) => (
            <AccommodationCard key={hotel.hotel_id} {...hotel} />
          ))
        )}
      </section>
    </main>
  );
};
export default Hotel;
