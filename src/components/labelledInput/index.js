import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const LabelledInput = ({label, type, placeholder, name, value, onChange, error, max}) => {
  return (
    <div className="input-group">
      <section className="input-group__main">
        <label className="input-group__main__label">{label}</label>
        <input type={type} placeholder={placeholder} name={name} value={value} className="input-group__main__input" onChange={onChange} {...(max && {max: max})} />
      </section>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}

LabelledInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  max: PropTypes.string
}

export default LabelledInput;