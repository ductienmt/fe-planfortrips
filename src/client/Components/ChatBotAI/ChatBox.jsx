import React, { useEffect } from 'react';
import { HotelService } from '../../../services/apis/HotelService';
import { RoomService } from '../../../services/apis/RoomService';

const ChatbotComponent = () => {
  const handleIncomingMessage = async (message) => {
    try {
      const userMessage = message.message;

      if (userMessage.includes('khách sạn')) {
        const response = await HotelService.getHotels(0,20,"");
        return formatHotelResponse(response);
      }

      if (userMessage.includes('phòng')) {
        const response = await RoomService.getRooms(0,20,"");
        return formatRoomResponse(response);
      }

      return "Tôi chưa hiểu rõ yêu cầu của bạn. Bạn có thể nhập lại chi tiết hơn không?";
    } catch (error) {
      console.error('Lỗi khi truy vấn API:', error);
      return "Rất tiếc, đã xảy ra lỗi khi tìm kiếm thông tin.";
    }
  };
  const formatHotelResponse = (hotels) => {
    return hotels.map(hotel => 
      `Khách sạn: ${hotel.name}
       Địa chỉ: ${hotel.address}
       Số sao: ${hotel.rating}
       `
    ).join('\n\n');
    // Giá: ${hotel.price} VND
  };
  const formatRoomResponse = (rooms) => {
    return rooms.map(room => 
      `Loại phòng: ${room.typeOfRoom}
       Giá: ${room.price} VND
       `
      //  Số lượng: ${room.availability} phòng còn trống
    ).join('\n\n');
  };
  useEffect(() => {
    window.kommunicateSettings = {
      appId: "1e8317108668f0aac16f5c96fcf734b42",
      language: "vi",
      onMessageReceived: function(message) {
        handleIncomingMessage(message).then(response => {
          window.Kommunicate.sendMessage({
            conversationId: message.conversationId,
            message: response
          });
        });
      }
    };

    (function(d, m){
      var kommunicateSettings = window.kommunicateSettings;
      var s = document.createElement("script");
      s.type = "text/javascript"; 
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; 
      h.appendChild(s);
      window.kommunicate = m; 
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);


  return null;
};

export default ChatbotComponent;

