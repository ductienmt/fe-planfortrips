import React from 'react';
import './SeatSelector.css';
import SeatGrid from './SeatGrid ';

const SeatSelector = () => {
    const floors = [
        { number: 1, label: 'Tầng 1' },
        { number: 2, label: 'Tầng 2' }
    ];

    return (
        <section className="seat-selector-wrapper-container">
            {floors.map((floor, index) => (
                <div className="floor-section-number-floor" key={index}>
                    <SeatGrid
                        floorNumber={floor.number}
                        floorLabel={floor.label}
                    />
                </div>
            ))}
        </section>
    );
};

export default SeatSelector;
