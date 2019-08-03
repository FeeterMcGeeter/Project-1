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

    if (startPlace !== "" && destination !== ""
        && startDate !== "" && endDate !== "") {
        window.location.replace('./travel.html')
    } else {
            $(".modal").modal('show')

    }
    
});

