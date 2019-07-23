import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Sidebar = ({questions, onClick}) => {
  return (
    <ul className="sidebar">
      {questions.map((question, index) => <li key={index} className={`sidebar__item ${question.status}`} onClick={() => onClick(question.id)}>{index + 1}</li>)}
    </ul>
  )
}

Sidebar.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      option: PropTypes.string
    })),
    status: PropTypes.string,
    correctAnswerId: PropTypes.number
  })),
  onClick: PropTypes.func
}

export default Sidebar;