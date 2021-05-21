import Station from '../models/station'

const tidyUpData = (data, result) => {
  for (let each of data) {
    let route = each.station_type
    result[route].push(each)
  }

  for (let key of Object.keys(result)) {
    result[key].sort((a, b) => { return a.station_order - b.station_order })
  }

  return result
}

const calculate = (result, start, end) => {
  let startLine = start[0]
  let endLine = end[0]
  let startInd = parseInt(start.slice(1, start.length)) - 1
  let endInd = parseInt(end.slice(1, end.length)) - 1
  let intersection = result[startLine].filter(s => result[endLine].some(a => a.station_name === s.station_name))[0]
  let intersection_ano = result[endLine].filter(s => result[startLine].some(a => a.station_name === s.station_name))[0]
  let dis = 0

  if (startLine !== endLine && start === intersection) {  // if start from intersection
    startLine = endLine
    startInd = intersection_ano.station_order - 1
  }

  if (startInd > endInd && startLine === endLine) { // check end order > start order
    return -1
  }
  else if (endInd === startInd && startLine === endLine) { // check whether same station
    return 0
  }
  else if (startLine !== endLine && startInd === intersection.station_order - 1 && endInd === intersection_ano.station_order - 1) { // check whether intersection
    return 0
  }
  else if (startLine !== endLine && startInd < intersection.station_order - 1 && endInd < intersection_ano.station_order - 1) { // check invalid route passing through intersection (end with smaller station order)
    return -1
  }
  else if (startLine !== endLine && startInd > intersection.station_order - 1) { // check invalid route passing through intersection (begin beyond intersection)
    return -1
  }
  
  if (startLine === endLine) { // same line (R -> R or G -> G)
    for (let i = startInd; i < endInd; i++) {
      dis += result[startLine][i].distance_to_next
    }
    return dis
  }
  else { // R -> G or G -> R
    for (let i = startInd; i < intersection.station_order - 1; i++) {
      dis += result[startLine][i].distance_to_next
    }

    for (let i = intersection_ano.station_order - 1; i < endInd; i++) {
      dis += result[endLine][i].distance_to_next
    }

    return dis
  }
}

// 1st API
const GetStations = async (req, res) => {
  let data = []
  let result = {}
  let all_types = []

  try {
    data = await Station.find()
    all_types = [...new Set(data.map(e => e.station_type))]
    result = { [all_types[0]]: [], [all_types[1]]: [] }
    result = tidyUpData(data, result)

    if (Object.keys(result).length) {
      res.status(200).send({
        message: 'success',
        data: result
      })
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({
      message: 'error',
      data: []
    })
  }
}

// 2nd API
const CalculateDistance = async (req, res) => {
  let data = []
  let result = {}
  let all_types = []
  let answer = -1

  try {
    const start = req.query.start
    const end = req.query.end

    data = await Station.find()
    all_types = [...new Set(data.map(e => e.station_type))]
    result = { [all_types[0]]: [], [all_types[1]]: [] }

    result = tidyUpData(data, result)
    answer = calculate(result, start, end)

    if (Object.keys(result).length) {
      res.status(200).send({
        message: 'success',
        distance: answer
      })
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({
      message: 'error',
      distance: -1
    })
  }
}

export { GetStations, CalculateDistance }
