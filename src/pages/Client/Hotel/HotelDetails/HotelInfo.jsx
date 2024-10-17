import React from 'react';
import HotelDescription from './HotelDescription';
import HotelHighlights from './HotelHighlights';
import HotelAmenities from './HotelAmenities';
import HotelPolicies from './HotelPolicies';
import "./styles.css"


const HotelInfo = () => {
    return (
        <center>
            <div className="hotel-info-content">
                <HotelDescription />
                <HotelHighlights />
                <HotelAmenities />
                <HotelPolicies />

            </div>
        </center>
    );
};

export default HotelInfo;