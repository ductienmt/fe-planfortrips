import React from 'react';
import styles from './AccommodationCard.module.css';

const AccommodationCard = ({ image, name, address, amenities, rating, reviews, originalPrice, discountedPrice }) => {
    return (
        <article className={styles.accommodationCard}>
            <div className={styles.chillriendcard}>
                <img src={image} alt={name} className={styles.accommodationImage} />
                <div className={styles.accommodationDetails}>
                    <h3 className={styles.accommodationName}>{name}</h3>
                    <p className={styles.accommodationAddress}>{address}</p>
                    <h4 className={styles.amenitiesHeading}>Tiện nghi</h4>
                    <ul className={styles.amenitiesList}>
                        {amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                    <center>
                        <div className={styles.dividerIcon}></div>
                    </center>
                    {/* <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0569f9bb0bf09d949f1efffc99034bdd173b7db59325b1fa4ffad7d54434a363?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.dividerIcon} /> */}
                    <div className={styles.ratingSection}>
                        <h4 className={styles.ratingHeading}>Đánh giá</h4>
                        <div className={styles.ratingStars}>
                            {[...Array(rating)].map((_, i) => (
                                <img key={i} src={`http://b.io/ext_${14 + i}-`} alt="" className={styles.starIcon} />
                            ))}
                        </div>
                        <span className={styles.reviewCount}>( {reviews} )</span>
                    </div>
                    <div className={styles.partnershipBadge}>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/10bffa496ab9762efa950ac78c9a0dcb74f09c1ae79301bf2f72e7fd08c918f6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.partnershipIcon} />
                        <span className={styles.partnershipText}>Quan hệ đối tác</span>
                    </div>
                    <div className={styles.priceSection}>
                        <div className={styles.originalPrice}>
                            <span className={styles.priceLabel}>Giá gốc</span>
                            <span className={styles.priceValue}>{originalPrice.toLocaleString()}</span>
                            <span className={styles.currencySymbol}>đ</span>
                        </div>
                        <div className={styles.discountedPrice}>
                            <span className={styles.priceLabel}>( Đã bao gồm thuế, phí )</span>
                            <span className={styles.priceValue}>{discountedPrice.toLocaleString()}</span>
                            <span className={styles.currencySymbol}>đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default AccommodationCard;