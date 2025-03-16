import React from 'react'
import PropTypes from 'prop-types'
import './Dropdown.css'

class Dropdown extends React.Component {
  constructor (props) {
    super()
    this.val = null
    this.props = props
    this.onChangeEvent = this.onChangeEvent.bind(this)
  }

  onChangeEvent (e) {
    const val = e.target.value
    this.props.onSelect(val)
  }

  render () {
    return (
      <div id="container">
        <label id="label"> {this.props.label} </label>
        <select id="dropdown"
          onChange={this.onChangeEvent}
          style={{ width: this.props.width }} >
          {this.props.options.map(({ value, label }) =>
            <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
    )
  }
}

Dropdown.propTypes = {
  width: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Dropdown
