import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'
import Dropdown from 'components/Dropdown'
import Button from 'components/Button'
import PATHFINDING_OPTIONS from 'pages/pathfinding/pathfindingOptions'

class PathfindingHeader extends React.Component {
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
                  options={PATHFINDING_OPTIONS}
                  onSelect={this.props.onAlgoChange} />
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
  onRunClick: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export default PathfindingHeader
