import { bubbleSort, insertionSort, mergeSort, selectionSort } from '../src/pages/sorting/sort.js'

const generateArray = (size) => Array.from(Array(size).keys(), (key) => key + 1)

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

const mockGetSleepTime = () => 0
const mockSetArr = (_) => {}
const mockSetColorMapping = (_) => {}
const mockCheckIsStopped = () => false

describe('Test bubble sort', () => {
  it('should sort an array of numbers', async () => {
    var arr = shuffleArray(generateArray(100))
    const expectedArr = [...arr].sort((a, b) => a - b)
    await bubbleSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual(expectedArr)
  })

  it('should handle an already sorted array', async () => {
    var arr = [1, 2, 3, 4, 5]
    await bubbleSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle an empty array', () => {
    var arr = []
    bubbleSort([], mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([])
  })
})

describe('Test insertion sort', () => {
  it('should sort an array of numbers', async () => {
    var arr = shuffleArray(generateArray(100))
    const expectedArr = [...arr].sort((a, b) => a - b)
    await insertionSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual(expectedArr)
  })

  it('should handle an already sorted array', async () => {
    var arr = [1, 2, 3, 4, 5]
    await insertionSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle an empty array', () => {
    var arr = []
    insertionSort([], mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([])
  })
})

describe('Test selection sort', () => {
  it('should sort an array of numbers', async () => {
    var arr = shuffleArray(generateArray(100))
    const expectedArr = [...arr].sort((a, b) => a - b)
    await selectionSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual(expectedArr)
  })

  it('should handle an already sorted array', async () => {
    var arr = [1, 2, 3, 4, 5]
    await selectionSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle an empty array', () => {
    var arr = []
    selectionSort([], mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([])
  })
})

describe('Test merge sort', () => {
  it('should sort an array of numbers', async () => {
    var arr = shuffleArray(generateArray(100))
    const expectedArr = [...arr].sort((a, b) => a - b)
    await mergeSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual(expectedArr)
  })

  it('should handle an already sorted array', async () => {
    var arr = [1, 2, 3, 4, 5]
    await mergeSort(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle an empty array', () => {
    var arr = []
    mergeSort([], mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
    expect(arr).toEqual([])
  })
})
