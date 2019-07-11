export function questionToRender(payload) {
  return {type: 'QUESTION_TO_RENDER', payload}
}

export function nextQuestion(payload) {
  return {type: 'NEXT_QUESTION', payload}
}

export function updateIsFinish(payload) {
  return {type: 'TOGGLE_FINISH', payload};
}

export function addCandidateAnswer(payload) {
  return {type: 'ADD_CANDIDATE_ANSWER', payload};
}

export function resetCandidateAnswer(payload) {
  return {type: 'RESET_CANDIDATE_ANSWER', payload};
}

export function updateCurrentQuestionStatus(payload) {
  return {type: 'UPDATE_CURRENT_QUESTION_STATUS', payload};
}

export function updateQuestionStatus(payload) {
  console.log(payload, 'actions')
  return {type: 'UPDATE_QUESTION_STATUS', payload}
}