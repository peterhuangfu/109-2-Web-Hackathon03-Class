import React, { Component } from 'react'

class Station extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const datum = this.props.datum
    const color = datum.station_type === 'G' ? 'green' : datum.station_type === 'R' ? 'red' : datum.station_type === 'O' ? 'orange' : 'blue'
    const pos = this.props.pos === 0 || datum.distance_to_next === -1 ? 'end' : 'mid'
    
    return (
      <div className="station-line-container">
        <div id={`s-${datum.station_id}`} className="station-and-name" onClick={() => this.props.showInfo(datum.station_id)}>
          <div className={`station-rectangle ${color} ${pos}`}>{datum.station_id}</div>
          <div className="station-name">{datum.station_name}</div>
        </div>
        {datum.distance_to_next === -1 ?
          <div></div> :
          <div id={`l-${datum.station_id}`} className={`line ${color}`}></div>
        }
      </div>
    )
  }
}

export default Station
