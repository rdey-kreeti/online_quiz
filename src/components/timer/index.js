import React, {Component} from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '01',
      seconds: '00'
    }
    this.intervalHandle = null;
    this.secondsRemaining = null;
  }

  componentDidMount() {
    this.startCountDown();
  }

  tick = () => {
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = Math.floor(this.secondsRemaining - (min * 60));

    if(min <= 2) {
      min = '0' + min;
    }

    if(sec < 10) {
      sec = '0' + sec;
    }

    this.setState({minutes: min, seconds: sec});

    if (min == 0 && sec == 0) {
      clearInterval(this.intervalHandle);
    }

    this.secondsRemaining--
  }

  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 1000);

    let time = this.state.minutes;
    this.secondsRemaining = time * 60;
  }

  render() {
    return (
      <div>{this.state.minutes}:{this.state.seconds}</div>
    )
  }
}

export default Timer;