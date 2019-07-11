import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question';
import Sidebar from '../sidebar';
import {questionToRender, nextQuestion, updateQuestionStatus, updateCurrentQuestionStatus, updateIsFinish, addCandidateAnswer, resetCandidateAnswer} from '../../js/actions';

import './index.scss';

const mapStateToProps = (state) => {
  return {
    candidateAnswers: state.candidateAnswers,
    isFinish: state.isFinish,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionToRender: (val) => dispatch(questionToRender(val)),
    nextQuestion: (val) => dispatch(nextQuestion(val)),
    updateQuestionStatus: (val) => dispatch(updateQuestionStatus(val)),
    updateCurrentQuestionStatus: () => dispatch(updateCurrentQuestionStatus()),
    updateIsFinish: (val) => dispatch(updateIsFinish(val)),
    updateCandidateAnswer: (val) => dispatch(addCandidateAnswer(val)),
    resetCandidateAnswer: (val) => dispatch(resetCandidateAnswer(val))
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswerId: null
    }
  }

  componentDidMount = () => {
    // const {isFinish} = this.props;
    // const candidateAnswers = this.props.candidateAnswers;
    // const currentQuestion = this.findQuestion();
    // const currentQuestionId = currentQuestion.id;
    // const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === currentQuestionId);

    // if (previouslyAnsweredObj !== undefined) {
    //   const getSelectedAnswerId = previouslyAnsweredObj.answerId;
    //   this.setState({selectedAnswerId: getSelectedAnswerId});
    // } else {
    //   this.setState({selectedAnswerId: null});
    // }

    // if (isFinish === null) {
    //   this.props.history.push('/');
    // } else if (isFinish === true) {
    //   this.props.history.push('/score');
    // }
    this.props.questionToRender();
    this.props.updateCurrentQuestionStatus();
  }

  onRadioSelect = (answerId) => {
    this.setState({selectedAnswerId: answerId});
  }

  // submitCandidateAnswer = () => {
  //   const {selectedAnswerId} = this.state;
  //   let candidateAnswers = this.props.candidateAnswers;
  //   const currentQuestion = this.findQuestion();
  //   const currentQuestionId = currentQuestion.id;

  //   if (selectedAnswerId !== null) {
  //     const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === currentQuestionId);

  //     if (previouslyAnsweredObj !== undefined) {
  //       previouslyAnsweredObj.answerId = selectedAnswerId;
  //     } else {
  //       this.props.updateCandidateAnswer({questionId: currentQuestionId, answerId: selectedAnswerId});
  //     }
  //   }
  // }

  // updateQuestionStatus = () => {
  //   const {selectedAnswerId} = this.state;
  //   const currentQuestion = this.findQuestion();
  //   const currentQuestionStatus = currentQuestion.status;

  //   if (currentQuestionStatus === 'active' && selectedAnswerId === null) {
  //     currentQuestion.status = 'visited';
  //   } else {
  //     currentQuestion.status = 'answered';
  //   }
  // }

  isNextQuestionAnswered = () => {
    const candidateAnswers = this.props.candidateAnswers;
    const nextQuestion = this.props.questions.find((question, index) => index === (this.state.currentQuestionIndex + 1));
    const nextQuestionId = nextQuestion.id;
    const previouslyAnsweredObj = candidateAnswers.find(answer => answer.questionId === nextQuestionId);
    if (previouslyAnsweredObj !== undefined) {
      return previouslyAnsweredObj.answerId;
    } else {
      return null
    }
  }

  nextQuestion = () => {
    // const {currentQuestionIndex} = this.state;

    // this.updateQuestionStatus();
    // this.submitCandidateAnswer();
    // this.setState({currentQuestionIndex: currentQuestionIndex + 1, selectedAnswerId: this.isNextQuestionAnswered() });
    this.props.nextQuestion(this.state.selectedAnswerId);
    this.setState({selectedAnswerId: null});
    this.props.questionToRender();
  }

  handleQuestionRevisit = (clickedItemId) => {
    const candidateAnswers = this.props.candidateAnswers;
    const getClickedQuestionIndex = this.props.questions.findIndex((question) => question.id === clickedItemId);
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

  // timer = () => {
  //   let currentTime = new Date().getTime();
  //   let deadline = currentTime + 10*60*1000;
  //   setInterval(() => {
  //     let timeDifference = deadline - currentTime;

  //     if (timeDifference >= 0) {
  //       let mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  //       let secs = Math.floor((timeDifference % (1000 * 60)) / 1000);

  //       console.log(`${mins}:${secs}`);

  //     } else {
  //       console.log("The countdown is over!");
  //     }
  //   }, 1000)
  // };

  render() {
    const question = this.props.currentQuestion;

    if(Object.keys(question).length) {
      return (
        <section className="questions-page">
          <Question
            currentQuestion={question}
            handleOptionSelect={this.onRadioSelect}
            selectedAnswerId = {this.state.selectedAnswerId}
            totalQuestions = {this.props.questions.length}
            currentQuestionIndex={this.props.currentQuestionIndex}
            handleNextQuestion={this.nextQuestion}
            handleFinish={this.handleFinish}
            handleReset = {this.handleReset}
          />
          <Sidebar
            questions={this.props.questions}
            onClick={this.handleQuestionRevisit}
          />
          {/* {this.timer()} */}
        </section>
      )
    } else {
      return null;
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Questions);