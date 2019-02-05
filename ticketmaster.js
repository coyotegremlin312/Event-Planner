'use strict';

const rp = require('request-promise')

const search = {
  searchEvents: function(req, res, next) {
      for(let k = 0; k < req.performers.length; k++){
      let currentPerformer = req.performers[k];
      var options = {
        uri: 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + currentPerformer + '&countryCode=US&apikey=zfDT9CkLWqnkBgf46kiAtPNEhLOiHa2Q',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true 
      };
      rp(options)
          .then(function (result) {
            let searchArray = result._embedded.events
            let promises = [];
            for(let i = 0; i < searchArray.length; i++){
              let singleEvent = {}
              singleEvent.name = searchArray[i].name;
              singleEvent.location = searchArray[i]._embedded.venues[0].city.name;
              singleEvent.date = searchArray[i].dates.start.localDate;
              singleEvent.link = searchArray[i].url;
              promises.push(singleEvent);
            }
            let finishedResults = Promise.all(promises);
            return finishedResults;
          })
          .then(function(results) {
              for(let j = 0; j < results.length; j++){
                req.events.push(results[j]);
              }
          })
    }
  }  
}


module.exports = search;