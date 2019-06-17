import React, {Component} from 'react';
import Question from '../question';
import Sidebar from '../sidebar';

import './index.scss';

const questions = [
  {
    'id': 1,
    'question': "What is the scientific name of a butterfly?",
    'options': [ {id: 1, option: "Apis"}, {id: 2, option: "Coleoptera"}, {id: 3, option: "Formicidae"}, {id: 4, option: "Rhopalocera"} ],
    'status': 'not-visited',
    'correctAnswerId': 3
  },
  {
    'id': 30,
    'question': "How hot is the surface of the sun?",
    'options': [ {id: 1, option: "1,233 K"}, {id: 2, option: "5,778 K"}, {id: 3, option: "12,130 K"}, {id: 4, option: "101,300 K"} ],
    'status': 'not-visited',
    'correctAnswerId': 1
  },
  {
    'id': 3,
    'question': "Who are the actors in The Internship?",
    'options': [ {id: 1, option: "Ben Stiller, Jonah Hill"}, {id: 2, option: "Courteney Cox, Matt LeBlanc"},    {id: 3, option: "Kaley Cuoco, Jim Parsons"}, {id: 4, option: "Vince Vaughn, Owen Wilson"} ],
    'status': 'not-visited',
    'correctAnswerId': 3
  },
  {
    'id': 4,
    'question': "What is the capital of Spain?",
    'options': [ {id: 1, option: "Berlin"}, {id: 2, option: "Buenos Aires"}, {id: 3, option: "Madrid"}, {id: 4, option: "San Juan"} ],
    'status': 'not-visited',
    'correctAnswerId': 2
  },
  {
    'id': 5,
    'question': "What are the school colors of the University of Texas at Austin?",
    'options': [ {id: 1, option: "Black, Red"}, {id: 2, option: "Blue, Orange"}, {id: 3, option: "White, Burnt Orange"}, {id: 4, option: "White, Old gold, Gold"} ],
    'status': 'not-visited',
    'correctAnswerId': 2
  },
  {
    'id': 6,
    'question': "What is 70 degrees Fahrenheit in Celsius?",
    'options': [ {id: 1, option: "18.8889"}, {id: 2, option: "20"}, {id: 3, option: "21.1111"}, {id: 4, option: "158"} ],
    'status': 'not-visited',
    'correctAnswerId': 2
  },
  {
    'id': 7,
    'question': "When was Mahatma Gandhi born?",
    'options': [ {id: 1, option: "October 2, 1869"}, {id: 2, option: "December 15, 1872"}, {id: 3, option: "July 18, 1918"}, {id: 4, option: "January 15, 1929"} ],
    'status': 'not-visited',
    'correctAnswerId': 0
  },
  {
    'id': 8,
    'question': "How far is the moon from Earth?",
    'options': [ {id: 1, option: "7,918 miles (12,742 km)"}, {id: 2, option: "86,881 miles (139,822 km)"}, {id: 3, option: "238,400 miles (384,400 km)"}, {id: 4, option: "35,980,000 miles (57,910,000 km)"} ],
    'status': 'not-visited',
    'correctAnswerId': 2
  },
  {
    'id': 9,
    'question': "What is 65 times 52?",
    'options': [ {id: 1, option: "117"}, {id: 2, option: "3120"}, {id: 3, option: "3380"}, {id: 4, option: "3520"} ],
    'status': 'not-visited',
    'correctAnswerId': 2
  },
  {
    'id': 10,
    'question': "How tall is Mount Everest?",
    'options': [ {id: 1, option: "6,683 ft (2,037 m)"}, {id: 2, option: "7,918 ft (2,413 m)"}, {id: 3, option: "19,341 ft (5,895 m)"}, {id: 4, option: "29,029 ft (8,847 m)"} ],
    'status': 'not-visited',
    'correctAnswerId': 3
  },
  {
    'id': 11,
    'question': "When did The Avengers come out?",
    'options': [ {id: 1, option: "May 2, 2008"}, {id: 2, option: "May 4, 2012"}, {id: 3, option: "May 3, 2013"}, {id: 4, option: "April 4, 2014"} ],
    'status': 'not-visited',
    'correctAnswerId': 1
  },
  {
    'id': 12,
    'question': "What is 48,879 in hexidecimal?",
    'options': [ {id: 1, option: "0x18C1"}, {id: 2, option: "0xBEEF"}, {id: 3, option: "0xDEAD"}, {id: 4, option: "0x12D591"} ],
    'status': 'not-visited',
    'correctAnswerId': 1
  }
];



class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidateAnswers: [],
      currentQuestionIndex: 0,
      selectedAnswerId: null,
      isFinish: false
    }
  }

  findQuestion = () => {
    return questions.find((question, index) => index === this.state.currentQuestionIndex);
  }

  questionToRender = () => {
    const renderableQuestion = this.findQuestion();
    renderableQuestion.status = 'active';
    return renderableQuestion;
  }

  onRadioSelect = (answerId) => {
    this.setState({selectedAnswerId: answerId});
  }

  nextQuestion = () => {
    const {currentQuestionIndex, selectedAnswerId, candidateAnswers} = this.state;
    const currentQuestion = this.findQuestion();
    const currentQuestionId = currentQuestion.id;
    const currentQuestionStatus = currentQuestion.status;

    if (currentQuestionStatus === 'active' && selectedAnswerId === null) {
      currentQuestion.status = 'visited';
    } else {
      currentQuestion.status = 'answered';
    }

    if (selectedAnswerId !== null) {
      const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === currentQuestionId);

      if (previouslyAnsweredObj !== undefined) {
        previouslyAnsweredObj.answerId = selectedAnswerId;
      } else {
        candidateAnswers.push({questionId: currentQuestionId, answerId: selectedAnswerId});
        this.setState({candidateAnswers: candidateAnswers});
      }
    }

    this.setState({currentQuestionIndex: currentQuestionIndex + 1, selectedAnswerId: null });
  }

  handleQuestionRevisit = (clickedItemId) => {
    const {candidateAnswers} = this.state;
    const getClickedItemIndex = questions.findIndex((question) => question.id === clickedItemId);
    const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === clickedItemId);

    if (previouslyAnsweredObj !== undefined) {
      const getSelectedAnswerId = candidateAnswers.find((answer) => answer.questionId === clickedItemId).answerId;
      this.setState({currentQuestionIndex: getClickedItemIndex, selectedAnswerId: getSelectedAnswerId});
    } else {
      this.setState({currentQuestionIndex: getClickedItemIndex, selectedAnswerId: null});
    }
  }

  handleFinish = () => {
    this.setState({isFinish: true});
  }

  calculateScore = () => {
    const {candidateAnswers} = this.state;
    let score = 0;

    candidateAnswers.forEach((answer) => {
      const getAnsweredQuestion = questions.find((question) => question.id === answer.questionId);
      if (getAnsweredQuestion.correctAnswerId === answer.answerId) {
        score += 1;
      }
    });
    return score;
  }

  render() {
    const  question = this.questionToRender();
    const {isFinish} = this.state;

    return (
      <React.Fragment>
        {isFinish ? (
          <span>{this.calculateScore()}</span>
        ) : (
          <section className="questions-page">
            <Question
              currentQuestion={question}
              handleOptionSelect={this.onRadioSelect}
              selectedAnswerId = {this.state.selectedAnswerId}
              totalQuestions = {questions.length}
              currentQuestionIndex={this.state.currentQuestionIndex}
              handleNextQuestion={this.nextQuestion}
              handleFinish={this.handleFinish}
            />
            <Sidebar
              questions={questions}
              onClick={this.handleQuestionRevisit}
            />
          </section>
        )
        }
      </React.Fragment>
    )
  }
}

export default Questions;