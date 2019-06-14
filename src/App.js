import React from 'react';
import HomePage from './components/mainPage';

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <HomePage {...props}/>
    </div>
  );
}

export default App;
