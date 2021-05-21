import React, { Component } from 'react'
import Station from './station'

class RouteGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  showInfo = (station_id) => {
    this.props.showInfo(station_id)
  }

  render() {
    const data = this.props.route_data

    return (
      <div className="route-graph-container">
        {data.map((s, i) => (
          <Station datum={s} pos={i} showInfo={this.showInfo} key={s.station_id} />
        ))}
      </div>
    )
  }
}

export default RouteGraph
