import React from 'react';
import './index.scss';

const Sidebar = ({questions, onClick}) => {
  return (
    <ul className="sidebar">
      {questions.map((Question, index) => <li key={index} className="sidebar__item" onClick={() => onClick(Question.id)}>{index + 1}</li>)}
    </ul>
  )
}

export default Sidebar;