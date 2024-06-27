import React from 'react';
// import { Button } from 'antd';

const WhatsAppButton = ({ phoneNumber, message }) => {
  const handleWhatsAppClick = () => {
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  return (
    <button type="primary" onClick={handleWhatsAppClick}>
      Contact on WhatsApp
    </button>
  );
};

export default WhatsAppButton;
