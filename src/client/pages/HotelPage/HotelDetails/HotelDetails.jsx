import React from 'react';
import ImageGallery from './HotelDetailsComponent/ImageGallery';
import HotelInfo from './HotelDetailsComponent/HotelInfo';
import BookingCard from './HotelDetailsComponent/BookingCard';
import NearbyPlaces from './HotelDetailsComponent/NearbyPlaces';
import SimilarHotels from './HotelDetailsComponent/SimilarHotels';
import "./HotelDetails.css"

const HotelDetails = () => {
    return (
        <center>
            <div className="hotel-details-container">
                <div className="hotel-details-main-content">
                    <div className="hotel-details-content-wrapper">
                        <ImageGallery />
                        <div className="hotel-information-section">
                            <div className="hotel-information-grid">
                                <div className="hotel-information-left">
                                    <HotelInfo />
                                </div>
                                <div className="hotel-information-right">
                                    <BookingCard />
                                    <NearbyPlaces />
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
