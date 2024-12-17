import React, { useEffect } from 'react';

const ChatbotComponent = () => {
  useEffect(() => {
      (function(d, m){
        var kommunicateSettings = {"appId":"1e8317108668f0aac16f5c96fcf734b42","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});

    return () => {
    };
  }, []); 

  return null; 
};

export default ChatbotComponent;