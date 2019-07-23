import React from 'react';
import Proptypes from 'prop-types';

import './index.scss';

const RadioInput = ({label, value, checked, onChange, answerId}) => {
  return (
    <label className="radio">
      <input type="radio" className="radio__input" name={value} value={value} checked={checked} onChange={() => onChange(answerId)} />
      {label}
    </label>
  )
}

RadioInput.propTypes = {
  label: Proptypes.string,
  value: Proptypes.string,
  checked: Proptypes.bool,
  onChange: Proptypes.func,
  answerId: Proptypes.string
}

export default RadioInput;