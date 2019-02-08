'use strict';

const rp = require('request-promise')

const search = {
  searchEvents: function(req, res, next) {
      let events = [];
      req.ticketmasterEvents = events;
      for(let k = 0; k < req.options.length; k++){
        let option = req.options[k]
      rp(option)
          .then(function (result) {
            let searchArray = result._embedded.events
            for(let i = 0; i < searchArray.length; i++){
              let singleEvent = {}
              singleEvent.name = searchArray[i].name;
              singleEvent.location = searchArray[i]._embedded.venues[0].city.name;
              singleEvent.date = searchArray[i].dates.start.localDate;
              singleEvent.link = searchArray[i].url;
              req.ticketmasterEvents.push(singleEvent);
            }
          })
        }
      function send(){
        res.send(req.ticketmasterEvents)
        res.end();
      }
      setTimeout(send, 15000)
  }   
}


module.exports = search;