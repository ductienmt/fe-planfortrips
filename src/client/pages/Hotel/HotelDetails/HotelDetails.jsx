import React from 'react';
import ImageGallery from './ImageGallery';
import HotelInfo from './HotelInfo';
import BookingCard from './BookingCard';
import NearbyPlaces from './NearbyPlaces';
import SimilarHotels from './SimilarHotels';
import "./styles.css"

const HotelDetails = () => {
    return (
        <center>
            <div className="hotel-details">
                <div className="hotel-details-content">
                    <div className="content-wrapper">
                        <ImageGallery />
                        <div className="hotel-info">
                            <div className="hotel-info-grid">
                                <div className="hotel-info-left">
                                    <HotelInfo />
                                </div>
                                <div className="hotel-info-right">
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