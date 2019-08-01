// ===== FIREBASE CONFIGURATION ===== 
var firebaseConfig = {
    apiKey: "AIzaSyAbOz7Rc8Sy34ZeQnRnZrLrEB0UFisJOuo",
    authDomain: "project-1-62259.firebaseapp.com",
    databaseURL: "https://project-1-62259.firebaseio.com",
    projectId: "project-1-62259",
    storageBucket: "",
    messagingSenderId: "811913379053",
    appId: "1:811913379053:web:3f6e668187ab670e"
};
// ===== Initialize Firebase =====
firebase.initializeApp(firebaseConfig);

// ===== Variable for database reference =====
var database = firebase.database();

// ===== Variable of key for user pulled from localStorage =====
var id = '';
id = localStorage.user

// ==== Variable database ref object to the child userSearch ====
var dbUser = database.ref().child('user').child(id);

// ==== Variable for AJAX calls from index.html ====

var destination = '';
var startDate = '';
var endDate = '';
var startPlace = '';

console.log(id);

//======= Firebase Snapshot and then ajax calls ========

dbUser.on('value', function (snapshot) {
    var sv = snapshot.val();
    destination = sv.destination;
    startDate = sv.startDate;
    endDate = sv.endDate;
    startPlace = sv.startPlace;

    //console.log(destination);
    //console.log(startDate);
    //console.log(endDate);
    //console.log(startPlace);

    // ==== VARIABLES FOR OPENWEATHER API =====
    var weatherAPIKey = "3703659783afa99dd31d2449ec636a6c";
    var city = destination;
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherAPIKey}`;

    // ===== AJAX CALL TO OPENWEATHER =====
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (weatherData) {
        var hoursArray = weatherData.list;
        var dailyWeather = hoursArray.filter(function (value) {
            var dtTxt = value.dt_txt;
            var timeIndex = dtTxt.indexOf("12:00:00");

            if (timeIndex === -1) {
                return false;
            } else {
                return true;
            }
            // ===== APPENDING THE DATA TO THE WEATHER CARD ===== 
            var weatherDivOne = $("<div class='day-one");
            var descriptionElement = $("<p>").text(dailyWeather[0].weather[0].description);
            var dayElement = $("<p>").text(dailyWeather[0].dt_txt);

            weatherDivOne.append($("<p>").text(dailyWeather[0].main.temp));

            $("#day1").append(weatherDivOne);
            // weatherDiv.append(tempElement);
            // weatherDiv.append(iconElement);
            // weatherDiv.append(dayElement);
        })
        console.log(dailyWeather);
    })

        // ======= Booking required Variables

        var startDateFix = moment(startDate).format('YYYY-MM-DD')
        var endDateFix = moment(endDate).format('YYYY-MM-DD')
    
        //console.log(startDateFix);
        //console.log(endDateFix);
        //
        // ======= Booking AJAX call ========
        //$.ajax({
        //   url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
        //   headers: { ['X-RapidAPI-Key']: "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43" },
        //   data: {
        //       languagecode: 'en-us',
        //       text: destination
        //   }
        //})
        //.then(function (cityCode) {
        //   var destID= cityCode[0].dest_id
        //
        //    return $.ajax({
        //        url:
        //            "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
        //        headers: {
        //            ["X-RapidAPI-Key"]: "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43"
        //        },
        //        data: {
        //            price_filter_currencycode: "USD",
        //            order_by: "popularity",
        //            languagecode: "en-us",
        //            search_type: "city",
        //            offset: 0,
        //            dest_ids: destID,
        //            guest_qty: "1",
        //            arrival_date: startDateFix,
        //            departure_date: endDateFix,
        //            room_qty: "1"
        //        }
        //    })
        //})
        //.then(function(hotelBookings) {
        //    console.log(hotelBookings)
        //})

})