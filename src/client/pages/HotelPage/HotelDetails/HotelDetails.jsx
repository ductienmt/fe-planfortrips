import React, { useEffect, useState } from 'react';
import ImageGallery from './HotelDetailsComponent/ImageGallery';
import HotelInfo from './HotelDetailsComponent/HotelInfo';
import BookingCard from './HotelDetailsComponent/BookingCard';
import NearbyPlaces from './HotelDetailsComponent/NearbyPlaces';
import SimilarHotels from './HotelDetailsComponent/SimilarHotels';
import "./HotelDetails.css"
import { useParams } from 'react-router-dom';
import { RoomService } from '../../../../services/apis/RoomService';

const HotelDetails = () => {
    const {room_id} = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [room,setRoom] = useState({});
    const [hotel,setHotel] = useState({});
    useEffect(() => {
    const findById = async () => {
      try {
        const data = await RoomService.findRoomById(room_id);
        setRoom(data);
        setHotel(data.hotel)
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    };
    findById();
  }, [room_id]);
    
  if(isLoading){
    return "loading"
  }
    return (
        <center>
            <div className="hotel-details-container">
                <div className="hotel-details-main-content">
                    <div className="hotel-details-content-wrapper">
                        <ImageGallery images={room.images}/>
                        <div className="hotel-information-section">
                            <div className="hotel-information-grid">
                                <div className="hotel-information-left">
                                    <HotelInfo hotel={hotel}/>
                                </div>
                                <div className="hotel-information-right">
                                    <BookingCard room={room}/>
                                    <NearbyPlaces hotel={room.hotel}/>
                                </div>
                            </div>
                        </div>
                        <SimilarHotels />
                    </div>
                </div>
            </div>
        </center>
    );
};

export default HotelDetails;
