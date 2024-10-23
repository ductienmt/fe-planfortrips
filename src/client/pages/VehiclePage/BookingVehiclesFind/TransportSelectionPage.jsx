import * as React from "react";
import "./TransportSelectionPage.css";
import { TransportOption } from "./TransportOption";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const transportOptions = [
    {
        type: "plane",
        bgColor: "rgba(201, 255, 233, 1)",
        label: "Máy bay",
    },
    {
        type: "bus",
        bgColor: "rgba(198, 230, 255, 1)",
        label: "Xe khách",
    },
    {
        type: "train",
        bgColor: "rgba(255, 225, 175, 1)",
        label: "Tàu hỏa",
    }
];

function TransportSelectionPage() {
    return (
        <main>
            <div className="transport-page-wrapper">
                <header className="transport-header-banner" />
                <section className="transport-selection-card">
                    <div className="transport-location-selector">
                        <LocationOnIcon className="transport-location-icon" />
                        <input
                            type="text"
                            className="transport-location-input"
                            placeholder="Nhập địa điểm..."
                        />
                    </div>
                    <h2 className="transport-section-title">Chọn phương tiện</h2>
                    <div className="transport-options-container">
                        <div className="transport-options-grid">
                            {transportOptions.map((option, index) => (
                                <TransportOption
                                    key={index}
                                    type={option.type}
                                    bgColor={option.bgColor}
                                    label={option.label}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default TransportSelectionPage;
