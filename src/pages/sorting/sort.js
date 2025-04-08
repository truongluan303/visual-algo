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

  for (let i = 0; i < tmp.length; i++) {
    arr[lidx + i] = tmp[i]
    setColorMapping({ ...colorMap, [lidx + i]: 'var(--yellow)', [tmpIdxToArrIdx[i]]: 'purple' })
    setArr(arr)
    await sleep(getSleepTime())
    if (checkIsStopped()) {
      setColorMapping({})
      return
    }
  }

  setColorMapping({})
}

export { bubbleSort, insertionSort, mergeSort, selectionSort }
