export const loadData = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) {
    return {isFinish: null, candidateAnswers: []};
  }
  return JSON.parse(serializedState);
}

export const saveData = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}