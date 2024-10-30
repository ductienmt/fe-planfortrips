import React from 'react';
import HotelDescription from './HotelDescription';
import HotelHighlights from './HotelHighlights';
import HotelAmenities from './HotelAmenities';
import HotelPolicies from './HotelPolicies';
import "./HotelInfo.css"

const HotelInfo = ({hotel}) => {
    return (
        <center>
            <div className="hotel-info-content-container">
                <HotelDescription hotel={hotel}/>
                <HotelHighlights />
                <HotelAmenities />
                <HotelPolicies />
            </div>
        </center>
    );
};

export default HotelInfo;
