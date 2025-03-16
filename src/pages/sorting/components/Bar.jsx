import React from 'react'
import PropTypes from 'prop-types'

class Bar extends React.Component {
  constructor (props) {
    super()
    this.props = props
  }

  render () {
    const color = this.props.color ? this.props.color : 'var(--light-blue)'
    const horMargin = this.props.width > 5 ? '2px' : (this.props.width / 100)
    const style = {
      backgroundColor: color,
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      margin: `0 ${horMargin} 0 ${horMargin}`
    }
    return (
      <div style={style} />
    )
  }
};

Bar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string
}

export default Bar
