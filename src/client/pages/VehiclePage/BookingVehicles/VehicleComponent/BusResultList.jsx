import React, { useEffect, useState } from 'react';
import './BusResultList.css';
import BusResultItem from './BusResultItem.jsx';

const BusResultList = ({ busResults }) => {

    return (
        <section className="result-list-wrapper">
            {busResults.map(result => (
                <BusResultItem key={result.id} {...result} />
            ))}
        </section>
    );
};

export default BusResultList;
