// ===== CLICK HANDLER FOR THE SEARCH BUTTON =====
$("#searchButton").on("click", function (event) {
    event.preventDefault();

    // ===== Retrieving data from the user's requests =====
    var destination = $("#destination").val().trim();
    var startDate = $("#start").val().trim();
    var endDate = $("#end").val().trim();

    console.log(destination);
    console.log(startDate);
    console.log(endDate);

    // ===== Pushing the data to Firebase =====
    database.ref().push({
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
        // ===== APPENDING THE DATA TO THE WEATHER CARD ===== 
        var dayOne = $("#day1");
        var dayTwo = $("#day2");
        var dayThree = $("#day3");
        var dayFour = $("#day4");
        var dayFive = $("#day5");

        var iconOne = weatherData.weather.icon
        var tempOne = weatherData.main.temp;
        var dayOne = weatherData.dt_txt;
        
        var iconElement = $("<p>").text(iconOne);
        var tempElement = $("<h3>").text(tempOne);
        var dayElement = $("<p>").text(dayOne);

        // weatherDiv.append(tempElement);
        // weatherDiv.append(iconElement);
        // weatherDiv.append(dayElement);
        })
        console.log(dailyWeather);
        console.log(tempOne);
    })
})