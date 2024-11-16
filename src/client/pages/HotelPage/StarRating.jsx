import React from 'react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating); // Số ngôi sao đầy
    const hasHalfStar = rating % 1 !== 0; // Có nửa ngôi sao không?
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Số ngôi sao trống

    return (
        <div style={{ display: 'flex', gap: '2px' }}>
            {/* Hiển thị các ngôi sao đầy */}
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <span key={`full-${index}`} style={{ color: '#ffc107', fontSize: '20px' }}>⭐</span>
                ))}

            {/* Hiển thị nửa ngôi sao nếu có */}
            {hasHalfStar && <span style={{ color: '#ffc107', fontSize: '20px' }}>🌟</span>}

            {/* Hiển thị các ngôi sao trống */}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <span key={`empty-${index}`} style={{ color: '#ddd', fontSize: '20px' }}>☆</span>
                ))}
        </div>
    );
};

export default StarRating;
