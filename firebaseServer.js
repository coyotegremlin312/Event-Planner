var firebase = require("firebase");

var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://event-planner-4c47d.firebaseio.com",
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();

const getNames = {
    getDatabaseComedians:
        (req, res, next) => {
            database.ref('comedianList')
            .once('value')
            .then((ashley) => {
            const comedians = [];
            ashley.forEach((childAshley) => {
                let name = childAshley.val();
                comedians.push(
                name
                )
            })
            req.comedians = comedians
            next();
            })
        },
    getDatabasePerformers:
        (req, res, next) => {
            database.ref('performerList')
            .once('value')
            .then((ashley) => {
            const performers = [];
            ashley.forEach((childAshley) => {
                let name = childAshley.val()
                performers.push(
                name
                )
            });
            let options = performers.map(performer => { 
                let opt = {};
                opt.uri = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + performer + '&countryCode=US&apikey=zfDT9CkLWqnkBgf46kiAtPNEhLOiHa2Q';
                opt.header = {'User-Agent': 'Request-Promise'}
                opt.json = true;
                return opt;
            })
            req.options = options;
            next();
            })
        }
    }



module.exports = getNames;