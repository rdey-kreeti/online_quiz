import React from 'react';

import './index.scss';

const RadioInput = ({label, value, checked, onChange, answerId}) => {
  return (
    <label className="radio">
      <input type="radio" className="radio__input" name={value} value={value} checked={checked} onChange={() => onChange(answerId)} />
      {label}
    </label>
  )
}

export default RadioInput;