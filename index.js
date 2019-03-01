'use strict';

const express = require('express');
const path = require('path');
const scrapeController = require('./scraper.js');
const search = require('./ticketmaster.js');
const getNames = require("./firebaseServer.js");
let _ = require('underscore');
let PORT = process.env.PORT || 5000;
const app = express();

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

app.listen(PORT);

module.exports = app;