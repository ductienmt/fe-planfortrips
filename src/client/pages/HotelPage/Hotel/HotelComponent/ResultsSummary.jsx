import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
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
                    <ArrowDropDownIcon className="detailed-results-summary-container-sort-icon" />
                </button>
                <button className="detailed-results-summary-container-sort-button">
                    Xếp hạng
                    <ArrowDropUpIcon className="detailed-results-summary-container-sort-icon" />
                </button>
                <button className="detailed-results-summary-container-hot-deals-button">
                    Hot Deals!
                </button>
            </div>
        </section>
    );
};

export default DetailedResultsSummaryContainer;
