import React from 'react';
import styled from 'styled-components';

const BusResultItem = ({ departureTime, arrivalTime, company, rating, type, price, seatsAvailable }) => {
    return (
        <ResultItemWrapper>
            <TripInfo>
                <TimeInfo>
                    <Time>{departureTime}</Time>
                    <CompanyInfo>
                        <CompanyName>{company}</CompanyName>
                        <Rating>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/553e61dab1ec31151d3614ab8efe14048e78bfc442ef4565cac30a2070f6a545?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                            <span>{rating}/5</span>
                        </Rating>
                    </CompanyInfo>
                    <BusType>{type}</BusType>
                    <VoucherTag>voucher +</VoucherTag>
                </TimeInfo>
                <TripDuration>
                    <span>3h00</span>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e55fc9dea6e0586cf19f168698bbe1f4f55cfe653517a2fc0aaa9d9454357e5?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                    <span>144km</span>
                </TripDuration>
                <Time>{arrivalTime}</Time>
            </TripInfo>
            <BookingInfo>
                <PriceInfo>
                    <Price>{price}</Price>
                    <SeatsAvailable>Còn {seatsAvailable} chỗ</SeatsAvailable>
                    <SelectSeat tabIndex="0" role="button" aria-label="Select seat" />
                </PriceInfo>
                <BookButton>Đặt vé ngay</BookButton>
            </BookingInfo>
        </ResultItemWrapper>
    );
};

const ResultItemWrapper = styled.article`
  border-radius: 30px;
  background-color: #fffdfd;
  display: flex;
  justify-content: space-between;
  padding: 22px 21px 22px 52px;
  border: 1px solid #cecece;
  @media (max-width: 991px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const TripInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: Roboto, sans-serif;
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Time = styled.span`
  color: #000;
  font-size: 23px;
  font-weight: 700;
  line-height: 30px;
`;

const CompanyInfo = styled.div`
  display: flex;
  gap: 17px;
  margin-top: 10px;
`;

const CompanyName = styled.span`
  color: #1e252b;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #474747;
`;

const BusType = styled.span`
  color: #595959;
  font-size: 12px;
  line-height: 18px;
`;

const VoucherTag = styled.span`
  border-radius: 100px;
  background-color: rgba(255, 102, 19, 0.21);
  color: #ff6613;
  font-size: 12px;
  padding: 4px 15px;
  border: 1px solid #ff6613;
  margin-top: 5px;
`;

const TripDuration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #595959;
  width: 74px;
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Price = styled.span`
  color: #ff3b00;
  font-size: 23px;
  font-weight: 700;
  line-height: 30px;
`;

const SeatsAvailable = styled.span`
  color: #474747;
  font-size: 12px;
  line-height: 18px;
`;

const SelectSeat = styled.div`
  background-color: #fffbfb;
  border-radius: 50%;
  width: 29px;
  height: 29px;
  border: 2px solid #757575;
  margin-top: 10px;
  cursor: pointer;
`;

const BookButton = styled.button`
  border-radius: 10px;
  background-color: #0976cf;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  padding: 16px 41px;
  border: none;
  margin-top: 22px;
  cursor: pointer;
`;

export default BusResultItem;