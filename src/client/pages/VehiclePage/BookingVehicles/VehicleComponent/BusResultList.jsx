import React, { useEffect, useState } from 'react';
import './BusResultList.css';
import BusResultItem from './BusResultItem.jsx';
import { ScheduleService } from '../../../../../services/apis/ScheduleService.js'

const busResults = [
    { id: 1, departureTime: '02:00', arrivalTime: '05:00', company: 'Phương Trang', rating: 5, type: 'Limousine', price: '140.000đ', seatsAvailable: 10 },
    { id: 2, departureTime: '03:00', arrivalTime: '06:00', company: 'Phương Trang', rating: 5, type: 'Limousine', price: '140.000đ', seatsAvailable: 10 },
    { id: 3, departureTime: '04:00', arrivalTime: '07:00', company: 'Phương Trang', rating: 5, type: 'Limousine', price: '140.000đ', seatsAvailable: 10 },
    { id: 4, departureTime: '05:00', arrivalTime: '08:00', company: 'Phương Trang', rating: 5, type: 'Limousine', price: '140.000đ', seatsAvailable: 10 },
    { id: 5, departureTime: '06:00', arrivalTime: '09:00', company: 'Phương Trang', rating: 5, type: 'Limousine', price: '140.000đ', seatsAvailable: 10 },
];

const BusResultList = () => {

    return (
        <section className="result-list-wrapper">
            {busResults.map(result => (
                <BusResultItem key={result.id} {...result} />
            ))}
        </section>
    );
};

export default BusResultList;
