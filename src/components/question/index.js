import React from 'react';
import RadioInput from '../radioInput';
import Button from '../button';

import './index.scss';

const Question = ({currentQuestion, handleOptionSelect, selectedAnswerId, totalQuestions, currentQuestionIndex, handleNextQuestion, handleFinish}) => {
  return (
    <section className="question">
      <p className="question__item">{`${currentQuestionIndex + 1}. `}{currentQuestion.question}</p>
      <ul className="question__options">
        {currentQuestion.options.map((opt) =>
          <li className="question__options__item">
            <RadioInput
              key={opt.id}
              label={opt.option}
              value={opt.option}
              name={opt.option}
              answerId={opt.id}
              onChange={handleOptionSelect}
              checked={selectedAnswerId === opt.id}
            />
          </li>
        )}
      </ul>
      {totalQuestions === currentQuestionIndex + 1 ? (
        <Button type="button" text='Finish' onClick={handleFinish} />
      ) : (
        <Button type="button" text='Next' onClick={handleNextQuestion} />
      )
      }
    </section>
  )
}

export default Question;