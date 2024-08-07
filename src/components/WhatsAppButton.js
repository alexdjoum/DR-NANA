import React from 'react';
// import { Button } from 'antd';

const WhatsAppButton = ({ phoneNumber, message }) => {
  // const handleWhatsAppClick = () => {
  //   const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  //   window.location.href = url;
  // };
  const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      //type="primary" 
      // onClick={handleWhatsAppClick}
    >
      WhatsApp 676892402 
    </a>
  );
};

export default WhatsAppButton;
