import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  block: PropTypes.bool,
  outline: PropTypes.bool
}

export default Button;