import { sleep } from '../../lib/utils'

function swap (arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

async function bubbleSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j] < arr[j - 1]) {
        const k = j - 1
        swap(arr, k, j)
        setColorMapping({ [j]: 'var(--yellow)', [k]: 'purple' })
        setArr(arr)
        await sleep(getSleepTime())
      }
      if (checkIsStopped()) {
        setColorMapping({})
        return
      }
    }
  }
}

async function selectionSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      swap(arr, minIdx, i)
      setColorMapping({ [i]: 'var(--yellow)', [minIdx]: 'purple' })
      setArr(arr)
      await sleep(getSleepTime())
    }
    if (checkIsStopped()) {
      setColorMapping({})
      return
    }
  }
}

async function insertionSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      arr[j] = key
      j--
      setColorMapping({ [i]: 'var(--yellow)', [j]: 'purple', [j + 1]: 'red' })
      setArr(arr)
      await sleep(getSleepTime())

      if (checkIsStopped()) {
        setColorMapping({})
        return
      }
    }
    arr[j + 1] = key
  }
}

async function mergeSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  await mergeSortRec(arr, 0, arr.length - 1, getSleepTime, setArr, setColorMapping, checkIsStopped)
}

async function mergeSortRec (arr, lidx, ridx, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  if (lidx >= ridx || checkIsStopped()) {
    setColorMapping({})
    return
  }

  const mid = Math.floor((lidx + ridx) / 2)

  await mergeSortRec(arr, lidx, mid, getSleepTime, setArr, setColorMapping, checkIsStopped)
  await mergeSortRec(arr, mid + 1, ridx, getSleepTime, setArr, setColorMapping, checkIsStopped)

  const colorMap = {}
  for (let i = lidx; i <= ridx; i++) {
    colorMap[i] = 'var(--blue)'
  }
  setColorMapping(colorMap)

  let l = lidx
  let r = mid + 1
  const tmp = []
  const tmpIdxToArrIdx = {}

  while (l <= mid && r <= ridx) {
    if (arr[l] < arr[r]) {
      tmp.push(arr[l])
      tmpIdxToArrIdx[tmp.length - 1] = l
      setColorMapping({ ...colorMap, [l]: 'var(--yellow)' })
      l++
    } else {
      tmp.push(arr[r])
      tmpIdxToArrIdx[tmp.length - 1] = r
      setColorMapping({ ...colorMap, [r]: 'purple' })
      r++
    }
    setArr(arr)
    await sleep(getSleepTime())
    if (checkIsStopped()) {
      setColorMapping({})
      return
    }
  }

  while (l <= mid) {
    tmp.push(arr[l])
    tmpIdxToArrIdx[tmp.length - 1] = l
    setColorMapping({ ...colorMap, [l]: 'var(--yellow)' })
    setArr(arr)
    l++
    await sleep(getSleepTime())
    if (checkIsStopped()) {
      setColorMapping({})
      return
    }
  }

  while (r <= ridx) {
    tmp.push(arr[r])
    tmpIdxToArrIdx[tmp.length - 1] = r
    setColorMapping({ ...colorMap, [r]: 'purple' })
    setArr(arr)
    r++
    await sleep(getSleepTime())
    if (checkIsStopped()) {
      setColorMapping({})
      return
    }
  }

  let stop = false
  for (let i = 0; i < tmp.length; i++) {
    arr[lidx + i] = tmp[i]
    // if the user hits stop when we are putting the tmp array elements into the
    // original array, make sure we finish what we do before breaking out of the
    // loop to avoid messing up the original array
    if (!stop) {
      setColorMapping({ ...colorMap, [lidx + i]: 'var(--yellow)', [tmpIdxToArrIdx[i]]: 'purple' })
      setArr(arr)
      await sleep(getSleepTime())
    }
    if (checkIsStopped()) {
      setColorMapping({})
      stop = true
    }
  }
  if (stop) {
    return
  }
  setColorMapping({})
}

async function quickSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  await quickSortRec(
    arr, 0, arr.length - 1, getSleepTime, setArr, setColorMapping, checkIsStopped
  )
}

async function quickSortRec (
  arr, beginIdx, endIdx, getSleepTime, setArr, setColorMapping, checkIsStopped
) {
  if (beginIdx >= endIdx) {
    return
  }

  const colorMap = {}
  for (let i = beginIdx; i < endIdx; i++) {
    colorMap[i] = 'var(--blue)'
  }

  const pivot = arr[endIdx]
  let j = beginIdx - 1

  for (let i = beginIdx; i < endIdx; i++) {
    if (checkIsStopped()) {
      return
    }
    if (arr[i] < pivot) {
      j++
      const tmp = arr[i]
      arr[i] = arr[j]
      arr[j] = tmp
    }
    setColorMapping({ ...colorMap, [endIdx]: 'red', [i]: 'var(--yellow)', [j]: 'purple' })
    setArr(arr)
    await sleep(getSleepTime())
  }
  arr[endIdx] = arr[j + 1]
  arr[j + 1] = pivot
  const pivotIdx = j + 1
  setArr(arr)

  await quickSortRec(
    arr, pivotIdx + 1, endIdx, getSleepTime, setArr, setColorMapping, checkIsStopped
  )
  await quickSortRec(
    arr, beginIdx, pivotIdx - 1, getSleepTime, setArr, setColorMapping, checkIsStopped
  )
}

async function heapSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    await heapify(arr, arr.length, i, getSleepTime, setArr, setColorMapping, checkIsStopped)
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (checkIsStopped()) {
      return
    }
    const tmp = arr[0]
    arr[0] = arr[i]
    arr[i] = tmp

    setArr(arr)
    setColorMapping({ 0: 'var(--yellow)', [i]: 'purple' })
    await sleep(getSleepTime())
    await heapify(arr, i, 0, getSleepTime, setArr, setColorMapping, checkIsStopped)
  }
}

async function heapify (arr, size, idx, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  if (checkIsStopped()) {
    return
  }
  let maxIdx = idx
  const lidx = idx * 2 + 1
  const ridx = idx * 2 + 2

  if (lidx < size && arr[lidx] > arr[maxIdx]) {
    maxIdx = lidx
  }
  if (ridx < size && arr[ridx] > arr[maxIdx]) {
    maxIdx = ridx
  }

  if (maxIdx !== idx) {
    const tmp = arr[idx]
    arr[idx] = arr[maxIdx]
    arr[maxIdx] = tmp

    setArr(arr)
    setColorMapping({ [idx]: 'var(--yellow)', [maxIdx]: 'purple' })
    await sleep(getSleepTime())
    await heapify(arr, size, maxIdx, getSleepTime, setArr, setColorMapping, checkIsStopped)
  }
}

async function shellSort (arr, getSleepTime, setArr, setColorMapping, checkIsStopped) {
  let interval = arr.length

  while (interval > 0) {
    interval = Math.floor(interval / 2)

    for (let i = interval; i < arr.length; i++) {
      if (checkIsStopped()) {
        return
      }
      let stop = false
      const tmp = arr[i]
      let j

      for (j = i; j >= interval && arr[j - interval] > tmp; j -= interval) {
        if (checkIsStopped()) {
          stop = true
        }
        arr[j] = arr[j - interval]
        if (!stop) {
          setArr(arr)
          setColorMapping({ [i]: 'var(--yellow)', [j]: 'purple' })
          await sleep(getSleepTime())
        }
      }
      arr[j] = tmp
      setArr(arr)
      if (stop) {
        return
      }
    }
  }
}

export { bubbleSort, insertionSort, mergeSort, selectionSort, quickSort, heapSort, shellSort }
