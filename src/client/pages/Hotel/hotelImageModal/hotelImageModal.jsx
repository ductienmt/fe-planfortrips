import React from 'react';
import { Modal, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const HotelImageModal = ({ open, handleClose, hotel }) => {
  const customArrows = {
    prevArrow: (props) => (
      <div 
        {...props} 
        className="custom-carousel-arrow custom-carousel-arrow-prev"
        style={{
          position: 'absolute',
          top: '50%',
          left: '16px',
          zIndex: 2,
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(-50%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
      >
        <LeftOutlined style={{ color: 'black', fontSize: '20px' }} />
      </div>
    ),
    nextArrow: (props) => (
      <div 
        {...props} 
        className="custom-carousel-arrow custom-carousel-arrow-next"
        style={{
          position: 'absolute',
          top: '50%',
          right: '16px',
          zIndex: 2,
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(-50%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
      >
        <RightOutlined style={{ color: 'black', fontSize: '20px' }} />
      </div>
    ),
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width="80%"
      centered
      bodyStyle={{ 
        padding: '16px', 
        maxHeight: '80vh', 
        overflow: 'hidden' 
      }}
      style={{ 
        top: 20,
        // maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <Carousel
        {...customArrows}
        infinite={false}
        className="hotel-image-carousel"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '70vh',
        }}
      >
        {hotel?.images.map((image, index) => (
          <div 
            key={index} 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70vh',
              overflow: 'hidden',
            }}
          >
            <img
              src={image.url}
              alt={`Hotel image ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        ))}
      </Carousel>
    </Modal>
  );
};

export default HotelImageModal;