import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

class Button extends React.Component {
  constructor (props) {
    super()
    this.props = props
  }

  render () {
    return (
      <button id="button"
              onClick={this.props.onClick}
              disabled={this.props.disabled}
              style={{ height: this.props.height, width: this.props.width }} >
        {this.props.value}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button
