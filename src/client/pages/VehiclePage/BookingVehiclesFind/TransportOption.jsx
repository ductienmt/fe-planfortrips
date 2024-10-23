import * as React from "react";
import "./TransportOption.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TrainIcon from "@mui/icons-material/Train";

export function TransportOption({ type, bgColor, label }) {
    const renderIcon = () => {
        switch (type) {
            case "plane":
                return <AirplanemodeActiveIcon className="transport-option-icon" />;
            case "bus":
                return <DirectionsBusIcon className="transport-option-icon" />;
            case "train":
                return <TrainIcon className="transport-option-icon" />;
            default:
                return null;
        }
    };

    return (
        <button className="transport-option-wrapper">
            <div className="transport-option-icon-container" style={{ backgroundColor: bgColor }}>
                {renderIcon()}
            </div>
            <span className="transport-option-label">{label}</span>
        </button>
    );
}
