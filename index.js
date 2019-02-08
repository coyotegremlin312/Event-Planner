'use strict';

const express = require('express');
const app = express();
const scrapeController = require('./scraper.js');
const search = require('./ticketmaster.js');
const getNames = require("./firebaseServer.js");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/', (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send('It is on like Donkey Kong');
//     res.end();
// })

app.get('/events', 
    getNames.getDatabaseComedians,
    getNames.getDatabasePerformers,
    scrapeController.getComedyStore,
    scrapeController.getIceHouse)

app.get('/ticketmasterevents',
    getNames.getDatabasePerformers,
    search.searchEvents,
)

app.listen(5000);

module.exports = app;