import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'
import Dropdown from 'components/Dropdown'
import Button from 'components/Button'
import PATHFINDING_OPTIONS from 'pages/pathfinding/pathfindingOptions'
import Slider from 'components/Slider'

class PathfindingHeader extends React.Component {
  constructor (props) {
    super()
    this.props = props
  };

  render () {
    return (
      <header id="header" style={{ height: this.props.height }} >
        <Dropdown label="Algorithm"
                  width="150px"
                  options={PATHFINDING_OPTIONS}
                  onSelect={this.props.onAlgoChange}
                  disabled={this.props.isRunning} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '12px' }}>
            <Slider label="Grid Size"
                    min={200}
                    max={5000}
                    step={100}
                    value={this.props.gridSize}
                    disabled={this.props.isRunning}
                    displayValue=""
                    onChange={this.props.onGridSizeChange} />
          </div>
          <div>
            <Slider label="Speed"
                    min={1}
                    max={40}
                    value={this.props.speed}
                    disabled={false}
                    displayValue=""
                    onChange={this.props.onSpeedChange} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button onClick={this.props.onResetClick}
                  value='Hard Reset'
                  disabled={this.props.isRunning}
                  height='33px'
                  width='170px' />
          <Button onClick={this.props.onSoftClearClick}
                  value='Soft Clear'
                  disabled={this.props.isRunning}
                  height="33px"
                  width="170px" />
        </div>
        <Button onClick={this.props.onRunClick}
                value={this.props.isRunning ? 'Stop' : 'Run'}
                disabled={this.props.pathFound}
                height="35px"
                width="130px" />
      </header>
    )
  }
};

PathfindingHeader.propTypes = {
  height: PropTypes.string.isRequired,
  pathFound: PropTypes.bool.isRequired,
  onAlgoChange: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onSoftClearClick: PropTypes.func.isRequired,
  onRunClick: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  gridSize: PropTypes.number.isRequired,
  onGridSizeChange: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired
}

export default PathfindingHeader
