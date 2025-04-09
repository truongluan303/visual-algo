import { Queue, PriorityQueue } from '../src/lib/ds'

describe('Test queue', () => {
  let queue

  beforeEach(() => {
    queue = new Queue()
  })

  test('enqueue adds items to the queue', () => {
    queue.enqueue('a')
    queue.enqueue('b')
    expect(queue.peek()).toBe('a')
    expect(queue.size()).toBe(2)
  })

  test('dequeue removes and returns the first item', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
  })

  test('dequeue on empty queue returns undefined', () => {
    expect(queue.dequeue()).toBeUndefined()
  })

  test('peek returns the first item without removing it', () => {
    queue.enqueue('first')
    expect(queue.peek()).toBe('first')
    expect(queue.size()).toBe(1)
  })

  test('isEmpty returns true for empty queue', () => {
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue(5)
    expect(queue.isEmpty()).toBe(false)
  })

  test('size returns correct count', () => {
    expect(queue.size()).toBe(0)
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.size()).toBe(2)
    queue.dequeue()
    expect(queue.size()).toBe(1)
  })
})

describe('Test priority queue', () => {
  test('min-heap: items with lower priority come out first', () => {
    const pq = new PriorityQueue({ isMin: true })
    pq.enqueue('task1', 5)
    pq.enqueue('task2', 1)
    pq.enqueue('task3', 3)

    expect(pq.dequeue()).toBe('task2') // priority 1
    expect(pq.dequeue()).toBe('task3') // priority 3
    expect(pq.dequeue()).toBe('task1') // priority 5
  })

  test('max-heap: items with higher priority come out first', () => {
    const pq = new PriorityQueue({ isMin: false })
    pq.enqueue('taskA', 2)
    pq.enqueue('taskB', 7)
    pq.enqueue('taskC', 4)

    expect(pq.dequeue()).toBe('taskB') // priority 7
    expect(pq.dequeue()).toBe('taskC') // priority 4
    expect(pq.dequeue()).toBe('taskA') // priority 2
  })

  test('FIFO preserved when priorities are the same', () => {
    const pq = new PriorityQueue({ isMin: true })

    pq.enqueue('first', 10)
    pq.enqueue('second', 10)
    pq.enqueue('third', 10)
    expect(pq.dequeue()).toBe('first')
    expect(pq.dequeue()).toBe('second')
    expect(pq.dequeue()).toBe('third')

    pq.enqueue(5, 30)
    pq.enqueue(2, 20)
    pq.enqueue(3, 20)
    pq.enqueue(1, 10)
    pq.enqueue(6, 30)
    pq.enqueue(4, 20)
    expect(pq.size()).toBe(6)
    expect(pq.dequeue()).toBe(1)
    expect(pq.dequeue()).toBe(2)
    expect(pq.dequeue()).toBe(3)
    expect(pq.dequeue()).toBe(4)
    expect(pq.dequeue()).toBe(5)
    expect(pq.dequeue()).toBe(6)
  })

  test('peek returns correct item without removing it', () => {
    const pq = new PriorityQueue({ isMin: true })
    pq.enqueue('first', 2)
    pq.enqueue('second', 1)

    expect(pq.peek()).toBe('second') // priority 1
    expect(pq.size()).toBe(2)
  })

  test('isEmpty and size work correctly', () => {
    const pq = new PriorityQueue({ isMin: true })
    expect(pq.isEmpty()).toBe(true)
    pq.enqueue('only', 1)
    expect(pq.isEmpty()).toBe(false)
    expect(pq.size()).toBe(1)
    pq.dequeue()
    expect(pq.isEmpty()).toBe(true)
  })
})
