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

// ===== Variable for storing randomly generated key to localeStorage =====
var id = '';

// ==== Variable database ref object to the child userSearch ====
var dbUser = database.ref().child('user');

// ===== CLICK HANDLER FOR THE SEARCH BUTTON =====
$("#searchButton").on("click", function (event) {
    event.preventDefault();
    
    // ===== Retrieving data from the user's requests =====
    var startPlace = $('#startPlace').val().trim();
    var destination = $("#destination").val().trim();
    var startDate = $("#start").val().trim();
    var endDate = $("#end").val().trim();

    console.log(startPlace);
    console.log(destination);
    console.log(startDate);
    console.log(endDate);

    // ===== Pushing the data to Firebase =====
    dbUser.push({
        startPlace: startPlace,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
    })

    // ====== Storing randomly generated key to localStorage as user ====
    dbUser.on('child_added', function (snapshot) {
        id = snapshot.key
    })
    localStorage.setItem('user', id)
    

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