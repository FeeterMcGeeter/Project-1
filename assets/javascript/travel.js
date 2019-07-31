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