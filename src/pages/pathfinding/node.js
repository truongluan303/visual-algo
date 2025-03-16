const NodeType = Object.freeze({
  empty: 0,
  barrier: 1,
  start: 2,
  end: 3
})

const NodeStatus = Object.freeze({
  none: 0,
  enqueued: 1,
  visited: 2
})

class Node {
  #type
  #status

  constructor (nodetype = NodeType.empty, nodestat = NodeStatus.none) {
    this.#type = nodetype
    this.#status = nodestat
  }

  get type () {
    return this.#type
  }

  set type (newtype) {
    this.#type = newtype
  }

  get status () {
    return this.#status
  }

  set status (newstatus) {
    this.#status = newstatus
  }
}

export { NodeType, NodeStatus, Node }
