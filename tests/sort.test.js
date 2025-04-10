import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort
} from '../src/pages/sorting/sort.js'

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

// Mocks
const mockGetSleepTime = () => 0
const mockSetArr = (_) => {}
const mockSetColorMapping = (_) => {}
const mockCheckIsStopped = () => false

// Mapping of algorithm name to its function
const sortingAlgorithms = {
  'bubble sort': bubbleSort,
  'insertion sort': insertionSort,
  'selection sort': selectionSort,
  'merge sort': mergeSort,
  'quick sort': quickSort,
  'heap sort': heapSort
}

const runSort = async (sortFn, arr) => {
  await sortFn(arr, mockGetSleepTime, mockSetArr, mockSetColorMapping, mockCheckIsStopped)
}

// Run shared tests
const runCommonSortTests = (sortName, sortFn) => {
  describe(`Test ${sortName}`, () => {
    it('should sort an array of numbers', async () => {
      const arr = shuffleArray(generateArray(100))
      const expectedArr = [...arr].sort((a, b) => a - b)
      await runSort(sortFn, arr)
      expect(arr).toEqual(expectedArr)
    })

    it('should handle an already sorted array', async () => {
      const arr = [1, 2, 3, 4, 5]
      await runSort(sortFn, arr)
      expect(arr).toEqual([1, 2, 3, 4, 5])
    })

    it('should handle an empty array', async () => {
      const arr = []
      await runSort(sortFn, arr)
      expect(arr).toEqual([])
    })
  })
}

// Loop over all algorithms and generate their tests
for (const [name, fn] of Object.entries(sortingAlgorithms)) {
  runCommonSortTests(name, fn)
}
