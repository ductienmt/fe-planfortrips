import React from 'react';
import './ResultsSummary.css';

const DetailedResultsSummaryContainer = () => {
    return (
        <section className="detailed-results-summary-container">
            <h2 className="detailed-results-summary-container-results-count">
                Tìm thấy 73 nơi ở thích hợp
            </h2>
            <div className="detailed-results-summary-container-sort-options-wrapper">
                <span className="detailed-results-summary-container-sort-label">
                    Sắp xếp:
                </span>
                <button className="detailed-results-summary-container-sort-button">
                    Giá
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f6f4fcc991ff53b18dde357ea304656aeb01059bfa4368cd1b06c01d101b4f4?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                        alt=""
                        className="detailed-results-summary-container-sort-icon"
                    />
                </button>
                <button className="detailed-results-summary-container-sort-button">
                    Xếp hạng
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/91a32ac6b072cbeba85ed6fcb6b2524feb36d3e59c0eac9784be552789e1311b?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                        alt=""
                        className="detailed-results-summary-container-sort-icon"
                    />
                </button>
                <button className="detailed-results-summary-container-hot-deals-button">
                    Hot Deals!
                </button>
            </div>
        </section>
    );
};

export default DetailedResultsSummaryContainer;
