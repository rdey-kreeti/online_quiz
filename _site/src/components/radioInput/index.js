import React from 'react';

const RadioInput = ({label, value, checked, onChange, answerId}) => {
  return (
    <label>
      <input type="radio" name={value} value={value} checked={checked} onChange={() => onChange(answerId)} />
      {label}
    </label>
  )
}

export default RadioInput;