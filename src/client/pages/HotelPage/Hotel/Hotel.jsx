import React, { useEffect, useState } from 'react';
import SearchBar from './HotelComponent/SearchBar'; // Nhập component SearchBar
import HotDealsNotification from './HotelComponent/HotDealsNotification'; // Nhập component HotDealsNotification
import ResultsSummary from './HotelComponent/ResultsSummary'; // Nhập component ResultsSummary
import AccommodationCard from './HotelComponent/AccommodationCard'; // Nhập component AccommodationCard
import SearchResults from './HotelComponent/SearchResults';
import { HotelService } from '../../../../services/apis/HotelService';

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
      }
    };

    fetchProduct();
  }, [limit, page, keyword]);
  // function GradientCircularProgress() {
  //   return (

  //       <main className='Hotel-container-page'>
  //           <SearchBar />
  //           <section>
  //               <SearchResults />
  //               <HotDealsNotification />
  //               <ResultsSummary />
  //               {accommodations.map(accommodation => (
  //                   <AccommodationCard key={accommodation.id} {...accommodation} />
  //               ))} *
  //           </section>



  //       </main>
  //   );
  // }
  return (
    <main>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <section>
        <SearchResults />
        <HotDealsNotification />
        <ResultsSummary />
        {isLoading ? (
          <></>
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
