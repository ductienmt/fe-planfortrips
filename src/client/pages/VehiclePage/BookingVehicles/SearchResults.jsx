import React from 'react';
import styled from 'styled-components';
import SearchHeader from './SearchHeader.jsx';
import SearchFilters from './SearchFilters.jsx';
import BusResultList from './BusResultList';

const SearchResults = () => {
    return (
        <SearchResultsWrapper>
            <SearchHeader />
            <MainContent>
                <SearchFilters />
                <BusResultList />
            </MainContent>
        </SearchResultsWrapper>
    );
};

const SearchResultsWrapper = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  padding: 25px 80px 335px;
  @media (max-width: 991px) {
    padding: 0 20px 100px;
  }
`;

const MainContent = styled.div`
  border-radius: 20px;
  background-color: #efefee;
  align-self: stretch;
  padding: 87px 29px 49px;
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

export default SearchResults;