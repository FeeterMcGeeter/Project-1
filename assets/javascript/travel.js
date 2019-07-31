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

})