function rootReducer(state, action) {
  switch (action.type) {
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
    default:
      return state
  }
}

export default rootReducer;