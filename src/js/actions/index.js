export function updateIsFinish(payload) {
  return {type: 'TOGGLE_FINISH', payload};
}

export function addCandidateAnswer(payload) {
  return {type: 'ADD_CANDIDATE_ANSWER', payload};
}

export function resetCandidateAnswer(payload) {
  return {type: 'RESET_CANDIDATE_ANSWER', payload};
}