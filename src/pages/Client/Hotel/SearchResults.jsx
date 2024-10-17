import React from 'react';
import styles from './SearchResults.module.css';
import SearchBar from './SearchBar';
import HotDealsNotification from './HotDealsNotification';
import ResultsSummary from './ResultsSummary';
import AccommodationCard from './AccommodationCard';
import "./HotelBooking.css"

const SearchResults = () => {
    // const accommodations = [
    //     {
    //         id: 1,
    //         image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0afa468541fbb0828e6619ab0d2ecf2959503298e98771fc00d8775aded4ce71?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
    //         name: "Khách sạn A",
    //         address: "74 ĐL Trần Hưng Đạo, Bắc Cường, Lào Cai",
    //         amenities: ["Ăn sáng", "Free Wifi", "Gym"],
    //         rating: 4,
    //         reviews: "1k+",
    //         originalPrice: 5900000,
    //         discountedPrice: 2999000
    //     },
    //     {
    //         id: 2,
    //         image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d13112004b701393119034284a1f9039f7be95736d582accaf128e58ff864c55?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
    //         name: "Khách sạn B",
    //         address: "086, Đường Thanh Niên, thành phố Lào Cai",
    //         amenities: ["Ăn sáng", "Free Wifi", "Gym"],
    //         rating: 5,
    //         reviews: "1k+",
    //         originalPrice: 3690000,
    //         discountedPrice: 1750000
    //     },
    //     {
    //         id: 3,
    //         image: "https://cdn.builder.io/api/v1/image/assets/TEMP/742ac837896fc0c19bcf6d2996ddf1a2c7e0357f62703393310e03851980dcbb?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
    //         name: "Khách sạn Tùy Anh",
    //         address: "318 An Đ. Vương, Kim Tân, Lào Cai",
    //         amenities: ["Ăn sáng", "Free Wifi", "Gym"],
    //         rating: 4,
    //         reviews: "1k+",
    //         originalPrice: 3700000,
    //         discountedPrice: 1678000
    //     },
    //     {
    //         id: 4,
    //         image: "https://cdn.builder.io/api/v1/image/assets/TEMP/298826ee3a08802ebdcb60ba753f9d857fcb94d6fbb0ee7e7b4c281e1dc7fbe7?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
    //         name: "Resort Bình Minh",
    //         address: "Đường An Đ. Vương, Cốc Lếu, Lào Cai",
    //         amenities: ["Ăn sáng", "Free Wifi", "Gym"],
    //         rating: 3,
    //         reviews: "429",
    //         originalPrice: 4200000,
    //         discountedPrice: 1599000
    //     }
    // ];

    return (
        // <main className={styles.searchResults}>
        //     <SearchBar />
        //     <section className={styles.resultsContainer}>
        //         <aside className={styles.filterSidebar}>
        //             <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/95fed95a5edccb2f3c1d027951da202129c3580f4dbb60f15eb003a1c9c7a2c3?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Price range illustration" className={styles.priceRangeImage} />
        //             <h2 className={styles.sidebarHeading}>Giá</h2>
        //             <div className={styles.priceRange}>
        //                 <span>3,300,000VNĐ</span>
        //                 <div className={styles.priceRangeDot} />
        //             </div>
        //             <div className={styles.priceLimit}>
        //                 <span className={styles.minPrice}>tối thiểu</span>
        //                 <span className={styles.maxPrice}>tối đa</span>
        //             </div>
        //             <h3 className={styles.sidebarSubheading}>Dịch vụ</h3>
        //             <ul className={styles.amenitiesList}>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Ăn sáng</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Giặt ủi</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Ăn tại phòng</li>
        //             </ul>
        //             <h3 className={styles.sidebarSubheading}>Yêu cầu</h3>
        //             <ul className={styles.requirementsList}>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Cho mang pet</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Cho hút thuốc</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Miễn phí hủy phòng</li>
        //             </ul>
        //             <h3 className={styles.sidebarSubheading}>Loại</h3>
        //             <ul className={styles.accommodationTypeList}>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Homestay</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Khách sạn</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Resort</li>
        //                 <li><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a5e1cc796c385065cbf024cf602cbb259f5e08c41769a34530d939bfd835912?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" />Căn hộ</li>
        //             </ul>
        //         </aside>
        //         <div className={styles.resultsContent}>
        //             <HotDealsNotification />
        //             <ResultsSummary />
        //             {accommodations.map(accommodation => (
        //                 <AccommodationCard key={accommodation.id} {...accommodation} />
        //             ))}
        //         </div>
        //     </section>
        //     <nav className={styles.pagination} aria-label="Pagination">
        //         <div className={styles.paginationTrack}>
        //             <div className={styles.paginationThumb} />
        //         </div>
        //     </nav>
        // </main>
        <div className="hotel-booking-filter">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
                width="270"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <h6>Giá</h6>
            <div className="price-range-container">
                <span className="price-value">3.3000</span>
                <input type="range" min="0" max="5000" />
            </div>
            <h6>Dịch vụ</h6>
            <ul style={{ padding: 0, listStyleType: 'none' }}>
                <li>
                    <label>
                        <input type="checkbox" />
                        Ăn sáng
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Giặt ủi
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Đưa đón sân bay
                    </label>
                </li>
            </ul>
            <h6>Yêu cầu</h6>
            <ul style={{ padding: 0, listStyleType: 'none' }}>
                <li>
                    <label>
                        <input type="checkbox" />
                        Cho mang pet
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Không hút thuốc
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Miễn phí hủy phòng
                    </label>
                </li>
            </ul>
            <h6>Loại</h6>
            <ul style={{ padding: 0, listStyleType: 'none' }}>
                <li>
                    <label>
                        <input type="checkbox" />
                        Homestay
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Khách sạn
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Resort
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        Căn hộ
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default SearchResults;