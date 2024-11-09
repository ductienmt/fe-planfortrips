import React, { useState } from 'react';
import './SearchResults.css';
import SearchHeader from './VehicleComponent/SearchHeader.jsx';
import SearchFilters from './VehicleComponent/SearchFilters.jsx';
import BusResultList from './VehicleComponent/BusResultList.jsx';

const SearchResults = () => {
  const [busResults, setBusResults] = useState([]); // State để lưu kết quả tìm kiếm

  const handleSearch = () => {
    const schedules = JSON.parse(localStorage.getItem("schedules")); // Lấy dữ liệu từ localStorage
    if (schedules) {
      setBusResults(schedules); // Cập nhật busResults với dữ liệu mới
    }
  };
  return (
    <main className="search-results-wrapper">
      <SearchHeader onSearch={handleSearch} />
      <div className="main-content">
        <SearchFilters />
        <BusResultList busResults={busResults} />
      </div>
    </main>
  );
};

export default SearchResults;
