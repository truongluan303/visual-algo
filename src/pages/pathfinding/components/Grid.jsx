import React from 'react'
import PropTypes from 'prop-types'
import './Grid.css'

const CellState = Object.freeze({
  STARTPOINT: 0,
  ENDPOINT: 1,
  OBSTACLE: 2,
  QUEUED: 3,
  VISITED: 4,
  FINALPATH: 5
})

class Grid extends React.Component {
  componentDidMount () {
    window.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = () => this.props.onMouseUp()

  getCellColor (col, row) {
    if (col === this.props.startCoordinate[0] && row === this.props.startCoordinate[1]) {
      return 'var(--yellow)'
    }
    if (col === this.props.endCoordinate[0] && row === this.props.endCoordinate[1]) {
      return 'purple'
    }

    if (this.props.cellsState[[col, row]] === CellState.OBSTACLE) {
      return 'var(--dark-red)'
    } else if (this.props.cellsState[[col, row]] === CellState.QUEUED) {
      return 'var(--light-blue)'
    } else if (this.props.cellsState[[col, row]] === CellState.VISITED) {
      return 'var(--blue)'
    } else if (this.props.cellsState[[col, row]] === CellState.FINALPATH) {
      return 'var(--green)'
    } else {
      return 'white'
    }
  }

  render () {
    const cellWidth = Math.floor(this.props.width / this.props.cols)
    const cellHeight = Math.floor(this.props.height / this.props.rows)
    const cellSize = Math.min(cellWidth, cellHeight)

    const totalCells = this.props.rows * this.props.cols
    const cells = Array.from({ length: totalCells }, (_, index) => {
      const row = Math.floor(index / this.props.cols)
      const col = index % this.props.cols
      return (
        <div
          key={`${col}-${row}`}
          className={
            'grid-cell' + (this.props.isRunning ? ' grid-cell-noaction' : ' grid-cell-hoverable')
          }
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: this.getCellColor(col, row)
          }}
          onMouseDown={
            this.props.isRunning ? () => {} : () => this.props.onCellMouseDown(col, row)
          }
          onMouseEnter={
            this.props.isRunning ? () => {} : () => this.props.onCellMouseEnter(col, row)
          }
          draggable
        />
      )
    })

    return (
      <div
        className="grid-wrapper"
        style={{
          width: `${cellSize * this.props.cols}px`,
          height: `${cellSize * this.props.rows}px`
        }}
      >
        {cells}
      </div>
    )
  }
}

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onCellMouseDown: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  cellsState: PropTypes.object.isRequired,
  startCoordinate: PropTypes.array.isRequired,
  endCoordinate: PropTypes.array.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export { CellState, Grid }
