import React from 'react';
import './HotDealsNotification.css';

const HotDealsNotificationSection = () => {
    return (
        <section className="hot-deals-notification-section-wrapper">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c30e42b7e33b7c56bfb8e4f2946ae7a53c7c664f619f960889547e559d1a93af?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                alt=""
                className="hot-deals-notification-icon"
            />
            <div className="hot-deals-notification-content-wrapper">
                <h2 className="hot-deals-notification-title">Bạn muốn có deals hời?</h2>
                <p className="hot-deals-notification-description">
                    Hãy đảm bảo rằng bạn đang bật thông báo khuyến mãi!
                </p>
            </div>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/37759b6121cf648a8a0833a8496c895eac10517e6a1cea457681af231ea32fb5?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                alt=""
                className="hot-deals-notification-bell-icon"
            />
        </section>
    );
};

export default HotDealsNotificationSection;
