import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Speed.css';

class Speed extends PureComponent {
  static propTypes = {
    speed: PropTypes.number.isRequired,
    isStart: PropTypes.bool.isRequired,
    handleChangeSpeed: PropTypes.func.isRequired
  }

  handleChangeSpeed = speed => () => {
    this.props.handleChangeSpeed(speed);
  }

  render() {
    const { speed, isStart } = this.props;

    return (
      <div className={'speedWrapper'}>
        <div
          className={classNames('speedBlock', { 'isActive': speed === 1, 'isDisabled': isStart })}
          onClick={this.handleChangeSpeed(1)}
        >
          1X
        </div>
        <div
          className={classNames('speedBlock', { 'isActive': speed === 1.5, 'isDisabled': isStart })}
          onClick={this.handleChangeSpeed(1.5)}
        >
          1.5X
        </div>
        <div
          className={classNames('speedBlock', { 'isActive': speed === 2, 'isDisabled': isStart })}
          onClick={this.handleChangeSpeed(2)}
        >
          2X
        </div>
      </div>
    );
  }
}

export default Speed;
