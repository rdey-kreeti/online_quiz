import * as util from '../helpers';
import questions from '../../fixtures/questions';

function rootReducer(state, action) {
  switch (action.type) {
    case 'QUESTION_TO_RENDER':
        let currentQuestion = util.findQuestion(state);
        util.updateCurrentQuestionStatus(state);
      return {
        ...state,
        currentQuestion: currentQuestion
      }
    case 'NEXT_QUESTION':
      const updateCandidateAnswer = util.submitCandidateAnswer(state, action.payload);
      const updatedQuestionStatus = util.updateQuestionStatus(state, state.currentQuestion.id, action.payload);
      return {
        ...state,
        questions: updatedQuestionStatus,
        candidateAnswers: updateCandidateAnswer,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      }
    case 'TOGGLE_FINISH':
      return {
        ...state,
        isFinish: action.payload
      }
    case 'ADD_CANDIDATE_ANSWER':
      return {
        ...state,
        candidateAnswers: [...state.candidateAnswers, action.payload]
      }

    case 'RESET_CANDIDATE_ANSWER':
      return {
        ...state,
        candidateAnswers: [...action.payload]
      }

    case 'UPDATE_QUESTION_REVISIT':
      const updateCandidateAnswerAgain = util.submitCandidateAnswer(state, action.payload.selectedAnswerId);
      const updateQuestionStatusAgain = util.updateQuestionStatus(state, state.currentQuestion.id, action.payload.selectedAnswerId);
      return {
        ...state,
        questions: updateQuestionStatusAgain,
        currentQuestionIndex: action.payload.index,
        candidateAnswers: updateCandidateAnswerAgain
      }

      case 'RESTART_QUIZ':
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('image');
        return {
          ...state,
          isFinish: null,
          candidateAnswers: [],
          questions,
          currentQuestionIndex: 0,
          currentQuestion: {}
        }
    default:
      return state
  }
}

export default rootReducer;