import React from 'react'
import PropTypes from 'prop-types'
import './Popup.css'

class Popup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: props.showOnInit || false,
      shouldRender: props.showOnInit || false
    }
  }

  componentDidMount () {
    if (this.props.autoShowOnSmallScreen) {
      this.checkScreenSize()
      window.addEventListener('resize', this.checkScreenSize)
    }
  }

  componentWillUnmount () {
    if (this.props.autoShowOnSmallScreen) {
      window.removeEventListener('resize', this.checkScreenSize)
    }
  }

  checkScreenSize = () => {
    const isSmall = window.innerWidth < (this.props.breakpoint || 640)
    if (isSmall) {
      this.setState({ visible: true, shouldRender: true })
    }
  }

  handleClose = () => {
    this.setState({ visible: false })
    setTimeout(() => {
      this.setState({ shouldRender: false })
    }, 300)
  }

  render () {
    const { title, message, buttonLabel } = this.props
    const { visible, shouldRender } = this.state

    if (!shouldRender) return null

    return (
      <div className={`popup-container ${visible ? 'slide-in' : 'slide-out'}`}>
        <div className="popup-content">
          {title && <h2 className="popup-title">{title}</h2>}
          <p className="popup-message">{message}</p>
          <button className="popup-close" onClick={this.handleClose}>
            {buttonLabel || 'Close'}
          </button>
        </div>
      </div>
    )
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  showOnInit: PropTypes.bool,
  autoShowOnSmallScreen: PropTypes.bool,
  breakpoint: PropTypes.number
}

Popup.defaultProps = {
  title: '',
  buttonLabel: 'Close',
  showOnInit: false,
  autoShowOnSmallScreen: false,
  breakpoint: 640
}

export default Popup
