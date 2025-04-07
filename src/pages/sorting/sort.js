import { sleep } from '../../lib/utils'

function swap (arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

async function bubbleSort (arr, sleeptime, setArr, setColorMapping, checkIsStopped) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j] < arr[j - 1]) {
        const k = j - 1
        swap(arr, k, j)
        setColorMapping({ [j]: 'var(--yellow)', [k]: 'purple' })
        setArr(arr)
        await sleep(sleeptime)
      }
      if (checkIsStopped()) {
        return
      }
    }
  }
}

async function selectionSort (arr, sleeptime, setArr, setColorMapping, checkIsStopped) {
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
      await sleep(sleeptime)
    }
    if (checkIsStopped()) {
      return
    }
  }
}

async function insertionSort (arr, sleeptime, setArr, setColorMapping, checkIsStopped) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      arr[j] = key
      j--
      setColorMapping({ [i]: 'var(--yellow)', [j]: 'purple', [j + 1]: 'red' })
      setArr(arr)
      await sleep(sleeptime)

      if (checkIsStopped()) {
        return
      }
    }
    arr[j + 1] = key
  }
}

async function mergeSort (arr, sleeptime, setArr, setColorMapping, checkIsStopped) {
  await mergeSortRec(arr, 0, arr.length - 1, sleeptime, setArr, setColorMapping, checkIsStopped)
}

async function mergeSortRec (arr, lidx, ridx, sleeptime, setArr, setColorMapping, checkIsStopped) {
  if (lidx === ridx) {
    return
  }
  const mid = Math.floor((ridx + lidx) / 2)
  await mergeSortRec(arr, lidx, mid, sleeptime, setArr, setColorMapping, checkIsStopped)
  await mergeSortRec(arr, mid, ridx, sleeptime, setArr, setColorMapping, checkIsStopped)

  let l = lidx
  let r = mid + 1
  const tmp = []

  while (l <= mid && r <= ridx) {
    if (arr[l] < arr[r]) {
      tmp.push(arr[l])
      l++
    } else {
      tmp.push(arr[r])
      r++
    }
    await sleep(sleeptime)
    if (checkIsStopped()) {
      return
    }
  }

  while (l <= mid) {
    tmp.push(arr[l])
    l++
    await sleep(sleeptime)
    if (checkIsStopped()) {
      return
    }
  }

  while (r <= ridx) {
    tmp.push(arr[r])
    r++
    await sleep(sleeptime)
    if (checkIsStopped()) {
      return
    }
  }

  for (let i = 0; i < tmp.length; i++) {
    arr[lidx + i] = tmp[i]
    await sleep(sleeptime)
    if (checkIsStopped()) {
      return
    }
  }
}

export { bubbleSort, insertionSort, mergeSort, selectionSort }
