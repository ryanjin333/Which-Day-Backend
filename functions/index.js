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

//Update isFirstDay

var isHoliday = false;
var endDate = "";

const changeDay = async () => {
  if (moment().format('H') === '12' //&& 
    //(moment().format('ddd') !== 'Sat' || moment().format('ddd') !== 'Sun')
    ) {
      console.log("Day Change");
    //Call if the date is not a holiday  
    if (!isHoliday) {
      holidays.forEach((holiday) => {
        if (moment().format('L') === holiday.startDate) {
          isHoliday = true;
          endDate = holiday.endDate;
        }
      })
    }
    
    //Write to database if the date isn't a holiday or if an end date has been reached
    if (!isHoliday || moment().format('L') === endDate) {
      await db.collection("booleans").doc("isFirstDay").set({
        "isFirstDay" : !isFirstDay
      })

      isHoliday = false;
      endDate = "";
    }
  }
}
setInterval(changeDay, 1000);

//API GET request
    app.get('/isFirstDay', (req, res) => {
        res.status(200).send({
            isFirstDay : isFirstDay
        })
    })

exports.app = functions.https.onRequest(app);