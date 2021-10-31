const express = require('express')
const { HLTV } = require('hltv')
const axios = require('axios');
const app = express()
const port = 8000


// PGL Major Stockholm 2021 : ID 4866

// First step : get events
app.get('/events', (req, res) => {
  HLTV.getEvents().then(resfromApi => {
    console.log("Coucou", res)
    res.send(resfromApi)
  })
});

// Second step : get matches from event
app.get('/matches', (req, res) => {
  HLTV.getEvents().then(resfromApi => {
    console.log("Coucou", res)
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
  HLTV.getResults({ eventIds: [4866] }).then(res => {
    console.log("Coucou", res)
  })
  HLTV.getMatches().then((res) => {
    console.log("Coucou", res)
  })
  axios.get('/')
  .then(function (response) {
    // handle success
    console.log("Coucou");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})