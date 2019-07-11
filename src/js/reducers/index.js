const findQuestion = (state) => {
  const questions = state.questions;
  const currentQuestion = questions.find((question, index) => index === state.currentQuestionIndex);
  return {...currentQuestion};
}

const updateQuestionStatus = (state, selectedAnswerId) => {
  const questions = [...state.questions];
  const currentQuestionIndex = state.currentQuestionIndex;
  const currentQuestion = questions.find((question, index) => index === currentQuestionIndex);
  const currentQuestionStatus = currentQuestion.status;

  if (currentQuestionStatus === 'active' && selectedAnswerId === null) {
    currentQuestion.status = 'visited';
  } else if (currentQuestionStatus === 'active' && selectedAnswerId !== null) {
    currentQuestion.status = 'answered';
  }

  return questions;
}

const updateCurrentQuestionStatus = (state) => {
  const questions = [...state.questions];
  const currentQuestionIndex = state.currentQuestionIndex;
  const currentQuestion = questions.find((question, index) => index === currentQuestionIndex);

  currentQuestion.status = 'active';

  return questions;
}

const submitCandidateAnswer = (state, answerId) => {
  const selectedAnswerId = answerId;
  let candidateAnswers = state.candidateAnswers;
  const currentQuestionId = state.currentQuestion.id;

  if (selectedAnswerId !== null) {
    const previouslyAnsweredObj = candidateAnswers.find((answer) => answer.questionId === currentQuestionId);

    if (previouslyAnsweredObj !== undefined) {
      previouslyAnsweredObj.answerId = selectedAnswerId;
    } else {
      candidateAnswers = [...candidateAnswers, {questionId: currentQuestionId, answerId: selectedAnswerId}];
    }
  }

  return candidateAnswers;
}



function rootReducer(state, action) {
  switch (action.type) {
    case 'QUESTION_TO_RENDER':
        let currentQuestion = findQuestion(state);
        updateCurrentQuestionStatus(state);
      return {
        ...state,
        currentQuestion: currentQuestion
      }
    case 'NEXT_QUESTION':
      const updateCandidateAnswer = submitCandidateAnswer(state, action.payload)
      return {
        ...state,
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

    case 'UPDATE_QUESTION_STATUS':
      const updatedQuestions = updateQuestionStatus(state, action.payload);
      return {
        ...state,
        questions: updatedQuestions
      }
    default:
      return state
  }
}

export default rootReducer;