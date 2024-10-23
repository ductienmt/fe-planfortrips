import React from 'react';
import styled from 'styled-components';

const SearchHeader = () => {
    return (
        <Header>
            <StepIndicator>
                <Step active>
                    <StepNumber>1</StepNumber>
                    <StepText>Tìm chuyến xe</StepText>
                </Step>
                <Step>
                    <StepNumber active>2</StepNumber>
                    <StepText>Đặt vé</StepText>
                </Step>
                <Step>
                    <StepNumber>3</StepNumber>
                    <StepText>Thanh toán</StepText>
                </Step>
            </StepIndicator>
            <SearchForm>
                <SearchTitle>Tìm chuyến xe</SearchTitle>
                <SearchInput type="text" aria-label="Search for bus trips" />
                <DateSelector>
                    <CalendarIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c867c42fe24197eef544d52ae26d49c3e03445349e4162e847b7c3161c4ced6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                    <DateInfo>
                        <DateLabel>Ngày khởi hành</DateLabel>
                        <SelectedDate>Chủ nhật, 06/10/2024</SelectedDate>
                    </DateInfo>
                    <DropdownIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1eded7f31cf4b0fb55e733688f63cdce7874e6eb3929c130db792b451a914715?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                </DateSelector>
                <SearchButton>Tìm kiếm</SearchButton>
            </SearchForm>
        </Header>
    );
};

const Header = styled.header`
  width: 100%;
  max-width: 964px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #afafaf;
  font: 700 23px/30px Roboto, sans-serif;
`;

const StepNumber = styled.div`
  background-color: ${props => props.active ? '#0078d7' : '#d9d9d9'};
  color: ${props => props.active ? '#fff' : 'inherit'};
  border-radius: 50%;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepText = styled.div`
  margin-top: 13px;
`;

const SearchForm = styled.form`
  border-radius: 20px;
  background-color: #f4f7fa;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 22px 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 991px) {
    padding: 22px 20px;
  }
`;

const SearchTitle = styled.h2`
  color: #005293;
  font-size: 23px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 8px;
`;

const SearchInput = styled.input`
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 56px;
  border: 2px solid #e2e7eb;
  margin-bottom: 8px;
`;

const DateSelector = styled.div`
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 15px;
  border: 2px solid #e2e7eb;
`;

const CalendarIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 18px;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const DateLabel = styled.span`
  color: #27648c;
  font-size: 12px;
`;

const SelectedDate = styled.span`
  color: #1e252b;
  font-size: 14px;
  font-weight: 700;
`;

const DropdownIcon = styled.img`
  width: 34px;
  height: 19px;
`;

const SearchButton = styled.button`
  border-radius: 8px;
  background-color: #41a5e8;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  padding: 19px;
  width: 100%;
  border: none;
  margin-top: 19px;
  cursor: pointer;
`;

export default SearchHeader;