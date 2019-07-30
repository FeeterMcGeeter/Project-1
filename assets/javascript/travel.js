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

// ===== CLICK HANDLER FOR THE SEARCH BUTTON =====
$("#searchButton").on("click", function (event) {
    // ===== Retrieving data from the user's requests =====
    var destination = $("#destination").val().trim();
    var startDate = $("#start").val().trim();
    var endDate = $("#end").val().trim();

    console.log(destination);
    console.log(startDate);
    console.log(endDate);

    // ===== Pushing the data to Firebase =====
    database.ref().push( {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
    })

    // ==== VARIABLES FOR OPENWEATHER API =====
    var APIKey = "3703659783afa99dd31d2449ec636a6c";
    var city = $("#destination").val();
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;

    // ===== AJAX CALL TO OPENWEATHER =====
    $.ajax({
        url: queryURL,
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
        
        // var weatherDiv = $(".forecast-card");
        // var temp = weatherData.main.temp;
        // var icon = weatherData.weather.icon
        // var day = weatherData.dt;

        // var tempElement = $("<h1>").text(temp);
        // var iconElement = $("<h1>").text(icon);
        // var dayElement = $("<p>").text(day);

        // weatherDiv.append(tempElement);
        // weatherDiv.append(iconElement);
        // weatherDiv.append(dayElement);
        })
        console.log(dailyWeather);
    })
})









    
