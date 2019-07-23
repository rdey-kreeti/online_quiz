import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateTimer} from '../../js/actions';
import './index.scss';

const mapStateToProps = (state) => {
  return {
    minutes: state.minutes,
    seconds: state.seconds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimer: (val) => dispatch(updateTimer(val))
  }
}

class Timer extends Component {
  constructor(props) {
    super(props);

    this.intervalHandle = null;
    this.secondsRemaining = null;
  }

  componentDidMount() {
    this.startCountDown();
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  tick = () => {
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = Math.floor(this.secondsRemaining - (min * 60));

    if(min <= 5) {
      min = '0' + min;
    }

    if(sec < 10) {
      sec = '0' + sec;
    }

    this.props.updateTimer({minutes: min, seconds: sec});

    if (parseInt(min, 10) === 0 && parseInt(sec, 10) === 0) {
      clearInterval(this.intervalHandle);
      this.props.autoSubmit();
    }

    this.secondsRemaining--
  }

  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 1000);

    let time = this.props.minutes;
    this.secondsRemaining = time * 60 + parseInt(this.props.seconds, 10);
  }

  render() {
    return (
      <span className={parseInt(this.props.minutes, 10) === 0 && parseInt(this.props.seconds) <= 10 ? 'timer red blink' : 'timer'}>
        <span>Time left: </span>
        <span>
          {this.props.minutes} : {this.props.seconds}
        </span>
      </span>
    )
  }
}

Timer.propTypes = {
  autoSubmit: PropTypes.func
}

export default connect (mapStateToProps, mapDispatchToProps) (Timer);