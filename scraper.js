'use strict';

const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');

const scrapeController = {
    getComedyStore: (req, res, next) => {
        rp('https://thecomedystore.com/calendar/')
            .then(function (html) {
                const $ = cheerio.load(html);
                let boots = []
                for(let j = 0; j < req.comedians.length; j++){
                    let currentComedian = req.comedians[j];
                $('.list-view-details').each(function (i, elem) {
                    if ($(this).text().includes(currentComedian)) {
                        let object = {};
                        let performer = $('.headliners', this).text();
                        let date = $('.dates', this).text();
                        let link = $('a', this).attr('href')
                        object.performer = performer;
                        object.date = date
                        object.link = link;
                        boots.push(object);
                    }
                })}
                req.events = boots;
                next();
            })
    },
    getIceHouse: (req, res, next) => {
        rp('http://icehousecomedy.com/enhancedCalendar.cfm')
            .then(function(html){
                const $ = cheerio.load(html);
                for(let j = 0; j < req.comedians.length; j++){
                    let currentComedian = req.comedians[j];
                $('.show_hover').each(function (i, elem) {
                    if ($(this).text().includes(currentComedian)) {
                        let object = {};
                        let performer = $('.event-name', this).text();
                        let link = $(this).attr('href');
                        object.performer = performer;
                        object.link = link;
                        req.events.push(object)
                    }
                })
            }
            res.send(req.events)
            })
    }
}

module.exports = scrapeController;