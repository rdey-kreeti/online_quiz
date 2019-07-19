import React, {Component} from 'react';
import './index.scss'

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

    if (parseInt(min, 10) === 0 && parseInt(sec, 10) === 0) {
      clearInterval(this.intervalHandle);
      this.props.autoSubmit();
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
      <span className={parseInt(this.state.minutes, 10) === 0 && parseInt(this.state.seconds) <= 10 ? 'timer red blink' : 'timer'}>
        <span>Time left: </span>
        <span>
          {this.state.minutes} : {this.state.seconds}
        </span>
      </span>
    )
  }
}

export default Timer;