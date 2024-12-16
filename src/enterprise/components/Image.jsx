import React from "react";
import styled from "styled-components";

const ImageEnterprise = ({ tagertModal, toogleModal, onClick }) => {
  return (
    <StyledWrapper>
      <button
        {...(onClick && { onClick })}
        {...(tagertModal && { "data-bs-target": tagertModal })}
        {...(toogleModal && { "data-bs-toggle": toogleModal })}
        className="btn"
      >
        <div className="loader" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 20px; /* Giảm kích thước loader */
    height: 20px;
    position: relative;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  .loader:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 12.5px; /* Cân chỉnh tỉ lệ với kích thước mới */
    height: 12.5px;
    transform: rotate(45deg) translate(30%, 40%);
    background: #ff9371;
    box-shadow: 10px -10.5px 0 2px #ff3d00; /* Điều chỉnh box-shadow */
    animation: slide 2s infinite ease-in-out alternate;
  }

  .loader:after {
    content: "";
    position: absolute;
    left: 3px; /* Cân chỉnh vị trí */
    top: 3px;
    width: 5px; /* Giảm kích thước */
    height: 5px;
    border-radius: 50%;
    background: #ff3d00;
    transform: rotate(0deg);
    transform-origin: 11px 45px; /* Điều chỉnh để phù hợp với kích thước */
    animation: rotate 2s infinite ease-in-out;
  }

  @keyframes slide {
    0%,
    100% {
      bottom: -11px; /* Cân chỉnh bottom */
    }

    25%,
    75% {
      bottom: -1px;
    }

    20%,
    80% {
      bottom: 1px;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-15deg);
    }

    25%,
    75% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(25deg);
    }
  }
`;
export default ImageEnterprise;
