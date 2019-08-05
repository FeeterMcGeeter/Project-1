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

dbUserFav.on('value',function(snapshot){
    var sv = snapshot.val();
    console.log(sv.hotel);

})