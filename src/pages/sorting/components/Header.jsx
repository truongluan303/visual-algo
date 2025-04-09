import Dropdown from 'components/Dropdown'
import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'
import Button from 'components/Button'
import Slider from 'components/Slider'
import SORT_OPTIONS from 'pages/sorting/sortOptions'

class SortingHeader extends React.Component {
  constructor (props) {
    super()
    this.props = props
  };

  render () {
    return (
      <header id="header" height={this.props.height} >
        <Dropdown label="Algorithm"
                  width="150px"
                  options={SORT_OPTIONS}
                  onSelect={this.props.onAlgoChange}
                  disabled={this.props.isRunning} />
        <Slider label="Array Size"
                min={15}
                max={1000}
                value={this.props.arraySize}
                disabled={this.props.isRunning}
                displayValue={String(this.props.arraySize)}
                onChange={this.props.onSizeChange} />
        <Slider label="Speed"
                min={1}
                max={25}
                value={this.props.speed}
                disabled={false}
                displayValue=""
                onChange={this.props.onSpeedChange} />
        <Button onClick={this.props.onShuffleClick}
                value="Shuffle"
                disabled={this.props.isRunning}
                height="35px"
                width="120px" />
        <Button onClick={this.props.onRunClick}
                value={this.props.isRunning ? 'Stop' : 'Run'}
                disabled={this.props.sorted}
                height="35px"
                width="120px" />
      </header>
    )
  }
};

SortingHeader.propTypes = {
  height: PropTypes.string.isRequired,
  sorted: PropTypes.bool.isRequired,
  arraySize: PropTypes.number.isRequired,
  onAlgoChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  onShuffleClick: PropTypes.func.isRequired,
  onRunClick: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export default SortingHeader
