import React from 'react';
import RadioInput from '../radioInput';
import Button from '../button';

const Question = ({currentQuestion, handleOptionSelect, selectedAnswerId, totalQuestions, currentQuestionIndex, handleNextQuestion}) => {
  return (
    <React.Fragment>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((opt) =>
          <RadioInput
            key={opt.id}
            label={opt.option}
            value={opt.option}
            name={opt.option}
            answerId={opt.id}
            onChange={handleOptionSelect}
            checked={selectedAnswerId === opt.id}
          />
        )}
      </ul>
      {totalQuestions === currentQuestionIndex + 1 ? (
        <Button type="button" text='Finish' onClick={handleNextQuestion} />
      ) : (
        <Button type="button" text='Next' onClick={handleNextQuestion} />
      )
      }
    </React.Fragment>
  )
}

export default Question;