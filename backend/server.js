const express = require('express')
const { HLTV } = require('hltv')
const axios = require('axios');
const app = express()
const port = 8000


// PGL Major Stockholm 2021 : ID 4866
// Id de la finale
// First step : get events
app.get('/events', (req, res) => {
  HLTV.getEvents({ eventType: "Major" }).then(resfromApi => {
    console.log("Coucou")
    res.send(resfromApi)
  })
  // HLTV.getPastEvents({ startDate: '2020-01-01', endDate: '2022-01-10' }).then(resfromApi => {
  //   console.log("Coucou")
  //   res.send(resfromApi)
  // })
});

// Second step : get matches from event
app.get('/matches', (req, res) => {
  console.log("Coucou", req.query.id)
  HLTV.getResults({ eventIds : [4866]}).then(resfromApi => {
    res.send(resfromApi)
  })
});



app.get('/', (req, res) => {
  res.send('Hello World!');
  // HLTV.getMatches().then((res) => {
  //   console.log("Coucou", res)
  // })
  // HLTV.getEvent({ id: 4866}).then(res => {
  //   console.log("Coucou", res)
  // })
  // HLTV.getResults({ eventIds: [4866] }).then(res => {
  //   console.log("Coucou")
  // })
  // HLTV.getMatches().then((res) => {
  //   console.log("Coucou")
  // })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})