import React from 'react'

import './PathfindingVisualizer.css'
import PATHFINDING_OPTIONS from 'pages/pathfinding/pathfindingOptions'
import PathfindingHeader from 'pages/pathfinding/components/Header'
import { CellState, Grid } from 'pages/pathfinding/components/Grid'
import { bfs, dfs, dijkstra, astar } from 'pages/pathfinding/pathfinding'
import Popup from 'components/Popup'

const HEADER_HEIGHT = 110
const DEFAULT_SPEED = 30
const DEFAULT_GRID_SIZE = 1000

class PathfindingVisualizer extends React.Component {
  constructor () {
    super()
    this.state = {
      algo: PATHFINDING_OPTIONS[0].value,
      isRunning: false,
      pathFound: false,
      gridSize: DEFAULT_GRID_SIZE,
      rowsCount: 0, // Will be dynamically calculated
      colsCount: 0, // Will be dynamicall calculated
      startCoordinate: [], // Will change when user clicks mouse
      endCoordinate: [], // Will change when user unclicks mouse
      cellsState: {},
      isDragging: false,
      dragStartCol: null,
      dragStartRow: null,
      draggedCells: [],
      initialClickedCell: null,
      dragOverCells: [],
      speed: DEFAULT_SPEED
    }
  }

  componentDidMount () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  componentDidUpdate (oldProps, oldState) {
    if (oldState !== this.state) {
      if (oldState.gridSize !== this.state.gridSize) {
        this.handleResize()
      }
      if (oldState.colsCount !== this.state.colsCount ||
          oldState.rowsCount !== this.state.rowsCount) {
        if (!this.state.isRunning) {
          this.resetGrid()
        }
      }
    }
  }

  getGridHeight = () => window.innerHeight - HEADER_HEIGHT - 30

  getGridWidth = () => window.innerWidth - 30

  handleResize = () => {
    if (this.state.isRunning) {
      return
    }
    const gridHeight = this.getGridHeight()
    const gridWidth = this.getGridWidth()

    const gcd = (x, y) => y === 0 ? x : gcd(y, x % y)
    const divisor = gcd(gridHeight, gridWidth)
    const WHRatio = [gridWidth / divisor, gridHeight / divisor]

    const x = Math.sqrt(this.state.gridSize / (WHRatio[0] * WHRatio[1]))
    const cols = Math.floor(WHRatio[0] * x)
    const rows = Math.floor(WHRatio[1] * x)
    this.setState({ colsCount: cols, rowsCount: rows })
  }

  handleCellMouseDown = (col, row) => {
    if (this.state.pathFound) {
      this.softClearGrid()
      return
    }
    this.setState({ isDragging: true })

    const clickedCellState = this.state.cellsState[[col, row]]
    this.setState({
      initialClickedCell: [[col, row], clickedCellState],
      dragOverCells: [[col, row]]
    })

    if (clickedCellState === null || clickedCellState === undefined) {
      // If the mouse down cell is an empty cell, the user is drawing obstacles
      this.setState({
        cellsState: {
          ...this.state.cellsState,
          [[col, row]]: CellState.OBSTACLE
        }
      })
    } else if (clickedCellState === CellState.OBSTACLE) {
      // If the mouse down cell is already an obstacle, the user is erasing
      // obstacles
      this.setState({
        cellsState: {
          ...this.state.cellsState,
          [[col, row]]: null
        }
      })
    }
  }

  handleCellMouseEnter = (col, row) => {
    if (!this.state.isDragging) {
      return
    }
    this.setState({ dragOverCells: [...this.state.dragOverCells, [col, row]] })

    if (this.state.initialClickedCell[1] === CellState.STARTPOINT ||
        this.state.initialClickedCell[1] === CellState.ENDPOINT) {
      return
    }

    if (this.state.initialClickedCell[1] === CellState.OBSTACLE) {
      this.setState({
        cellsState: {
          ...this.state.cellsState,
          [[col, row]]: null
        }
      })
    } else {
      this.setState({
        cellsState: {
          ...this.state.cellsState,
          [[col, row]]: CellState.OBSTACLE
        }
      })
    }
  }

  handleMouseUp = () => {
    this.setState({ isDragging: false }) // Mouse up means dragging ends now

    if (this.state.initialClickedCell === null) {
      return
    }

    const endCoordinate = this.state.dragOverCells.slice(-1)[0]
    const endCol = endCoordinate[0]
    const endRow = endCoordinate[1]

    // If the end coordinate is same as initial mouse down coordinate, there's
    // nothing to handle here since everything should be handled in mouse down
    // event already
    if (endCol === this.state.initialClickedCell[0][0] &&
        endRow === this.state.initialClickedCell[0][1]) {
      return
    }

    // If the initial mouse down coordinate was either a start cell or end cell,
    // it means the user just moved the start/end cell
    if (this.state.initialClickedCell[1] === CellState.STARTPOINT ||
        this.state.initialClickedCell[1] === CellState.ENDPOINT) {
      // If the user tries to move the start/end cell to a non-empty cell,
      // do nothing since it can only be moved to an empty cell.
      if (this.state.cellsState[[endCol, endRow]]) {
        this.setState({
          initialClickedCell: null,
          dragOverCells: []
        })
      }

      let coordinateChange
      if (this.state.initialClickedCell[1] === CellState.STARTPOINT) {
        coordinateChange = { startCoordinate: [endCol, endRow] }
      } else {
        coordinateChange = { endCoordinate: [endCol, endRow] }
      }
      this.setState({
        cellsState: {
          ...this.state.cellsState,
          [[endCol, endRow]]: this.state.initialClickedCell[1],
          [this.state.initialClickedCell[0]]: null
        },
        ...coordinateChange
      })
    }

    this.setState({ initialClickedCell: null, dragOverCells: [] })
  }

  onRunClick = () => {
    if (!this.state.isRunning) {
      this.softClearGrid()
      this.runPathfinding()
    }
    this.setState({ isRunning: !this.state.isRunning })
  }

  calculateSleepTime = () => {
    return (
      (40 - this.state.speed) * 10000 / this.state.gridSize
    )
  }

  resetGrid = () => {
    this.setState({
      startCoordinate: [0, 0],
      endCoordinate: [this.state.colsCount - 1, this.state.rowsCount - 1],
      cellsState: {
        [[0, 0]]: CellState.STARTPOINT,
        [[this.state.colsCount - 1, this.state.rowsCount - 1]]: CellState.ENDPOINT
      },
      pathFound: false
    })
  }

  softClearGrid = () => {
    const newCellsState = this.state.cellsState
    for (let c = 0; c < this.state.colsCount; c++) {
      for (let r = 0; r < this.state.rowsCount; r++) {
        if ((c === this.state.startCoordinate[0] && r === this.state.startCoordinate[1]) ||
            (c === this.state.endCoordinate[0] && r === this.state.endCoordinate[1]) ||
            this.state.cellsState[[c, r]] === CellState.OBSTACLE) {
          continue
        }
        newCellsState[[c, r]] = null
      }
    }
    this.setState({
      cellsState: {
        ...this.state.cellsState,
        ...newCellsState,
        [[this.state.startCoordinate[0], this.state.startCoordinate[1]]]: CellState.STARTPOINT,
        [[this.state.endCoordinate[0], this.state.endCoordinate[1]]]: CellState.ENDPOINT
      },
      pathFound: false
    })
  }

  runPathfinding = async () => {
    let pathfindingFunc
    switch (this.state.algo) {
      case 'bfs':
        pathfindingFunc = bfs
        break
      case 'dfs':
        pathfindingFunc = dfs
        break
      case 'dijkstra':
        pathfindingFunc = dijkstra
        break
      case 'astar':
        pathfindingFunc = astar
        break
      default:
        console.error('Unknown chosen algorithm!')
    }
    const path = await pathfindingFunc(
      this.state.colsCount,
      this.state.rowsCount,
      this.state.startCoordinate,
      this.state.endCoordinate,
      this.state.cellsState,
      (newCellsState) => { this.setState({ cellsState: newCellsState }) },
      this.calculateSleepTime,
      () => !this.state.isRunning
    )
    this.setState({ isRunning: false, pathFound: (path !== null) })
  }

  render () {
    const panelStyle = {
      // backgroundColor: 'red',
      position: 'fixed',
      inset: `${HEADER_HEIGHT}px 0 0 0`,
      height: `${window.innerWidth - HEADER_HEIGHT}px)`,
      marginTop: '5px'
    }
    return (
      <>
        <Popup title="⚠️ Screen Too Small"
               message="This visualization works best on larger screens. For the best experience, consider resizing the windows or change device!"
               breakpoint={560}
               autoShowOnSmallScreen={true} />
        <PathfindingHeader height={`${HEADER_HEIGHT}px`}
                           pathFound={this.state.pathFound}
                           onAlgoChange={(algo) => this.setState({ algo })}
                           onResetClick={this.resetGrid}
                           onSoftClearClick={this.softClearGrid}
                           onRunClick={this.onRunClick}
                           isRunning={this.state.isRunning}
                           speed={this.state.speed}
                           onSpeedChange={(e) => this.setState({ speed: Number(e.target.value) })}
                           gridSize={Number(this.state.gridSize)}
                           onGridSizeChange={(e) => this.setState({ gridSize: e.target.value })} />

        <div style={panelStyle}>
          <Grid height={this.getGridHeight()}
                width={this.getGridWidth()}
                rows={this.state.rowsCount}
                cols={this.state.colsCount}
                startCoordinate={this.state.startCoordinate}
                endCoordinate={this.state.endCoordinate}
                cellsState={this.state.cellsState}
                onCellMouseDown={this.handleCellMouseDown}
                onMouseUp={this.handleMouseUp}
                onCellMouseEnter={this.handleCellMouseEnter}
                isRunning={this.state.isRunning} />
        </div>
      </>
    )
  }
}

export default PathfindingVisualizer
