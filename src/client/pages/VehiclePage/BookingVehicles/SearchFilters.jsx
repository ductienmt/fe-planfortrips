import React from 'react';
import styled from 'styled-components';

const SearchFilters = () => {
    return (
        <FiltersWrapper>
            <FilterSection>
                <FilterTitle>Sắp xếp theo</FilterTitle>
                <Divider />
                <FilterOption>
                    <span>Giá tăng dần</span>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cbdce2e7f64184582f22c7ef0924df03f5cb0de1b88fff65c9932d2b8a7f4e7?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                </FilterOption>
                <Divider />
                <FilterOption>
                    <span>Giá giảm dần</span>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/32b1727cb91983da1ee688a0c8b7bf397cb11a3035ec0026f83378f537127c74?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                </FilterOption>
                <Divider />
                <FilterOption>
                    <span>Giờ khởi hành sớm nhất</span>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/32b1727cb91983da1ee688a0c8b7bf397cb11a3035ec0026f83378f537127c74?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                </FilterOption>
                <Divider />
                <FilterOption>
                    <span>Giờ khởi hành muộn nhất</span>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/32b1727cb91983da1ee688a0c8b7bf397cb11a3035ec0026f83378f537127c74?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                </FilterOption>
            </FilterSection>

            <FilterSection>
                <FilterTitle>Bộ lọc</FilterTitle>
                <Divider />
                <FilterSubtitle>Thời gian khởi hành</FilterSubtitle>
                <TimeRangeSelector>
                    <TimeInput>
                        <span>Từ</span>
                        <TimeSelector>
                            <span>00:00</span>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7161a4f7bb76b9167741ac1cee515e02c068edd1359ba3cb2084daea255822b3?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                        </TimeSelector>
                    </TimeInput>
                    <TimeInput>
                        <span>Đến</span>
                        <TimeSelector>
                            <span>23:59</span>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7161a4f7bb76b9167741ac1cee515e02c068edd1359ba3cb2084daea255822b3?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                        </TimeSelector>
                    </TimeInput>
                </TimeRangeSelector>

                <FilterSubtitle>Thời gian khởi hành</FilterSubtitle>
                <PriceRangeSelector>
                    <PriceRange>0đ - 1.000.000đ</PriceRange>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a1fb9dfe3f46a77fd1e37376fb14f0666abc38360f0125c7bf85487eb68314c?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />
                    <PriceLabels>
                        <span>0đ</span>
                        <span>1.000.000đ</span>
                    </PriceLabels>
                </PriceRangeSelector>

                <FilterSubtitle>Đánh giá</FilterSubtitle>
                <RatingOptions>
                    <RatingOption>Tất cả</RatingOption>
                    <RatingOption>4+</RatingOption>
                    <RatingOption>3+</RatingOption>
                    <RatingOption>2+</RatingOption>
                </RatingOptions>
            </FilterSection>
        </FiltersWrapper>
    );
};

const FiltersWrapper = styled.aside`
  border-radius: 30px 0 0 30px;
  background-color: #fffcfc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 35px 34px;
  width: 33%;
  @media (max-width: 991px) {
    width: 100%;
    border-radius: 30px;
    padding: 20px;
  }
`;

const FilterSection = styled.section`
  margin-bottom: 30px;
`;

const FilterTitle = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: 13px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #c5c5c5;
  margin: 10px 0;
`;

const FilterOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #404040;
  font-size: 16px;
  line-height: 24px;
  margin: 10px 0;
`;

const FilterSubtitle = styled.h4`
  color: #000;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  margin: 15px 0 10px;
`;

const TimeRangeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TimeInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 5px;
`;

const PriceRangeSelector = styled.div`
  margin-bottom: 15px;
`;

const PriceRange = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
`;

const PriceLabels = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7a7a7a;
  font-size: 12px;
`;

const RatingOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const RatingOption = styled.div`
  background-color: #ebeaea;
  border-radius: 5px;
  padding: 5px 10px;
  color: #7a7a7a;
  font-size: 12px;
`;

export default SearchFilters;