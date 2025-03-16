import React from 'react'
import PropTypes from 'prop-types'
import Cell from 'pages/pathfinding/components/Cell'

import './Grid.css'

class Grid extends React.Component {
  constructor (props) {
    super()
    this.props = props
  }

  render () {
    // const sizeStyling = {
    //   width: `${this.props.cellWidth}px`,
    //   height: `${this.props.cellWidth}px`
    // }
    return (
      <table id="grid" style={{ width: `${this.props.width}px` }}>
        <tbody>
          {this.props.matrix.map((row, rowIndex) => (
            <tr key={rowIndex} className="grid-row">
              {row.map((node, idx) => (
                <th key={`${rowIndex}:${idx}`}>
                  <Cell className="cell"
                        type={node.type}
                        status={node.status} />
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
};

Grid.propTypes = {
  width: PropTypes.number.isRequired,
  matrix: PropTypes.array.isRequired,
  cellWidth: PropTypes.number.isRequired
}

export default Grid
