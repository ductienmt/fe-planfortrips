import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    return (
        <form className={styles.searchBar}>
            <div className={styles.destinationInput}>
                <label htmlFor="destination" className={styles.inputLabel}>Điểm đến</label>
                <input type="text" id="destination" value="Lào Cai" className={styles.inputField} />
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/325743133b68bf84b4542a1afed13849c883d0c5cfa6e1adb88047799b43d7fa?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.inputIcon} />
            </div>
            <div className={styles.dateInput}>
                <div>
                    <label htmlFor="checkIn" className={styles.inputLabel}>Nhận phòng</label>
                    <input type="text" id="checkIn" value="T2, 02 thg12" className={styles.inputField} />
                </div>
                <span className={styles.nightsCount}>10 đêm</span>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c7fde8f6d333855cddf7ca00062c54c87283b282ddb1b1469a73d8faf63e92a?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.calendarIcon} />
                <div>
                    <label htmlFor="checkOut" className={styles.inputLabel}>Trả phòng</label>
                    <input type="text" id="checkOut" value="T5, 12 thg 12" className={styles.inputField} />
                </div>

            </div>
            <div className={styles.guestsInput}>
                <label htmlFor="guests" className={styles.inputLabel}>Phòng và khách</label>
                <input type="text" id="guests" value="1 Phòng, 2 Người Lớn, 0 Trẻ Em" className={styles.inputField} />
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/07221e7643d44a28ab07a01a816c262f116013713628fde37828300b806a309e?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.guestsIcon} />
            </div>
            <button type="submit" className={styles.searchButton}>Tìm kiếm</button>
        </form>
    );
};
export default SearchBar;