'use strict';

const express = require('express');
const path = require('path');
const app = express();
const scrapeController = require('./scraper.js');
const search = require('./ticketmaster.js');
const getNames = require("./firebaseServer.js");
let _ = require('underscore');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.send('It is on like Donkey Kong');
})

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