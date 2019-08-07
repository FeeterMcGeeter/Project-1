// ===== FIREBASE CONFIGURATION ===== 
var firebaseConfig = {
    apiKey: "AIzaSyAZfVc098J9UReQka9OS4XmKSOxcMEjQJY",
    authDomain: "travel-1d3b5.firebaseapp.com",
    databaseURL: "https://travel-1d3b5.firebaseio.com",
    projectId: "travel-1d3b5",
    storageBucket: "",
    messagingSenderId: "301156682375",
    appId: "1:301156682375:web:37c5c7813602600a"
};
// ===== Initialize Firebase =====
firebase.initializeApp(firebaseConfig);

// ===== Variable for database reference =====
var database = firebase.database();

// ===== Variable for database reference =====
var database = firebase.database();

// ===== Variable of key for user pulled from localStorage =====
var id = localStorage.user
var favId = localStorage.userFav

// ===== Variable database ref object to the child userSearch =====
var dbUserFav = database.ref().child('fav').child(favId)
var dbUserFavHotel = database.ref().child('fav').child(favId).child('hotel')
var dbUserFavFood = database.ref().child('fav').child(favId).child('food')


$('#hotelFavBtn').on('click', function () {
    
    $('#infoBox').empty();

    dbUserFavHotel.on('value', function (snapshot) {
        var hotel = snapshot.val();
        var key = Object.keys(hotel)
        console.log(hotel)
        console.log(key)

        for (var i = 0; i < key.length; i++) {
            var k = key[i];
            var name = hotel[k].hotel;
            var address = hotel[k].address;
            var img = hotel[k].img;
            var review = hotel[k].review;
            var url = hotel[k].url
            console.log(name)

            var hotelDiv = $('<div>')
            var nameImgBox = $('<div>')
            var hotelElem = $('<h2>')
            var addressElem = $('<p>')
            var urlElem = $('<a>')
            var reviewElem = $('<p>')
            var imgElem = $('<img>')
            var hotelInfoDiv = $('<div>')

            hotelElem.text(name)
            hotelElem.appendTo(nameImgBox)

            imgElem.attr('src', img)
            imgElem.appendTo(nameImgBox)

            addressElem.html('<span>Address: </span>' + address)
            addressElem.appendTo(hotelInfoDiv)

            reviewElem.html('<span>Review: </span>' + review)
            reviewElem.appendTo(hotelInfoDiv)

            urlElem.text('Book Here')
            urlElem.attr('href', url)
            urlElem.attr('target', '_blank')
            urlElem.appendTo(hotelInfoDiv)

            nameImgBox.addClass('col-lg-4')
            nameImgBox.appendTo(hotelDiv)

            hotelInfoDiv.addClass('col-lg-8')
            hotelInfoDiv.appendTo(hotelDiv)

            hotelDiv.addClass('card')
            hotelDiv.addClass('col-lg-12')
            hotelDiv.addClass('favoriteCard')
            hotelDiv.addClass('row')

            $('#infoBox').append(hotelDiv)
        }

    })

})

$('#foodFavBtn').on('click', function () {

    $('#infoBox').empty()

    dbUserFavFood.on('value', function (snapshot) {
        var restaurant = snapshot.val();
        var key = Object.keys(snapshot.val());
        console.log(restaurant)
        console.log(key)

        for (var i = 0; i < key.length; i++) {
            var k = key[i];
            var name = restaurant[k].name;
            var phone = restaurant[k].phone;
            var img = restaurant[k].imgURL;
            var review = restaurant[k].review;
            var menuURL = restaurant[k].menuURL;
            var address = restaurant[k].address;
            console.log(name)

            var resDiv = $('<div>')
            var nameImgBox = $('<div>')
            var resElem = $('<h2>')
            var addressElem = $('<p>')
            var menuElem = $('<a>')
            var reviewElem = $('<p>')
            var imgElem = $('<img>')
            var resInfoDiv = $('<div>')
            var phoneElem = $('<p>')

            resElem.text(name)
            resElem.appendTo(nameImgBox)

            imgElem.attr('src', img)
            imgElem.attr('style', 'width:200px')
            imgElem.appendTo(nameImgBox)

            addressElem.html('<span>Address: </span>' + address)
            addressElem.appendTo(resInfoDiv)

            phoneElem.html('<span>Phone: </span>' + phone.phone_numbers);
            phoneElem.appendTo(resInfoDiv);
            
            reviewElem.html('<span>Review: </span>' + review)
            reviewElem.appendTo(resInfoDiv)

            menuElem.text('menu')
            menuElem.attr('href', menuURL)
            menuElem.attr('target', '_blank')
            menuElem.appendTo(resInfoDiv)

            nameImgBox.addClass('col-lg-4')
            nameImgBox.appendTo(resDiv)

            resInfoDiv.addClass('col-lg-8')
            resInfoDiv.appendTo(resDiv)

            resDiv.addClass('card')
            resDiv.addClass('col-lg-12')
            resDiv.addClass('favoriteCard')
            resDiv.addClass('row')

            $('#infoBox').append(resDiv);
        }

        console.log(restaurant)


    })
})