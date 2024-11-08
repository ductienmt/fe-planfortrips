import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading-container">
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loading-container {
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    width: 50px;
    height: 50px;
    position: relative;
    z-index: 1;
    transform: translateX(-50%);
  }

  .loader::before,
  .loader::after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    mix-blend-mode: multiply;
    animation: rotate92523 2s infinite cubic-bezier(0.77, 0, 0.175, 1);
  }

  .loader::before {
    background-color: #75e2ff;
  }

  .loader::after {
    background-color: #ff8496;
    animation-delay: 1s;
  }

  @keyframes rotate92523 {
    0%,
    100% {
      left: 35px;
    }

    25% {
      transform: scale(0.3);
    }

    50% {
      left: 0%;
    }

    75% {
      transform: scale(1);
    }
  }
`;

export default Loader;