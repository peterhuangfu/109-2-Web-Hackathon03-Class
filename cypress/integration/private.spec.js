// MONGO_URL = 'mongodb+srv://huangfu:r980213r@actuaviz.tjvam.gcp.mongodb.net/hackathon3private?retryWrites=true&w=majority'
describe('Hackathon 3 Private Test', () => {
  it('1 (5%)', () => {
    cy.visit({ url: 'localhost:4000', failOnStatusCode: false })
  })
  it('2 (5%)', () => {
    cy.request('localhost:4000/api/getStations')
    .then((response) => {
      expect(response.status).to.not.equal(404)
    })
  })
  it('3 (20%)', () => {
    cy.request('localhost:4000/api/getStations')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.have.property('O')
      expect(response.body.data).to.have.property('B')
      expect(response.body.data.O).to.have.length(11)
      expect(response.body.data.B).to.have.length(11)
    })
  })
  it('4-1 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#s-O8 .station-rectangle').should('contain', 'O8')
    cy.get('#s-O8 .station-name').should('contain', '松江南京')
    cy.get('#s-O4 .station-rectangle').should('contain', 'O4')
    cy.get('#s-O4 .station-name').should('contain', '頂溪')
    cy.get('#s-B6 .station-rectangle').should('contain', 'B6')
    cy.get('#s-B6 .station-name').should('contain', '龍山寺')
    cy.get('#s-B9 .station-rectangle').should('contain', 'B9')
    cy.get('#s-B9 .station-name').should('contain', '善導寺')
    
  })
  it('4-2 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#s-O5 .station-rectangle').should('have.css', 'border', '5px solid rgb(255, 143, 14)')
    cy.get('#s-O5 .station-rectangle').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    // cy.get('#l-O3').should('have.css', 'background-color', 'rgb(255, 143, 14)')
    cy.get('#s-B2 .station-rectangle').should('have.css', 'border', '5px solid rgb(33, 67, 105)')
    cy.get('#s-B2 .station-rectangle').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    // cy.get('#l-B8').should('have.css', 'background-color', 'rgb(33, 67, 105)')
  })
  it('4-3 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#s-O1 .station-rectangle').should('have.css', 'border', '5px solid rgb(255, 143, 14)')
    cy.get('#s-O1 .station-rectangle').should('have.css', 'background-color', 'rgb(255, 143, 14)')
    cy.get('#s-B11 .station-rectangle').should('have.css', 'border', '5px solid rgb(33, 67, 105)')
    cy.get('#s-B11 .station-rectangle').should('have.css', 'background-color', 'rgb(33, 67, 105)')    
  })
  it('4-4 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#l-O11').should('not.exist')
    cy.get('#l-B11').should('not.exist')
  })
  it('5 (15%)', ()=>{
    cy.visit('localhost:3000')
    cy.get('#s-O8').click()
    cy.get('#table-station_name-label').should('contain', '車站名稱')
    cy.get('#table-address-label').should('contain', '車站位址')
    cy.get('#table-service_counter-label').should('contain', '詢問處位置')
    cy.get('#table-enable_bicycle-label').should('contain', '自行車進出')

    cy.get('#table-station_name-value').should('contain', '松江南京')
    cy.get('#table-address-value').should('contain', '臺北市中山區松江路126號B1')
    cy.get('#table-service_counter-value').should('contain', '近出口1，近出口2、3')
    cy.get('#table-enable_bicycle-value').should('contain', '開放')

    cy.get('#s-B5').click()
    cy.get('#table-station_name-value').should('contain', '江子翠')
    cy.get('#table-address-value').should('contain', '新北市板橋區文化路2段296號B1')
    cy.get('#table-service_counter-value').should('contain', '近出口1、2')
    cy.get('#table-enable_bicycle-value').should('contain', '開放')
  })
  it('6 (15%)', () => {
    cy.visit('localhost:3000')
    cy.get('#start-select').find('optgroup').should('have.length', 2)
    cy.get('#start-group-O1').should('exist')
    cy.get('#start-group-O11').should('exist')
    cy.get('#start-group-O6').should('exist')
    cy.get('#start-group-B3').should('exist')
    cy.get('#start-group-B1').should('exist')
    cy.get('#start-group-B11').should('exist')

    cy.get('#end-select').find('optgroup').should('have.length', 2)
    cy.get('#end-group-O1').should('exist')
    cy.get('#end-group-O11').should('exist')
    cy.get('#end-group-O9').should('exist')
    cy.get('#end-group-B5').should('exist')
    cy.get('#end-group-B1').should('exist')
    cy.get('#end-group-B11').should('exist')
  })
  it('7-1 (5%)', () => {
    cy.request('localhost:4000/api/calculateDistance?start=O1&end=B1')
    .then((response) => {
      expect(response.status).to.not.equal(404)
    })
  })
  it('7-2 (10%)', () => {
    cy.request('localhost:4000/api/calculateDistance?start=B6&end=O9')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('distance')
      expect(response.body.distance).to.eq(27)
    })

    cy.request('localhost:4000/api/calculateDistance?start=O4&end=B11')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('distance')
      expect(response.body.distance).to.eq(28)
    })

    cy.request('localhost:4000/api/calculateDistance?start=B11&end=O3')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('distance')
      expect(response.body.distance).to.eq(-1)
    })
  })
  it('7-3 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#answer').should('contain', '')

    cy.get('#start-select').select('江子翠')
    cy.get('#end-select').select('行天宮')
    cy.get('#search-btn').click()
    cy.get('#answer').should('contain', '33' || 33)

    cy.get('#start-select').select('古亭')
    cy.get('#end-select').select('忠孝復興')
    cy.get('#search-btn').click()
    cy.get('#answer').should('contain', '25' || 25)

    cy.get('#start-select').select('東門')
    cy.get('#end-select').select('府中')
    cy.get('#search-btn').click()
    cy.get('#answer').should('contain', 'INVALID')
  })
})
