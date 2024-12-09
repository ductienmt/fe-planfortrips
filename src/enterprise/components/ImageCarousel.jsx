import React from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// Styled Components
const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledCarouselContainer = styled.div`
  display: flex;
  gap: 10px;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(-${props.translateX}px)`};
  width: ${(props) => `${props.totalWidth}px`};
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
  flex-shrink: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const StyledCheckbox = styled.input`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10;
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;
  gap: 20px;
`;

const IconButton = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
  }
`;

const NoImagesMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 18px;
  color: #888;
`;

const ImageCarousel = ({
  roomImages,
  selectedImages,
  handleCheckboxChange,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < roomImages.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <StyledWrapper>
      {roomImages.length === 0 ? (
        <NoImagesMessage>Phòng hiện tại chưa được thêm ảnh</NoImagesMessage>
      ) : (
        <>
          {/* Carousel Container */}
          <StyledCarouselContainer
            // translateX={(currentIndex / roomImages.length) * 100}
            // $totalWidth={(roomImages.length / itemsPerPage) * 100}
            translateX={currentIndex * (300 + 10)}
            totalWidth={roomImages.length * (300 + 10)}
          >
            {roomImages.map((url, index) => (
              <StyledImageWrapper key={index} itemsPerPage={itemsPerPage}>
                <StyledImage src={url} alt="Room" />
                <StyledCheckbox
                  type="checkbox"
                  checked={selectedImages.includes(url)}
                  onChange={() => handleCheckboxChange(url)}
                />
              </StyledImageWrapper>
            ))}
          </StyledCarouselContainer>

          {/* Navigation Controls */}
          <StyledControls>
            <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= roomImages.length}
            >
              <ChevronRight />
            </IconButton>
          </StyledControls>
        </>
      )}
    </StyledWrapper>
  );
};

export default ImageCarousel;
