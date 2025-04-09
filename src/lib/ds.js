class LNode {
  constructor (val, next, priority) {
    this.val = val
    this.next = next
    this.priority = priority
  }
}

class Queue {
  #head
  #tail
  #size

  constructor () {
    this.#head = null
    this.#tail = null
    this.#size = 0
  }

  enqueue (val) {
    const newnode = new LNode(val, null, null)
    if (this.#size === 0) {
      this.#head = newnode
      this.#tail = newnode
    } else {
      this.#tail.next = newnode
      this.#tail = newnode
    }
    this.#size++
  }

  dequeue () {
    if (this.isEmpty()) return undefined

    const node = this.#head
    this.#head = this.#head.next
    this.#size--
    return node.val
  }

  peek () {
    return this.isEmpty() ? undefined : this.#head.val
  }

  isEmpty () {
    return this.#size === 0 && this.#head === null && this.#tail === null
  }

  size () {
    return this.#size
  }
}

class PriorityQueue {
  #head
  #tail
  #size
  #isMin

  constructor ({ isMin = true } = {}) {
    this.#head = null
    this.#tail = null
    this.#size = 0
    this.#isMin = isMin
  }

  enqueue (val, priority) {
    const newnode = new LNode(val, null, priority)
    if (this.#size === 0) {
      this.#head = newnode
      this.#tail = newnode
    } else {
      if (this.#compare(this.#tail, newnode) || this.#tail.priority === priority) {
        this.#tail.next = newnode
        this.#tail = newnode
      } else if (this.#compare(newnode, this.#head)) {
        newnode.next = this.#head
        this.#head = newnode
      } else {
        let cur = this.#head
        while (
          cur.next !== null && (this.#compare(cur.next, newnode) || cur.next.priority === priority)
        ) {
          cur = cur.next
        }
        const tmp = cur.next
        cur.next = newnode
        newnode.next = tmp
      }
    }
    this.#size++
  }

  dequeue () {
    if (this.#size === 0) return undefined

    const node = this.#head
    this.#head = this.#head.next
    this.#size--
    return node.val
  }

  peek () {
    return this.#size === 0 ? undefined : this.#head.val
  }

  isEmpty () {
    return this.#size === 0
  }

  size () {
    return this.#size
  }

  #compare (node1, node2) {
    if (this.#isMin) {
      return node1.priority < node2.priority
    } else {
      return node1.priority > node2.priority
    }
  }
}

export { Queue, PriorityQueue }
