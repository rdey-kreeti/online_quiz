export const findQuestion = (state) => {
  const questions = state.questions;
  const currentQuestion = questions.find((question, index) => index === state.currentQuestionIndex);
  return {...currentQuestion};
}

export const updateQuestionStatus = (state, selectedQuestionId, selectedAnswerId) => {
  return state.questions.map(question => {
    if (question.id === selectedQuestionId && question.status === 'active' && selectedAnswerId === null) {
      return { ...question, status: 'visited' };
    } else if (question.id === selectedQuestionId && question.status === 'active' && selectedAnswerId !== null) {
      return {...question, status: 'answered'};
    } else {
      return {...question}
    }
  })
}

export const updateCurrentQuestionStatus = (state) => {
  const questions = [...state.questions];
  const currentQuestionIndex = state.currentQuestionIndex;
  const currentQuestion = questions.find((question, index) => index === currentQuestionIndex);

  currentQuestion.status = 'active';

  return questions;
}

export const submitCandidateAnswer = (state, answerId) => {
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