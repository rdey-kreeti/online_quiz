import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question';
import Sidebar from '../sidebar';
import {updateIsFinish, addCandidateAnswer, resetCandidateAnswer} from '../../js/actions';
import questionsData from '../../fixtures/questions';

import './index.scss';

const mapStateToProps = (state) => {
  return {
    candidateAnswers: state.candidateAnswers,
    isFinish: state.isFinish
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateIsFinish: (val) => dispatch(updateIsFinish(val)),
    updateCandidateAnswer: (val) => dispatch(addCandidateAnswer(val)),
    resetCandidateAnswer: (val) => dispatch(resetCandidateAnswer(val))
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionIndex: 0,
      selectedAnswerId: null
    }
  }

  componentDidMount = () => {
    const candidateAnswers = this.props.candidateAnswers;
    const currentQuestion = this.findQuestion();
    const currentQuestionId = currentQuestion.id;
    const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === currentQuestionId);

    if (previouslyAnsweredObj !== undefined) {
      const getSelectedAnswerId = previouslyAnsweredObj.answerId;
      this.setState({selectedAnswerId: getSelectedAnswerId});
    } else {
      this.setState({selectedAnswerId: null});
    }
  }

  findQuestion = () => {
    return questionsData.find((question, index) => index === this.state.currentQuestionIndex);
  }

  questionToRender = () => {
    const renderableQuestion = this.findQuestion();
    renderableQuestion.status = 'active';
    return renderableQuestion;
  }

  onRadioSelect = (answerId) => {
    this.setState({selectedAnswerId: answerId});
  }

  submitCandidateAnswer = () => {
    const {selectedAnswerId} = this.state;
    let candidateAnswers = this.props.candidateAnswers;
    const currentQuestion = this.findQuestion();
    const currentQuestionId = currentQuestion.id;

    if (selectedAnswerId !== null) {
      const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === currentQuestionId);

      if (previouslyAnsweredObj !== undefined) {
        previouslyAnsweredObj.answerId = selectedAnswerId;
      } else {
        this.props.updateCandidateAnswer({questionId: currentQuestionId, answerId: selectedAnswerId});
      }
    }
  }

  updateQuestionStatus = () => {
    const {selectedAnswerId} = this.state;
    const currentQuestion = this.findQuestion();
    const currentQuestionStatus = currentQuestion.status;

    if (currentQuestionStatus === 'active' && selectedAnswerId === null) {
      currentQuestion.status = 'visited';
    } else {
      currentQuestion.status = 'answered';
    }
  }

  nextQuestion = () => {
    const {currentQuestionIndex} = this.state;

    this.updateQuestionStatus();
    this.submitCandidateAnswer();
    this.setState({currentQuestionIndex: currentQuestionIndex + 1, selectedAnswerId: null });
  }

  handleQuestionRevisit = (clickedItemId) => {
    const candidateAnswers = this.props.candidateAnswers;
    const getClickedQuestionIndex = questionsData.findIndex((question) => question.id === clickedItemId);
    const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === clickedItemId);

    if (previouslyAnsweredObj !== undefined) {
      const getSelectedAnswerId = previouslyAnsweredObj.answerId;
      this.setState({currentQuestionIndex: getClickedQuestionIndex, selectedAnswerId: getSelectedAnswerId});
    } else {
      this.setState({currentQuestionIndex: getClickedQuestionIndex, selectedAnswerId: null});
    }

    this.updateQuestionStatus();
    this.submitCandidateAnswer();
  }

  handleFinish = () => {
    this.props.updateIsFinish(true);
    this.props.history.push('/score');
  }

  handleReset = (questionId) => {
    const candidateAnswers = this.props.candidateAnswers;
    const updateCandidateAnswers = candidateAnswers.filter((answer) => answer.questionId !== questionId);
    this.props.resetCandidateAnswer(updateCandidateAnswers);
    this.setState({ selectedAnswerId: null });
  }

  timer = () => {
    let currentTime = new Date().getTime();
    let deadline = currentTime + 10*60*1000;
    setInterval(() => {
      let timeDifference = deadline - currentTime;

      if (timeDifference >= 0) {
        let mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((timeDifference % (1000 * 60)) / 1000);

        console.log(`${mins}:${secs}`);

      } else {
        console.log("The countdown is over!");
      }
    }, 1000)
  };

  render() {
    const  question = this.questionToRender();

    return (
      <section className="questions-page">
        <Question
          currentQuestion={question}
          handleOptionSelect={this.onRadioSelect}
          selectedAnswerId = {this.state.selectedAnswerId}
          totalQuestions = {questionsData.length}
          currentQuestionIndex={this.state.currentQuestionIndex}
          handleNextQuestion={this.nextQuestion}
          handleFinish={this.handleFinish}
          handleReset = {this.handleReset}
        />
        <Sidebar
          questions={questionsData}
          onClick={this.handleQuestionRevisit}
        />
        {this.timer()}
      </section>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Questions);