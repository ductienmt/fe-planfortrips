import React, { useEffect } from 'react';

const MessengerChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    script.async = true;
    script.onload = () => {
      window.FB.init({
        xfbml: true,
        version: 'v17.0',
      });
    };
    document.body.appendChild(script);

    const fbRoot = document.createElement('div');
    fbRoot.id = 'fb-root';
    document.body.prepend(fbRoot);

    const fbChat = document.createElement('div');
    fbChat.className = 'fb-customerchat';
    fbChat.setAttribute('attribution', 'setup_tool');
    fbChat.setAttribute('page_id', '370677252791790');
    fbChat.setAttribute('theme_color', '#0084ff');
    fbChat.setAttribute('logged_in_greeting', 'Hi! How can we help you?');
    fbChat.setAttribute('logged_out_greeting', 'Hi! Please log in to chat with us.');
    document.body.appendChild(fbChat);
  }, []);

  return null; // Không cần render gì
};

export default MessengerChat;
