import React from "react";
import "./Gallery.css";

const Gallery = ({ image1, image2, image3, image4, image5, image6 }) => {
  return (
    <>
      <div className="gallery">
        <div className="images-1">
          <img src={image1} alt="image1" />
          <img src={image3} alt="image2" />
        </div>
        <div className="images-2">
          <img src={image2} alt="image3" />
        </div>
        <div className="images-3">
          <img src={image4} alt="image4" />
          <img src={image5} alt="image5" />
        </div>
        <div className="images-4">
          <img src={image6} alt="image6" />
        </div>
      </div>
    </>
  );
};

export default Gallery;
