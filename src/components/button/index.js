import React from 'react';
import './index.scss';

const Button = ({type, text, onClick, block, outline}) => {
  const abc = (block, outline) => {
    if (block) {
      return 'button-primary button-block';
    } else if (outline) {
      return 'button-primary button-outline';
    } else if (block && outline) {
      return 'button-primary button-block button-outline';
    } else {
      return 'button-primary';
    }
  }

  return (
    <button type={type} className={abc(block, outline)} onClick={onClick}>{text}</button>
  )
}

export default Button;