import React from 'react';
import "./styles.css"

const ImageGallery = () => {
    const images = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/99966d29ce02f5752314f1c3aac6c1f8256d5fdbfec41dfead97e56ce4281c68?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Main hotel image" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fa278b67ef2d193646f683ded174eef58cc12851c8c00a4f1cc0f5bf65571c6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Secondary hotel image 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f7d565a23e13a64c77dfb37c80386eb995ba32ab8c2341c40d7bb2e196ecd321?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Secondary hotel image 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fbcfce5481b129c666c4616a52058e08a3db305a1b37a8f89002b9ef7b3b95d2?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Secondary hotel image 3" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/891226459cde497f495cba29d2b4272b902c25e62018ff546d155d05d03f6fa9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Secondary hotel image 4" },
    ];

    return (
        <div className="image-gallery">
            <div className="gallery-grid">
                <div className="main-image-column">
                    <img loading="lazy" src={images[0].src} alt={images[0].alt} className="main-image" />
                </div>
                <div className="secondary-images-column">
                    <div className="secondary-images-wrapper">
                        <div className="secondary-images-top">
                            <div className="secondary-image-left">
                                <img loading="lazy" src={images[1].src} alt={images[1].alt} className="secondary-image-1" />
                            </div>
                            <div className="secondary-image-right">
                                <img loading="lazy" src={images[2].src} alt={images[2].alt} className="secondary-image-2" />
                            </div>
                        </div>
                        <div className="secondary-images-bottom">
                            <div className="secondary-images-bottom-grid">
                                <div className="secondary-image-bottom-left">
                                    <img loading="lazy" src={images[3].src} alt={images[3].alt} className="secondary-image-3" />
                                </div>
                                <div className="secondary-image-bottom-right">
                                    <img loading="lazy" src={images[4].src} alt={images[4].alt} className="secondary-image-4" />
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