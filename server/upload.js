import Station from './models/station'

const alldata = [
  {
    station_id: 'O1',
    station_name: '南勢角',
    station_type: 'O',
    station_order: 1,
    address: '新北市中和區捷運路6號',
    service_counter: '近出口3、4',
    enable_bicycle: '開放',
    distance_to_next: 1
  },
  {
    station_id: 'O2',
    station_name: '景安',
    station_type: 'O',
    station_order: 2,
    address: '新北市中和區景平路486號',
    service_counter: '近出口，1樓大廳層、5樓月臺層',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'O3',
    station_name: '永安市場',
    station_type: 'O',
    station_order: 3,
    address: '新北市中和區中和路388號',
    service_counter: '近出口',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'O4',
    station_name: '頂溪',
    station_type: 'O',
    station_order: 4,
    address: '新北市永和區永和路2段168號B1',
    service_counter: '近出口1',
    enable_bicycle: '開放',
    distance_to_next: 3
  },
  {
    station_id: 'O5',
    station_name: '古亭',
    station_type: 'O',
    station_order: 5,
    address: '臺北市中正區羅斯福路2段164之1號B1',
    service_counter: '近出口1、2、3、4，近出口5、6、7、8、9',
    enable_bicycle: '開放',
    distance_to_next: 9
  },
  {
    station_id: 'O6',
    station_name: '東門',
    station_type: 'O',
    station_order: 6,
    address: '臺北市大安區信義路2段166號B1',
    service_counter: '近出口4、5、6、7、8',
    enable_bicycle: '開放',
    distance_to_next: 9
  },
  {
    station_id: 'O7',
    station_name: '忠孝新生',
    station_type: 'O',
    station_order: 7,
    address: '臺北市大安區新生南路1段67號',
    service_counter: '近出口1、2，近出口5、7',
    enable_bicycle: '不開放',
    distance_to_next: 8
  },
  {
    station_id: 'O8',
    station_name: '松江南京',
    station_type: 'O',
    station_order: 8,
    address: '臺北市中山區松江路126號B1',
    service_counter: '近出口1，近出口2、3',
    enable_bicycle: '開放',
    distance_to_next: 7
  },
  {
    station_id: 'O9',
    station_name: '行天宮',
    station_type: 'O',
    station_order: 9,
    address: '臺北市中山區松江路316號B1',
    service_counter: '近出口1、2',
    enable_bicycle: '開放',
    distance_to_next: 5
  },
  {
    station_id: 'O10',
    station_name: '中山國小',
    station_type: 'O',
    station_order: 10,
    address: '臺北市中山區民權東路1段71號B1',
    service_counter: '近出口1、4',
    enable_bicycle: '開放',
    distance_to_next: 7
  },
  {
    station_id: 'O11',
    station_name: '民權西路',
    station_type: 'O',
    station_order: 11,
    address: '臺北市大同區民權西路72號',
    service_counter: '近出口1、7、8、9、10',
    enable_bicycle: '開放',
    distance_to_next: -1
  },
  {
    station_id: 'B1',
    station_name: '亞東醫院',
    station_type: 'B',
    station_order: 1,
    address: '新北市板橋區南雅南路2段17號B1',
    service_counter: '近出口1、2',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'B2',
    station_name: '府中',
    station_type: 'B',
    station_order: 2,
    address: '新北市板橋區縣民大道1段193號B1',
    service_counter: '近出口1',
    enable_bicycle: '開放',
    distance_to_next: 3
  },
  {
    station_id: 'B3',
    station_name: '板橋',
    station_type: 'B',
    station_order: 3,
    address: '新北市板橋區站前路5號B1',
    service_counter: '近出口3',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'B4',
    station_name: '新埔',
    station_type: 'B',
    station_order: 4,
    address: '新北市板橋區民生路3段2號B1',
    service_counter: '近出口4',
    enable_bicycle: '開放',
    distance_to_next: 8
  },
  {
    station_id: 'B5',
    station_name: '江子翠',
    station_type: 'B',
    station_order: 5,
    address: '新北市板橋區文化路2段296號B1',
    service_counter: '近出口1、2',
    enable_bicycle: '開放',
    distance_to_next: 6
  },
  {
    station_id: 'B6',
    station_name: '龍山寺',
    station_type: 'B',
    station_order: 6,
    address: '臺北市萬華區西園路1段153號',
    service_counter: '近出口2',
    enable_bicycle: '開放',
    distance_to_next: 5
  },
  {
    station_id: 'B7',
    station_name: '西門',
    station_type: 'B',
    station_order: 7,
    address: '臺北市中正區寶慶路32之1號B1',
    service_counter: '近出口1、6',
    enable_bicycle: '開放',
    distance_to_next: 2
  },
  {
    station_id: 'B8',
    station_name: '台北車站',
    station_type: 'B',
    station_order: 8,
    address: '臺北市中正區忠孝西路1段49號',
    service_counter: '近出口M3、M7、M8，近忠孝西路',
    enable_bicycle: '不開放',
    distance_to_next: 2
  },
  {
    station_id: 'B9',
    station_name: '善導寺',
    station_type: 'B',
    station_order: 9,
    address: '臺北市中正區忠孝東路1段58號B1',
    service_counter: '近出口1、2、3',
    enable_bicycle: '開放',
    distance_to_next: 3
  },
  {
    station_id: 'B10',
    station_name: '忠孝新生',
    station_type: 'B',
    station_order: 10,
    address: '臺北市大安區新生南路1段67號',
    service_counter: '近出口1、2、5、7',
    enable_bicycle: '不開放',
    distance_to_next: 7
  },
  {
    station_id: 'B11',
    station_name: '忠孝復興',
    station_type: 'B',
    station_order: 10,
    address: '臺北市大安區忠孝東路4段47號',
    service_counter: '近出口1、2',
    enable_bicycle: '不開放',
    distance_to_next: -1
  }
]

const dataInit = async () => {
  const checkData = await Station.find()
  if (checkData.length !== 22) {
    await Station.remove({})
    await Station.insertMany(alldata)
  }
}

export { dataInit }
