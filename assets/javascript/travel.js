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

    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&units=imperial&appid=${weatherAPIKey}`;

    // ===== AJAX CALL TO OPENWEATHER =====
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (weatherInfo) {
        var listOfWeatherDataEveryThreeHours = weatherInfo.list;
        var listOfDailyWeatherData = listOfWeatherDataEveryThreeHours.filter(function (weatherDataEveryThreeHours) {
            var dtTxt = weatherDataEveryThreeHours.dt_txt;
            var timeIndex = dtTxt.indexOf("12:00:00");

            if (timeIndex === -1) {
                return false;
            } else {
                return true;
            }

        })
        listOfDailyWeatherData.forEach(function (dailyWeatherData, i) {
            console.log(dailyWeatherData);

            var weatherContainer = $("#weather-data");
            var weatherDiv = $("<div class='forecast-card'>");
            weatherDiv.attr("id", "day-" + i + 1);

            // ===== Parsing the data to an integer and rounding up or down ===== 
            var temperatureData = dailyWeatherData.main.temp;
            var temperatureParse = parseInt(temperatureData);
            var temperatureRound = Math.round(temperatureParse);

            // ===== Formatting the date using Moment.js =====
            var dateData = dailyWeatherData.dt_txt;
            var dateFormat = moment(dateData).format("ddd");

            var temperatureDisplay = $("<h4>").text(temperatureRound);
            var descriptionDisplay = $("<p>").text(dailyWeatherData.weather[0].description);
            var dateDisplay = $("<h5>").text(dateFormat);

            // ===== Appending the data to html ===== 
            weatherDiv.append(temperatureDisplay, descriptionDisplay, dateDisplay);
            weatherContainer.append(weatherDiv);

            temperatureDisplay.addClass("weather-temp");
            descriptionDisplay.addClass("weather-description");
            dateDisplay.addClass("weather-date");
        })
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


    function getPlaceId(query) {
        return $.ajax({
            url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/',
            headers: {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43"
            },
            data: {
                query
            }

        }).then(function (response) {
            return response.Places[0].PlaceId
        })

    }

    getPlaceId(destination)
        .then(function (destinationPlaceId) {
            return getPlaceId(startPlace)
                .then(function (startPlaceId) {
                    return {
                        destinationPlaceId,
                        startPlaceId
                    }
                })
        })
        .then(function (data) {
            console.log(data)
            var skyURL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/' + data.startPlaceId + '/' + data.destinationPlaceId + '/' + startDateFix
            $.ajax({
                url: skyURL,
                headers: {
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43"
                }
            }).then(function (response) {
                console.log(response)
            })
        });
})