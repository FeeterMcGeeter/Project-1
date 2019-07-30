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
    var weatherAPIKey = "3703659783afa99dd31d2449ec636a6c";
    var city = $("#destination").val();
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

    // ===== VARIABLE FOR ZOMATO API URL =====
    var foodAPIKey = "fee4a18f3c4f28a7c1124fbfb053b3b2";
    var foodURL = `https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${city}&count=5&sort=rating&order=desc&apikey=${foodAPIKey}`;

    // ===== AJAX CALL TO ZOMATO ===== 
    $.ajax({
        url: foodURL,
        method: "GET"
    }).then(function (foodData) {
        console.log(foodData);
        
    })

})