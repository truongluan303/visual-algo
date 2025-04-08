import React from 'react'
import PropTypes from 'prop-types'

import './Slider.css'

class Slider extends React.Component {
  handleChange (e) {
    this.setState({ value: e.target.value })
    this.props.onChange(e)
  }

  render () {
    const { label, min, max, value, disabled, displayValue, onChange } = this.props

    return (
      <div className="w-full flex flex-col gap-2">
        <label className="text-gray-700 font-medium">
          {label} <span className="font-bold">{displayValue}</span>
        </label>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`
            w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer
            disabled:bg-gray-300
            disabled:cursor-not-allowed
            transition
          `}
        />
      </div>
    )
  }
}

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  displayValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Slider
