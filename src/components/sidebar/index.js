import React from 'react';
import './index.scss';

const Sidebar = ({questions, onClick}) => {
  return (
    <ul className="sidebar">
      {questions.map((question, index) => <li key={index} className={`sidebar__item ${question.status}`} onClick={() => onClick(question.id)}>{index + 1}</li>)}
    </ul>
  )
}

export default Sidebar;