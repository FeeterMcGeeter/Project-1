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

// ===== Variable for storing randomly generated key to localeStorage =====
var id = '';
var favId = '';
// ==== Variable database ref object to the child userSearch ====
var dbUser = database.ref().child('user');
var dbUserFav = database.ref().child('fav')

// ===== CLICK HANDLER FOR THE SEARCH BUTTON =====
$("#searchButton").on("click", function (event) {
    event.preventDefault();

    // ===== Retrieving data from the user's requests =====
    var startPlace = $('#startPlace').val().trim();
    var destination = $("#destination").val().trim();
    var startDate = $("#start").val().trim();
    var endDate = $("#end").val().trim();

    // ===== Pushing the data to Firebase =====
    dbUser.push({
        startPlace: startPlace,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
    })

    dbUserFav.push({
        destination: destination,
    })

    // ====== Storing randomly generated key to localStorage as user ====
    dbUser.on('child_added', function (snapshot) {
        id = snapshot.key
    })
    localStorage.setItem('user', id)

    dbUserFav.on('child_added', function (snapshot) {
        favId = snapshot.key
    })
    localStorage.setItem('userFav',favId);
    
    if (startPlace !== "" && destination !== ""
        && startDate !== "" && endDate !== "") {
        window.location.replace('./travel.html')
    } else {
        $(".modal").modal('show')

    }

});

