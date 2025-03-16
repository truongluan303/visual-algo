import React from 'react'
import PropTypes from 'prop-types'

class Cell extends React.Component {
  constructor (props) {
    super()
    this.props = props
  }

  getColor () {
    return 'lightgrey'
  }

  render () {
    const style = {
      backgroundColor: this.getColor(),
      width: '100%',
      height: '100%'
    }
    return (
      <div style={style}/>
    )
  }
};

Cell.propTypes = {
  type: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired
}

export default Cell
