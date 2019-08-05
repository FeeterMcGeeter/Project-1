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
var id = localStorage.user
var favId = localStorage.userFav


// ===== Variable database ref object to the child userSearch =====
var dbUser = database.ref().child('user').child(id);
var dbUserFavHotel = database.ref().child('fav').child(favId).child('hotel')


// ===== Variable for AJAX calls from index.html =====

var destination = '';
var startDate = '';
var endDate = '';
var startPlace = '';

// console.log(id);

//======= Firebase Snapshot and then ajax calls ========

dbUser.on('value', function (snapshot) {
    var sv = snapshot.val();
    console.log(sv)
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
            //console.log(dailyWeatherData);

            var weatherContainer = $("#weather-data");
            var weatherDiv = $("<div class='forecast-card'>");
            weatherDiv.attr("id", "day-" + (i + 1));

            // ===== Parsing the data to an integer and rounding up or down ===== 
            var temperatureData = dailyWeatherData.main.temp;
            var temperatureParse = parseInt(temperatureData);
            var temperatureRound = Math.round(temperatureParse);

            // ===== Formatting the date using Moment.js =====
            var dateData = dailyWeatherData.dt_txt;
            var dateFormat = moment(dateData).format("ddd");

            var temperatureDisplay = $("<h4>").html(temperatureRound + "&#176;");
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

    // ===== Booking required Variables =====

    var startDateFix = moment(startDate).format('YYYY-MM-DD')
    var endDateFix = moment(endDate).format('YYYY-MM-DD')

    //console.log(startDateFix);
    //console.log(endDateFix);

    // ===== Booking AJAX call =====
    $("#hotelbtn").on("click", function () {
        $('#infoBox').empty();
        $.ajax({
            url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
            headers: { ['X-RapidAPI-Key']: "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43" },
            data: {
                languagecode: 'en-us',
                text: destination
            }
        }).then(function (response) {
            var destID = response[0].dest_id

            return $.ajax({
                url:
                    "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
                headers: {
                    ["X-RapidAPI-Key"]: "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43"
                },
                data: {
                    price_filter_currencycode: "USD",
                    order_by: "popularity",
                    languagecode: "en-us",
                    search_type: "city",
                    offset: 0,
                    dest_ids: destID,
                    guest_qty: "1",
                    arrival_date: startDateFix,
                    departure_date: endDateFix,
                    room_qty: "1"
                }
            }).then(function (hotelBookings) {

                console.log(hotelBookings.result[2])

                for (var i = 0; i <= 4; i++) {
                    var address = hotelBookings.result[i].address;
                    var name = hotelBookings.result[i].hotel_name;
                    var url = hotelBookings.result[i].url;
                    var review = hotelBookings.result[i].review_score;
                    var img = hotelBookings.result[i].main_photo_url;
                    var newImg = '';
                    var hotelDiv = $('<div>');
                    var nameImgBox = $('<div>');
                    var infoElem = $('<div>');
                    var addElem = $('<p>');
                    var hotelElem = $('<h2>');
                    var urlElem = $('<a>');
                    var reviewElem = $('<p>');
                    var imgElem = $('<img>');
                    var hotelInfoDiv = $('<div>');
                    var titleDiv = $('<div>');
                    var fontIcon = $('<i>');
                    var iconButton = $('<button>');

                    titleDiv.addClass('hotelTitle');
                    fontIcon.addClass('fas');
                    fontIcon.addClass('fa-heart');
                    iconButton.addClass('favHotel');
                    iconButton.addClass('favBtn');
                    iconButton.attr('id', 'heart');
                    iconButton.attr('hotel', name);
                    iconButton.attr('address', address);
                    iconButton.attr('url', url);
                    iconButton.attr('review', review)
                    hotelElem.text(name);

                    hotelElem.appendTo(titleDiv);
                    fontIcon.appendTo(iconButton);
                    iconButton.appendTo(titleDiv);
                    titleDiv.appendTo(hotelDiv);

                    newImg = img.replace('square60', 'square200');
                    imgElem.attr('src', newImg);
                    imgElem.appendTo(nameImgBox);
                    iconButton.attr('img', newImg);

                    hotelInfoDiv.addClass('address-review');
                    hotelInfoDiv.appendTo(hotelDiv);

                    nameImgBox.appendTo(hotelInfoDiv);
                    nameImgBox.addClass('col-lg-4')

                    addElem.html('<span>Address: </span>' + address);
                    addElem.appendTo(infoElem);

                    reviewElem.html('<span>Review Score: </span>' + review);
                    reviewElem.appendTo(infoElem);

                    urlElem.text('Book Here');
                    urlElem.attr('href', url);
                    urlElem.attr('target', '_blank');
                    urlElem.appendTo(infoElem);

                    infoElem.appendTo(hotelInfoDiv);
                    infoElem.addClass('col-lg-8');

                    hotelDiv.addClass('card');
                    hotelDiv.addClass('col-lg-12');
                    hotelDiv.addClass('row');
                    hotelDiv.addClass('hotelBox')

                    $('#infoBox').append(hotelDiv)
                }
            })
        });
    });

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

    $('#flightbtn').on('click', function () {
        $('#infoBox').empty();
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
                // console.log(data)
                var skyURL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/' + data.startPlaceId + '/' + data.destinationPlaceId + '/' + startDateFix
                $.ajax({
                    url: skyURL,
                    headers: {
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                        "x-rapidapi-key": "3d2f9a6cffmsh8668e9511e3f612p13972ajsnc1c701fd3e43"
                    }
                }).then(function (response) {
                    console.log(response)
                    var quoteID = response.Quotes[0].OutboundLeg.CarrierIds[0];
                    var airline = ''
                    response.Carriers.forEach(function (carrier) {

                        var carrierId = carrier.CarrierId

                        if (quoteID === carrierId) {
                            return airline = carrier.Name
                        }

                    })

                    console.log(airline)

                    var minPrice = response.Quotes[0].MinPrice
                    var flightDiv = $('<div>');
                    var carrier = $('<h1>')
                    var flightCost = $('<p>');

                    if (response.Quotes.length === 0) {
                        return
                    }

                    carrier.text(airline);
                    carrier.appendTo(flightDiv);

                    flightCost.html("<span>$</span>" + minPrice);
                    flightCost.appendTo(flightDiv);

                    flightDiv.addClass('card');
                    flightDiv.addClass('col-lg-6');
                    flightDiv.addClass('flightBox');

                    $('#infoBox').append(flightDiv);
                })
            });
    });

    // ===== AJAX CALL TO ZOMATO ===== 

    $('#foodbtn').on('click', function () {
        // maybe .empty of infoBox here
        $('#infoBox').empty();
        $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/locations',
            method: "GET",

            data: {
                apikey: "c493267fcaf15186d28434182e181ee9",
                query: destination
            }

        }).then(function (cityData) {
            console.log(cityData);
            var type = cityData.location_suggestions[0].entity_type;
            var id = cityData.location_suggestions[0].entity_id;
            return $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/location_details',
                method: 'GET',
                data: {
                    apikey: "c493267fcaf15186d28434182e181ee9",
                    entity_id: id,
                    entity_type: type,

                }
            })

        }).then(function (response) {

            var restaurants = response.best_rated_restaurant
            var requests = []
            // possibly make forEach
            restaurants.forEach(function (restaurant, i) {
                console.log(i)
                var id = restaurant.restaurant.id

                console.log(restaurant.restaurant.id)
                var restauranRequest = $.ajax({
                    url: 'https://developers.zomato.com/api/v2.1/restaurant',
                    method: 'GET',
                    data: {
                        apikey: "c493267fcaf15186d28434182e181ee9",
                        res_id: id,
                    }
                })
                if (i < 5) {

                    requests.push(restauranRequest)
                }
                //push ajax call to requests
            })
            console.log(requests)
            return Promise.all(requests)
        }).then(function (response) {
            // console.log(response[3])

            response.forEach(function (item) {

                var resDiv = $('<div>');
                var resImg = $('<img>');
                var restaurant = $('<h2>');
                var menu = $('<a>');
                var reviews = $('<p>');
                var phone = $('<p>');
                var resImgAndInfoDiv = $('<div>');
                var imgDiv = $('<div>');
                var resInfoDiv = $('<div>');
                var resTitleDiv = $('<div>');
                var heartButton = $('<button>');
                var heartIcon = $('<i>');

                heartButton.attr('id', 'foodFav');
                heartButton.addClass('favBtn');
                heartIcon.addClass('fas');
                heartIcon.addClass('fa-heart');
                resTitleDiv.addClass('foodTitle');
                restaurant.text(item.name);

                restaurant.appendTo(resTitleDiv);
                heartIcon.appendTo(heartButton);
                heartButton.appendTo(resTitleDiv);
                resTitleDiv.appendTo(resDiv);

                resImg.attr('src', item.featured_image);
                resImg.attr('style', 'width:200px');
                resImg.appendTo(imgDiv);

                reviews.html('<span>Reviews: </span>' + item.all_reviews_count);
                reviews.appendTo(resInfoDiv);

                phone.html('<span>Phone: </span>' + item.phone_numbers);
                phone.appendTo(resInfoDiv);

                menu.text('Menu');
                menu.attr('href', item.menu_url);
                menu.attr('target', '_blank');
                menu.appendTo(resInfoDiv);

                resDiv.addClass('card');
                resDiv.addClass('col-lg-12');
                resDiv.addClass('foodBox');

                imgDiv.addClass('col-lg-4');
                resInfoDiv.addClass('col-lg-8');
                resImgAndInfoDiv.addClass('img-resInfo');

                resDiv.append(resImgAndInfoDiv);
                resImgAndInfoDiv.append(imgDiv);
                resImgAndInfoDiv.append(resInfoDiv);

                $('#infoBox').append(resDiv);
            })
        })
    });
})

$(document).on('click', '.favHotel', function () {

    var hotel = $(this).attr('hotel');
    var address = $(this).attr('address');
    var url = $(this).attr('url');
    var review = $(this).attr('review');
    var img = $(this).attr('img');

    dbUserFavHotel.push({
        hotel: hotel,
        address: address,
        url: url,
        review: review,
        img: img,
    })
})

