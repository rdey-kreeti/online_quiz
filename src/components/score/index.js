import React, {Component} from 'react';
import {connect} from 'react-redux';
import questionsData from '../../fixtures/questions';
import Button from '../button';
import {restartQuiz} from '../../js/actions';

const mapStateToProps = (state) => {
  return {
    candidateAnswers: state.candidateAnswers,
    isFinish: state.isFinish
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    restartQuiz: () => dispatch(restartQuiz())
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

  handleRestart = () => {
    this.props.restartQuiz();
    this.props.history.push('/');
  }

  render() {
    const userInfo = JSON.parse(localStorage.getItem('loggedInUser'));

    if (this.props.isFinish) {
      return (
        <React.Fragment>
          <span className="score">
            <span className="score__user-name">Hey, {userInfo.name}</span>
            <span className="score__user-score">You've scored: <span className="score__result">{this.calculateScore()}</span></span>
            <Button type="button" text="Restart" onClick={() => this.handleRestart()}/>
          </span>
        </React.Fragment>
      )
    } else {
      return null;
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Score);