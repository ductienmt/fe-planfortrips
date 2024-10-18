import React from 'react';
function BookingHotelImageGallery() {
    const images = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/35d92df6b07a6a369ade086ef9820c35bec3a464cec39143fc81a1d1f6914398?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Main hotel image" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fa278b67ef2d193646f683ded174eef58cc12851c8c00a4f1cc0f5bf65571c6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d3c433d0e8e25678c8b2b35550c4ea183c4af472b0acd04d8f1eb739ec6bc0?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 3" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/66052836c7ec3511a746f89e4abe47d173be48fd670f572751c8fdacf47ae7d8?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 4" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/891226459cde497f495cba29d2b4272b902c25e62018ff546d155d05d03f6fa9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 5" }
    ];

    return (
        <section className="image-gallery">
            <div className="main-image">
                <img src={images[0].src} alt={images[0].alt} className="gallery-img" />
            </div>
            <div className="secondary-images">
                {images.slice(1).map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt} className="gallery-img" />
                ))}
            </div>
            <style jsx>{`
        .image-gallery {
          display: flex;
          gap: 20px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }
        .main-image {
          flex: 0 0 35%;
        }
        .secondary-images {
          flex: 0 0 65%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 991px) {
          .image-gallery {
            flex-direction: column;
          }
          .main-image, .secondary-images {
            flex: 1;
          }
        }
      `}</style>
        </section>
    );
}

export default BookingHotelImageGallery;
