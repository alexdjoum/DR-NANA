import React from 'react';
// import { Button } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, } from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppButton = ({ phoneNumber, message }) => {
  // const handleWhatsAppClick = () => {
  //   const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  //   window.location.href = url;
  // };
  const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a 
      className="btn"
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{backgroundColor: "#25D366", borderRadius: "9px", color: "white"}}
    >
      <FontAwesomeIcon icon={faWhatsapp} /> 
    </a>
  );
};

export default WhatsAppButton;
