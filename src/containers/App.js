import React, { Component } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}, // all MRT station data
      current_station_id: 'None', // station clicked by cursor
      start_station: '', // station selected as the starting one
      end_station: '', // station selected as the ending one
      distance: -2 // distance shown on the screen
    }
  }

  getStations = async () => {
    const res = await instance.get('/getStations')
    this.setState({ data: res.data.data })
  }

  showInfo = (station_id) => {
    this.setState({ current_station_id: station_id })
  }

  calculateDistance = async () => {
    const res = await instance.get(`/calculateDistance?start=${this.state.start_station}&end=${this.state.end_station}`)
    this.setState({ distance: res.data.distance })
  }

  componentDidMount() {
    this.getStations()
  }

  render() {
    const sid = this.state.current_station_id
    const station_type = sid[0] // R10, station_type = R
    const station_order = sid.slice(1, sid.length) // R10, station_order = 10
    let station_info = null // get certain station information

    if (station_type !== 'N') {
      station_info = this.state.data[station_type][parseInt(station_order) - 1]
    }

    if (!Object.keys(this.state.data).length) {
      return (
        <div className="wrapper">
          <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
        </div>
      )
    }

    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
        <div className="calculator-container">
          <div className="mode-selector">
            
            <span id="start-station-span">起始站</span>
            <select id="start-select" className="start-station" onChange={e => this.setState({ start_station: e.target.value })} value={this.state.start_station}>
              <option></option>
              {Object.keys(this.state.data).map((g, gi) => {
                const group = this.state.data[g]

                return (
                  <optgroup label={g} key={g}>
                    {group.map((e, i) => (
                      <option id={`start-group-${e.station_id}`} value={e.station_id} key={e.station_id}>{e.station_name}</option>
                    ))}
                  </optgroup>
                )
              })}
            </select>

            <span id="end-station-span">終點站</span>
            <select id="end-select" className="end-station" onChange={e => this.setState({ end_station: e.target.value })} value={this.state.end_station}>
              <option></option>
              {Object.keys(this.state.data).map((g, gi) => {
                const group = this.state.data[g]

                return (
                  <optgroup label={g} key={g}>
                    {group.map((e, i) => (
                      <option id={`end-group-${e.station_id}`} value={e.station_id} key={e.station_id}>{e.station_name}</option>
                    ))}
                  </optgroup>
                )
              })}
            </select>

            <button onClick={this.calculateDistance} id="search-btn">查詢距離</button>
            <span id="answer" className={this.state.distance === -1 ? 'invalid' : ''}>
              {this.state.distance === -2 ? '' : this.state.distance === -1 ? 'INVALID' : this.state.distance}
            </span>
            <span id="answer-postfix">KM</span>
          </div>

          <div className="route-graph-info-container">
            <RouteGraph route_data={this.state.data[Object.keys(this.state.data)[0]]} showInfo={this.showInfo} />
            <RouteGraph route_data={this.state.data[Object.keys(this.state.data)[1]]} showInfo={this.showInfo} />
            <StationInfo info={station_info} />
          </div>
          
        </div>
      </div>
    )
  }
}

export default App
