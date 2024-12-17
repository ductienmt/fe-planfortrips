import React, { useEffect } from 'react';

const ChatbotComponent = () => {
  useEffect(() => {
    // Kiểm tra xem Kommunicate đã tồn tại chưa để tránh load nhiều lần
    if (!window.kommunicate) {
      (function(d, m) {
        var kommunicateSettings = {
          appId: "1e8317108668f0aac16f5c96fcf734b42",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
          // Thêm các cài đặt khác nếu cần
        };

        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        
        s.onload = () => {
          // Khởi tạo Kommunicate sau khi script đã load
          window.Kommunicate.init(kommunicateSettings);
        };

        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);

        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }

    // Cleanup function
    return () => {
      // Nếu cần thiết, thêm logic cleanup
    };
  }, []); // Empty dependency array ensures this runs only once

  return null;
};

export default ChatbotComponent;