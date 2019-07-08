import React, {Component} from 'react';
import {connect} from 'react-redux';
import questionsData from '../../fixtures/questions';

const mapStateToProps = (state) => {
  return {
    candidateAnswers: state.candidateAnswers,
    isFinish: state.isFinish
  }
}

class Score extends Component {
  componentDidMount = () => {
    const {isFinish} = this.props;

    if (isFinish === null) {
      this.props.history.push('/');
    } else if (isFinish === false) {
      this.props.history.push('/questions');
    }
  }

  calculateScore = () => {
    const candidateAnswers = this.props.candidateAnswers;
    let score = 0;

    candidateAnswers.forEach((answer) => {
      const getAnsweredQuestion = questionsData.find((question) => question.id === answer.questionId);
      if (getAnsweredQuestion.correctAnswerId === answer.answerId) {
        score += 1;
      }
    });
    return score;
  }

  render() {
    return (
      <span className="score">You've scored: <span className="score__result">{this.calculateScore()}</span></span>
    )
  }
}

export default connect (mapStateToProps, null) (Score);