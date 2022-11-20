const functions = require("firebase-functions");
var moment = require('moment');
var app = require('./src/server');
var db = require('./src/firebase');

var isFirstDay = null;
var holidays = [];

//Firestore

const isFirstDayDoc = db.collection("booleans").doc("isFirstDay");

isFirstDayDoc.onSnapshot( (docSnapshot) => {
    isFirstDay = docSnapshot.data().isFirstDay;
}, (error) => {
    console.log(`Encountered error: ${error}`);
})

const holidaysQuery = db.collection("holidays");

holidaysQuery.onSnapshot( (querySnapshot) => {
  holidays = querySnapshot.docs.map((doc) => doc.data());
}, (error) => {
  console.log(`Encountered error: ${error}`);
})

//API GET request
app.get('/isFirstDay', (req, res) => {
    res.status(200).send({
        isFirstDay : isFirstDay
    })
})

exports.app = functions.https.onRequest(app);