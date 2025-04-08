import React from 'react'
import SortingHeader from './Header'
import Bar from './Bar'
import Popup from 'components/Popup'
import { bubbleSort, insertionSort, mergeSort, selectionSort } from 'pages/sorting/sort'
import { sleep, getRandomInt } from 'lib/utils'

import './SortingVisualizer.css'
import SORT_OPTIONS from '../sortOptions'

const HEADER_HEIGHT = 70
const DEFAULT_ARR_SIZE = 50
const DEFAULT_SPEED = 5

class SortingVisualizer extends React.Component {
  constructor () {
    super()
    this.state = {
      arrSize: DEFAULT_ARR_SIZE,
      arr: this.createArr(DEFAULT_ARR_SIZE),
      arrColorMapping: {},
      speed: DEFAULT_SPEED,
      arrSorted: false,
      isRunning: false,
      algo: SORT_OPTIONS[0].value,
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
    if (oldState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.runSort()
      }
    }

    // Upon array size change, generate a new array
    if (oldState.arrSize !== this.state.arrSize) {
      this.handleShuffle()
    }
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  createArr = (size) => {
    const arr = Array.from(Array(size).keys(), (key) => key + 1)
    arr.sort(() => Math.random() - 0.5)
    return arr
  }

  handleShuffle = () => {
    const newarr = this.createArr(this.state.arrSize)
    this.setState({ arr: newarr, arrSorted: false, arrColorMapping: {} })
  }

  calculateSleepTime = () => {
    return ((25 - this.state.speed) * 10000 / Math.pow(this.state.arrSize, 2))
  }

  runSort = async () => {
    const setArr = arr => this.setState({ arr })
    const setColorMapping = colorMap => this.setState({ arrColorMapping: colorMap })
    const isStopped = () => !this.state.isRunning
    const createFinishEffect = async () => {
      const colorMap = {}
      const sleeptime = this.calculateSleepTime() / 3
      for (let i = 0; i < this.state.arrSize; i++) {
        colorMap[i] = 'var(--green)'
        this.setState({ arrColorMapping: colorMap })
        await sleep(sleeptime)
      }
    }
    let sortFunc
    switch (this.state.algo) {
      case 'bubble':
        sortFunc = bubbleSort
        break
      case 'insertion':
        sortFunc = insertionSort
        break
      case 'merge':
        sortFunc = mergeSort
        break
      case 'selection':
        sortFunc = selectionSort
        break
      default:
        console.error('Something went wrong!')
    }
    await sortFunc(this.state.arr, this.calculateSleepTime, setArr, setColorMapping, isStopped)

    // Create finishing effect if the array was completely sorted
    if (this.state.arr.every((value, idx, array) => idx === 0 || value >= array[idx - 1])) {
      await createFinishEffect()
      this.setState({ arrSorted: true })
    }
    this.setState({ isRunning: false })
  }

  render () {
    const TOP_PADDING = 30
    const RIGHT_PADDING = this.state.width * 3 / 100
    const BOTTOM_PADDING = 20
    const LEFT_PADDING = RIGHT_PADDING
    const HEIGHT_OFFSET = TOP_PADDING + BOTTOM_PADDING
    const WIDTH_OFFSET = RIGHT_PADDING + LEFT_PADDING

    const sortingPanelHeight = this.state.height - HEADER_HEIGHT
    const panelStyle = {
      inset: `${HEADER_HEIGHT}px 0 0 0`,
      height: `${sortingPanelHeight}px)`,
      padding: `${TOP_PADDING}px ${RIGHT_PADDING}px ${BOTTOM_PADDING}px ${LEFT_PADDING}px`
    }
    const barWidth = (this.state.width - WIDTH_OFFSET) / this.state.arrSize
    const barHeight = (val) => ((sortingPanelHeight - HEIGHT_OFFSET) * val) / this.state.arrSize
    return (
      <div>
        <Popup title="⚠️ Screen Too Small"
               message="This visualization works best on larger screens. For the best experience, consider resizing the windows or change device!"
               breakpoint={750}
               autoShowOnSmallScreen={true} />
        <SortingHeader height={`${HEADER_HEIGHT}px`}
                       isRunning={this.state.isRunning}
                       sorted={this.state.arrSorted}
                       onAlgoChange={(algo) => this.setState({ algo })}
                       arraySize={this.state.arrSize}
                       onSizeChange={(e) => this.setState({ arrSize: Number(e.target.value) })}
                       speed={this.state.speed}
                       onSpeedChange={(e) => this.setState({ speed: Number(e.target.value) })}
                       onShuffleClick={this.handleShuffle}
                       onRunClick={() => this.setState({ isRunning: !this.state.isRunning })} />

        <div id="sorting-visualizing-panel"
             style={panelStyle}>
            {this.state.arr.map((val, idx) => <Bar key={`${val}-${getRandomInt(0, 1000000)}`}
                                                   width={barWidth}
                                                   height={barHeight(val)}
                                                   color={this.state.arrColorMapping[idx]}/>)}
        </div>
      </div>
    )
  }
};

export default SortingVisualizer
