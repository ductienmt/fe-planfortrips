import React from 'react';
import styles from './ResultsSummary.module.css';

const ResultsSummary = () => {
    return (
        <section className={styles.resultsSummary}>
            <h2 className={styles.resultsCount}>Tìm thấy 73 nơi ở thích hợp</h2>
            <div className={styles.sortOptions}>
                <span className={styles.sortLabel}>Sắp xếp:</span>
                <button className={styles.sortButton}>
                    Giá
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f6f4fcc991ff53b18dde357ea304656aeb01059bfa4368cd1b06c01d101b4f4?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.sortIcon} />
                </button>
                <button className={styles.sortButton}>
                    Xếp hạng
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/91a32ac6b072cbeba85ed6fcb6b2524feb36d3e59c0eac9784be552789e1311b?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className={styles.sortIcon} />
                </button>
                <button className={styles.hotDealsButton}>Hot Deals!</button>
            </div>
        </section>
    );
};
export default ResultsSummary;