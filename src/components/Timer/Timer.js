import React, { PureComponent } from 'react';
import classNames from 'classnames'
import Speed from '../Speed';
import Controls from '../Controls';
import { getTime } from '../../utils'
import './Timer.css';

// For svg icon
function Pause(props){
  return (
    <svg 
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 235.592 235.592" 
      className={props.className}
      onClick={props.onClick}
    >
      <g>
        <path d="M117.795,0.002C52.843,0.002,0,52.844,0,117.795C0,182.747,52.843,235.59,117.795,235.59
        c64.953,0,117.797-52.843,117.797-117.795C235.592,52.844,182.748,0.002,117.795,0.002z M117.795,220.59
        C61.113,220.59,15,174.477,15,117.795C15,61.114,61.113,15.002,117.795,15.002c56.683,0,102.797,46.112,102.797,102.793
        C220.592,174.477,174.477,220.59,117.795,220.59z"/>
        <path d="M139.834,68.258c-4.143,0-7.5,3.357-7.5,7.5v84.076c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V75.758
        C147.334,71.615,143.977,68.258,139.834,68.258z"/>
        <path d="M95.758,68.258c-4.143,0-7.5,3.357-7.5,7.5v84.076c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V75.758
        C103.258,71.615,99.9,68.258,95.758,68.258z"/>
      </g>
    </svg>
  )
}

class Timer extends PureComponent {

  state = {
    time: 0,
    startTime: 0,
    status: false,
    isStart: false,
    speed: 1
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = key => value => {
    if (key === 'time') {
      this.setState({
        startTime: value
      })
    }
    this.setState({ [key]: value })
  }

  handleStart = () => {
    this.interval = setInterval(() => {
      if (this.state.time !== 0) {
        this.setState(prev => ({ time: prev.time - 1 }));
        if (this.state.startTime / this.state.time === 2) {
          this.setState({ status: 'halfTime' })
        }
        if (this.state.time === 20) {
          this.setState({ status: '20Time' })
        }
        if (this.state.time === 10) {
          this.setState({ status: '10Time' })
        }
      } else {
        this.setState({ time: 0, status: 'endTime' });

        clearInterval(this.interval);
      }
    }, 1000 / this.state.speed);

    this.setState({ isStart: true });
  }

  handleStop = () => {
    clearInterval(this.interval);

    this.setState({ isStart: false });
  }

  renderMessage = () => {
    const { status } = this.state;
    switch (status) {
      case 'halfTime':
      case '20Time':
      case '10Time':
        return <p
          className={classNames('timeText',
            {
              'blink': status === '10Time',
              'red': status === '20Time'
            }
          )}
        >
          More than halfway there!
        </p>
      default: return <p className='timeText'>Time’s up!</p>
    }
  }

  renderTime = () => {
    const { time, isStart } = this.state;

    return (
      <div
        className={classNames('time')}
      >
        {getTime(time)}
        <Pause
          onClick={this.handleStop}
          className={classNames('pause', { 'isDisabled': isStart })}
        />
      </div>
    )
  }

  render() {
    const { status, speed, isStart } = this.state;

    return (
      <div className='timer'>
        <Controls
          isStart={isStart}
          handleStart={this.handleStart}
          handleChangeTime={this.handleChange('time')}
        />
        {status ? this.renderMessage() : null}
        {this.renderTime()}
        <Speed
          isStart={isStart}
          handleChangeSpeed={this.handleChange('speed')}
          speed={speed}
        />
      </div>
    );
  }
}

export default Timer;
