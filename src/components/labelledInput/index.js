import React from 'react';
import './index.scss';

const LabelledInput = ({label, type, placeholder, name, value, onChange, error}) => {
  return (
    <div className="input-group">
      <section className="input-group__main">
        <label className="input-group__main__label">{label}</label>
        <input type={type} placeholder={placeholder} name={name} value={value} className="input-group__main__input" onChange={onChange} />
      </section>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}

export default LabelledInput;