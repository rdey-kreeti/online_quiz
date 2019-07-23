import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question';
import Sidebar from '../sidebar';
import {questionToRender, nextQuestion, updateCurrentQuestionStatus, updateIsFinish, addCandidateAnswer, resetCandidateAnswer, updateQuestionRevisit} from '../../js/actions';
import Timer from '../timer';

import './index.scss';
import Button from '../button';

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
    updateCurrentQuestionStatus: () => dispatch(updateCurrentQuestionStatus()),
    updateQuestionRevisit: (val) => dispatch(updateQuestionRevisit(val)),
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
    const {isFinish} = this.props;

    if (isFinish === null) {
      this.props.history.push('/');
    } else if (isFinish === true) {
      this.props.history.push('/score');
    }

    this.props.questionToRender();
    this.props.updateCurrentQuestionStatus();
  }

  onRadioSelect = (answerId) => {
    this.setState({selectedAnswerId: answerId});
  }

  isNextQuestionAnswered = () => {
    const candidateAnswers = this.props.candidateAnswers;
    const nextQuestion = this.props.questions.find((question, index) => index === (this.props.currentQuestionIndex + 1));
    const nextQuestionId = nextQuestion.id;
    const previouslyAnsweredObj = candidateAnswers.find(answer => answer.questionId === nextQuestionId);
    if (previouslyAnsweredObj !== undefined) {
      return previouslyAnsweredObj.answerId;
    } else {
      return null
    }
  }

  nextQuestion = () => {
    this.props.nextQuestion(this.state.selectedAnswerId);
    this.setState({selectedAnswerId: this.isNextQuestionAnswered()});
    this.props.questionToRender();
  }

  handleQuestionRevisit = (clickedItemId) => {
    const candidateAnswers = this.props.candidateAnswers;
    const getClickedQuestionIndex = this.props.questions.findIndex((question) => question.id === clickedItemId);
    const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === clickedItemId);

    if (previouslyAnsweredObj !== undefined) {
      const getSelectedAnswerId = previouslyAnsweredObj.answerId;
      this.setState({selectedAnswerId: getSelectedAnswerId});
    } else {
      this.setState({selectedAnswerId: null});
    }
    this.props.updateQuestionRevisit({index: getClickedQuestionIndex, selectedAnswerId: this.state.selectedAnswerId});
    this.props.questionToRender();
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

  render() {
    const question = this.props.currentQuestion;

    if(Object.keys(question).length) {
      return (
        <section className="questions-page">
          <section className="questions-header">
            <Timer autoSubmit={this.handleFinish}/>
            <Button type="button" text="End Exam" onClick={this.handleFinish} outline/>
          </section>
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
        </section>
      )
    } else {
      return null;
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Questions);