import React from 'react';
import PropTypes from 'prop-types';
import RadioInput from '../radioInput';
import Button from '../button';

import './index.scss';

const Question = ({currentQuestion, handleOptionSelect, selectedAnswerId, totalQuestions, currentQuestionIndex, handleNextQuestion, handleFinish, handleReset}) => {
  return (
    <section className="question">
      <p className="question__item">{`${currentQuestionIndex + 1}. `}{currentQuestion.question}</p>
      <ul className="question__options">
        {currentQuestion.options.map((opt) =>
          <li className="question__options__item" key={opt.id}>
            <RadioInput
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
      <section className="question__controls">
        {totalQuestions === currentQuestionIndex + 1 ? (
          <Button type="button" text='Finish' onClick={handleFinish} />
        ) : (
          <Button type="button" text='Next' onClick={handleNextQuestion} />
        )
        }
        <Button type="button" text="Reset" onClick={() => handleReset(currentQuestion.id)} outline/>
      </section>
    </section>
  )
}

Question.propTypes = {
  currentQuestion: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      option: PropTypes.string
    })),
    status: PropTypes.string,
    correctAnswerId: PropTypes.number
  }).isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
  selectedAnswerId: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
}

export default Question;