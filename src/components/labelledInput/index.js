import React from 'react';
import './index.scss';

const LabelledInput = ({label, type, placeholder, name, value, onChange, error}) => {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input type={type} placeholder={placeholder} name={name} value={value} className="input-group__input" onChange={onChange} />
      {error && <span>{error}</span>}
    </div>
  )
}

export default LabelledInput;