import React from 'react';
import "./ImageGallery.css";

const ImageGallery = ({ images }) => {
    const defaultImageUrl = 'https://media.blogto.com/articles/20180607-hotel-pools.jpg?cmd=resize_then_crop&quality=70&w=2048&height=1365';

    const getImageUrl = (index) => {
        return (Array.isArray(images) && images[index] && images[index].url) 
            ? images[index].url 
            : defaultImageUrl;
    };

    return (
        <div className="image-gallery-container">
            <div className="image-gallery-grid">
                <div className="main-image-column-wrapper">
                    <img loading="lazy" src={getImageUrl(0)} className="main-image-style" alt="Main" />
                </div>
                <div className="secondary-images-column-wrapper">
                    <div className="secondary-images-wrapper-container">
                        <div className="secondary-images-top-section">
                            <div className="secondary-image-left-column">
                                <img loading="lazy" src={getImageUrl(1)} className="secondary-image-1-style" alt="Secondary 1" />
                            </div>
                            <div className="secondary-image-right-column">
                                <img loading="lazy" src={getImageUrl(2)} className="secondary-image-2-style" alt="Secondary 2" />
                            </div>
                        </div>
                        <div className="secondary-images-bottom-section">
                            <div className="secondary-images-bottom-grid-container">
                                <div className="secondary-image-bottom-left-column">
                                    <img loading="lazy" src={getImageUrl(3)} className="secondary-image-3-style" alt="Secondary 3" />
                                </div>
                                <div className="secondary-image-bottom-right-column">
                                    <img loading="lazy" src={getImageUrl(4)} className="secondary-image-4-style" alt="Secondary 4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
