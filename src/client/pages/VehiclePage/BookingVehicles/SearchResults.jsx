import React from 'react';
import './SearchResults.css';
import SearchHeader from './VehicleComponent/SearchHeader.jsx';
import SearchFilters from './VehicleComponent/SearchFilters.jsx';
import BusResultList from './VehicleComponent/BusResultList.jsx';

const SearchResults = () => {
  return (
    <main className="search-results-wrapper">
      <SearchHeader />
      <div className="main-content">
        <SearchFilters />
        <BusResultList />
      </div>
    </main>
  );
};

export default SearchResults;
