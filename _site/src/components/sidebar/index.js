import React from 'react';
import Question from '../question';

const Sidebar = ({questions, onClick}) => {
  // const numbersArray = Array(questionsCount).fill(0).map((number, index) => index + 1);
  // return (
  //   <ul>
  //     {numbersArray.map((number, index) => <li key={index} onClick={() => onClick(index)}>{number}</li>)}
  //   </ul>
  // )
  return (
    <ul>
      {questions.map((Question, index) => <li key={index} onClick={() => onClick(Question.id)}>{index + 1}</li>)}
    </ul>
  )
}

export default Sidebar;