import React from 'react';
import './index.scss';

const Button = ({type, text, onClick}) => {
  return (
    <button type={type} className="button-primary" onClick={onClick}>{text}</button>
  )
}

export default Button;