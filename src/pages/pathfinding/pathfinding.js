import { Queue, PriorityQueue } from 'lib/ds'
import { sleep } from 'lib/utils'
import { CellState } from './components/Grid'

function createNeighborsMap (colsNum, rowsNum, cellsMap) {
  const result = {}

  for (let c = 0; c < colsNum; c++) {
    for (let r = 0; r < rowsNum; r++) {
      const neighbors = []
      // Up
      if (r > 0 && cellsMap[[c, r - 1]] !== CellState.OBSTACLE) {
        neighbors.push([c, r - 1])
      }
      // Right
      if (c + 1 < colsNum && cellsMap[[c + 1, r]] !== CellState.OBSTACLE) {
        neighbors.push([c + 1, r])
      }
      // Down
      if (r + 1 < rowsNum && cellsMap[[c, r + 1]] !== CellState.OBSTACLE) {
        neighbors.push([c, r + 1])
      }
      // Left
      if (c > 0 && cellsMap[[c - 1, r]] !== CellState.OBSTACLE) {
        neighbors.push([c - 1, r])
      }

      result[[c, r]] = neighbors
    }
  }
  return result
}

function isSameCoor (a, b) {
  return a[0] === b[0] && a[1] === b[1]
}

function coorKey (coor) {
  return `${coor[0]},${coor[1]}` // only for internal safe tracking
}

async function backTrack (
  startCoor, // Coordinate of the start cell (array format [column, row])
  endCoor, // Coordinate of the target cell (array format [column, row])
  nodeParents, // Map a node to its "parent"
  cellsState, // Map of cells state
  setCellsState, // Function to set the map of cells state
  getSleepTime, // Function to get sleep time
  checkStop // Function to check if stop
) {
  const path = [endCoor]
  let backtrackNode = endCoor
  while (!isSameCoor(backtrackNode, startCoor)) {
    const backtrackKey = coorKey(backtrackNode)
    backtrackNode = nodeParents[backtrackKey]
    path.push(backtrackNode)

    cellsState = { ...cellsState, [backtrackNode]: CellState.FINALPATH }
    setCellsState(cellsState)
    await sleep(getSleepTime() / 3)
    if (checkStop()) {
      return null
    }
  }
  return path
}

/**
  * Run breadth-first search and update cells state for UI display
 *
 * @param {number} colsNum Number of columns in grid
 * @param {number} rowsNum Number of rows in grid
 * @param {Array<number>} startCoor Coordinate of the start cell (array format [column, row])
 * @param {Array<number>} endCoor Coordinate of the end cell (array format [column, row])
 * @param {object} cellsState Map of cells state
 * @param {function} setCellsState Function to set the map of cells state
 * @param {function} getSleepTime Function to get sleep time
 * @param {function} checkStop Function to check if stop
 *
 * @returns Array of cells to get from start cell to end cell, or null if no path found
 */
async function bfs (
  colsNum,
  rowsNum,
  startCoor,
  endCoor,
  cellsState,
  setCellsState,
  getSleepTime,
  checkStop
) {
  const neighbors = createNeighborsMap(colsNum, rowsNum, cellsState)
  const nodeParents = {}
  let foundEndpoint = false

  const queue = new Queue()
  queue.enqueue(startCoor)
  const visitedSet = new Set()

  while (!queue.isEmpty()) {
    const node = queue.dequeue()
    if (isSameCoor(node, endCoor)) {
      foundEndpoint = true
      break
    }

    const nodeKey = coorKey(node)
    visitedSet.add(nodeKey)
    if (!isSameCoor(node, startCoor)) {
      cellsState = { ...cellsState, [node]: CellState.VISITED }
      setCellsState(cellsState)
      await sleep(getSleepTime())
      if (checkStop()) {
        return null
      }
    }

    const nodeNeighbors = neighbors[node] || []

    for (const neighbor of nodeNeighbors) {
      const neighborKey = coorKey(neighbor)

      if (visitedSet.has(neighborKey) ||
          cellsState[neighbor] === CellState.QUEUED ||
          cellsState[neighbor] === CellState.VISITED ||
          cellsState[neighbor] === CellState.STARTPOINT) {
        continue
      }

      queue.enqueue(neighbor)
      visitedSet.add(neighborKey)
      nodeParents[neighborKey] = node
      cellsState = { ...cellsState, [neighbor]: CellState.QUEUED }
      setCellsState(cellsState)
      await sleep(getSleepTime())
      if (checkStop()) {
        return null
      }
    }
  }

  if (!foundEndpoint) {
    return null
  }
  return await backTrack(
    startCoor, endCoor, nodeParents, cellsState, setCellsState, getSleepTime, checkStop
  )
}

/**
  * Run depth-first search and update cells state for UI display
 *
 * @param {number} colsNum Number of columns in grid
 * @param {number} rowsNum Number of rows in grid
 * @param {Array<number>} startCoor Coordinate of the start cell (array format [column, row])
 * @param {Array<number>} endCoor Coordinate of the end cell (array format [column, row])
 * @param {object} cellsState Map of cells state
 * @param {function} setCellsState Function to set the map of cells state
 * @param {function} getSleepTime Function to get sleep time
 * @param {function} checkStop Function to check if stop
 *
 * @returns Array of cells to get from start cell to end cell, or null if no path found
 */
async function dfs (
  colsNum,
  rowsNum,
  startCoor,
  endCoor,
  cellsState,
  setCellsState,
  getSleepTime,
  checkStop
) {
  const neighbors = createNeighborsMap(colsNum, rowsNum, cellsState)
  const nodeParents = {}
  let foundEndpoint = false

  const stack = []
  stack.push(startCoor)
  const visitedSet = new Set()

  while (stack.length > 0) {
    const node = stack.pop()
    if (isSameCoor(node, endCoor)) {
      foundEndpoint = true
      break
    }

    const nodeKey = coorKey(node)
    visitedSet.add(nodeKey)

    if (!isSameCoor(node, startCoor)) {
      cellsState = { ...cellsState, [node]: CellState.VISITED }
      setCellsState(cellsState)
      await sleep(getSleepTime())
      if (checkStop()) {
        return null
      }
    }

    const nodeNeighbors = neighbors[node] || []

    for (const neighbor of nodeNeighbors) {
      const neighborKey = coorKey(neighbor)

      if (visitedSet.has(neighborKey) ||
          cellsState[neighbor] === CellState.QUEUED ||
          cellsState[neighbor] === CellState.VISITED ||
          cellsState[neighbor] === CellState.STARTPOINT) {
        continue
      }

      stack.push(neighbor)
      visitedSet.add(neighborKey)
      nodeParents[neighborKey] = node
      cellsState = { ...cellsState, [neighbor]: CellState.QUEUED }
      setCellsState(cellsState)
      await sleep(getSleepTime())
      if (checkStop()) {
        return null
      }
    }
  }

  if (!foundEndpoint) {
    return null
  }
  return await backTrack(
    startCoor, endCoor, nodeParents, cellsState, setCellsState, getSleepTime, checkStop
  )
}

async function dijkstra (colsNum, rowsNum, startCoor, endCoor, cellsMap, checkStop) {
}

/**
  * Run A* algorithm and update cells state for UI display
 *
 * @param {number} colsNum Number of columns in grid
 * @param {number} rowsNum Number of rows in grid
 * @param {Array<number>} startCoor Coordinate of the start cell (array format [column, row])
 * @param {Array<number>} endCoor Coordinate of the end cell (array format [column, row])
 * @param {object} cellsState Map of cells state
 * @param {function} setCellsState Function to set the map of cells state
 * @param {function} getSleepTime Function to get sleep time
 * @param {function} checkStop Function to check if stop
 *
 * @returns Array of cells to get from start cell to end cell, or null if no path found
 */
async function astar (
  colsNum,
  rowsNum,
  startCoor,
  endCoor,
  cellsState,
  setCellsState,
  getSleepTime,
  checkStop
) {
  const calcHeuristic = (col, row) => {
    const endCol = endCoor[0]
    const endRow = endCoor[1]
    return Math.abs(col - endCol) + Math.abs(row - endRow)
  }
  // g cost map: Maps distance from each node to the starting block
  // h cost (heuristic) map: Maps distance from each node to the end block
  // f cost (which is our priority) map: g cost + h cost for each node
  const gCost = {}
  const hCost = {}
  const fCost = {}
  for (let c = 0; c < colsNum; c++) {
    for (let r = 0; r < rowsNum; r++) {
      gCost[coorKey([c, r])] = Number.POSITIVE_INFINITY
      hCost[coorKey([c, r])] = calcHeuristic(c, r)
      fCost[coorKey([c, r])] = gCost[coorKey([c, r])] + hCost[coorKey([c, r])]
    }
  }
  gCost[coorKey(startCoor)] = 0

  const neighbors = createNeighborsMap(colsNum, rowsNum, cellsState)
  const nodeParents = {}
  const visitedSet = new Set()
  let foundEndpoint = false

  const pq = new PriorityQueue({ isMin: true })
  pq.enqueue(startCoor, fCost[coorKey(startCoor)])

  while (!pq.isEmpty()) {
    const node = pq.dequeue()

    if (isSameCoor(node, endCoor)) {
      foundEndpoint = true
      break
    }
    const nodeKey = coorKey(node)
    visitedSet.add(nodeKey)

    if (!isSameCoor(node, startCoor)) {
      cellsState = { ...cellsState, [node]: CellState.VISITED }
      setCellsState(cellsState)
      await sleep(getSleepTime())
      if (checkStop()) {
        return null
      }
    }

    const nodeNeighbors = neighbors[node] || []
    const nodeGCost = gCost[coorKey(node)]

    for (const neighbor of nodeNeighbors) {
      const neighborKey = coorKey(neighbor)
      if (visitedSet.has(neighborKey) ||
          cellsState[neighbor] === CellState.QUEUED ||
          cellsState[neighbor] === CellState.VISITED ||
          cellsState[neighbor] === CellState.STARTPOINT) {
        continue
      }
      const tmpGCost = nodeGCost + 1

      if (tmpGCost < gCost[neighborKey]) {
        gCost[neighborKey] = tmpGCost
        fCost[neighborKey] = tmpGCost + hCost[neighborKey]
        visitedSet.add(neighborKey)
        nodeParents[neighbor] = node
        pq.enqueue(neighbor, fCost[neighborKey])

        cellsState = { ...cellsState, [neighbor]: CellState.QUEUED }
        setCellsState(cellsState)
        await sleep(getSleepTime())
        if (checkStop()) {
          return null
        }
      }
    }
  }

  if (!foundEndpoint) {
    return null
  }
  return await backTrack(
    startCoor, endCoor, nodeParents, cellsState, setCellsState, getSleepTime, checkStop
  )
}

export { bfs, dfs, dijkstra, astar }
