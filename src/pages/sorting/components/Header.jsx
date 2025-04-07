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
        <h1>VisualAlgo</h1>
        <Dropdown label="Algorithm"
                  width="150px"
                  options={SORT_OPTIONS}
                  onSelect={this.props.onAlgoChange} />
        <Slider label="Array Size"
                min={15}
                max={1000}
                value={this.props.arraySize}
                displayValue={String(this.props.arraySize)}
                onChange={this.props.onSizeChange} />
        <Button onClick={this.props.onShuffleClick}
                value="Shuffle"
                disabled={this.props.isRunning}
                height="35px"
                width="130px" />
        <Button onClick={this.props.onRunClick}
                value={this.props.isRunning ? 'Stop' : 'Run'}
                disabled={this.props.sorted}
                height="35px"
                width="130px" />
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
  onShuffleClick: PropTypes.func.isRequired,
  onRunClick: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export default SortingHeader
