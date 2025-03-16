import React from 'react'

import './PathfindingVisualizer.css'
import PATHFINDING_OPTIONS from 'pages/pathfinding/pathfindingOptions'
import PathfindingHeader from 'pages/pathfinding/components/Header'
import Grid from 'pages/pathfinding/components/Grid'
import { Node } from 'pages/pathfinding/node'
import { bfs, dfs, dijkstra, astar } from 'pages/pathfinding/pathfinding'

const HEADER_HEIGHT = 60
const DEFAULT_MATRIX_SIZE = 2500

class PathfindingVisualizer extends React.Component {
  constructor () {
    super()
    const [cellWidth, matrixWidth, cellsCountEachRow, cellsCountEachCol] = this.calculateGridSize()
    this.state = {
      matrix: this.createMatrix(cellsCountEachCol, cellsCountEachRow),
      cellWidth,
      matrixWidth,
      algo: PATHFINDING_OPTIONS[0].value,
      isRunning: false,
      pathFound: false,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  componentDidUpdate (oldProps, oldState) {
  }

  handleResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const [cellWidth, cellsCountEachRow, cellsCountEachCol] = this.calculateGridSize()
    this.setState({
      width,
      height,
      cellWidth,
      matrix: this.createMatrix(cellsCountEachCol, cellsCountEachRow)
    })
    console.log(this.state)
  }

  calculateGridSize = () => {
    const width = window.innerWidth
    const height = window.innerHeight - HEADER_HEIGHT
    console.log(width, height)
    const matrixSideCount = Math.round(Math.sqrt(DEFAULT_MATRIX_SIZE))
    const matrixWidth = Math.min(width, height)
    const cellWidth = matrixWidth / matrixSideCount
    return [cellWidth, matrixWidth, matrixSideCount, matrixSideCount]
  }

  createMatrix = (rowCount, colCount) => {
    return Array.from({ length: rowCount }, () => Array(colCount).fill(new Node()))
  }

  onAlgoChange = (algo) => {
    this.setState({ algo })
  }

  onRunClick = () => {
    this.setState({ isRunning: !this.state.isRunning })
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
        console.error('Something went wrong!')
    }
    await pathfindingFunc(this.state.matrix, [0, 0], [0, 0])
  }

  render () {
    const panelStyle = {
      position: 'fixed',
      inset: `${HEADER_HEIGHT}px 0 0 0`,
      height: `${this.state.height - HEADER_HEIGHT}px)`
    }
    return (
      <>
        <PathfindingHeader height={`${HEADER_HEIGHT}px`}
                           pathFound={this.state.pathFound}
                           onAlgoChange={this.onAlgoChange}
                           onRunClick={this.onRunClick}
                           isRunning={this.state.isRunning} />

        <div style={panelStyle}>
          <Grid height={this.state.height - HEADER_HEIGHT}
                width={this.state.matrixWidth}
                matrix={this.state.matrix}
                cellWidth={this.state.cellWidth} />
        </div>
      </>
    )
  }
}

export default PathfindingVisualizer
