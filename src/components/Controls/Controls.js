import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import './Controls.css';

class Controls extends PureComponent {
  static propTypes = {
    handleStart: PropTypes.func.isRequired,
    isStart: PropTypes.bool.isRequired,
    handleChangeTime: PropTypes.func.isRequired
  }

  handleChangeTime = ({ target: { value } }) => {
    this.props.handleChangeTime(value * 60);
  }

  render() {
    const { handleStart, isStart } = this.props;

    return (
      <div className='controlsWrapper'>
        <p>Countdown:</p>
        <input className='input' type='number' disabled={isStart} onChange={this.handleChangeTime} placeholder='(Min)' />
        <button className='btn' disabled={isStart} onClick={handleStart}>START</button>
      </div>
    );
  }
}

export default Controls;
