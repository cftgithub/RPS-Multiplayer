// Firebase nickname: RPSGame
var firebaseConfig = {
  apiKey: "AIzaSyDgPlwa6AGPlxwkS0sbcuBGurGyELZslgc",
  authDomain: "rps-multiplayer-6522b.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-6522b.firebaseio.com",
  projectId: "rps-multiplayer-6522b",
  storageBucket: "rps-multiplayer-6522b.appspot.com",
  messagingSenderId: "269443985763",
  appId: "1:269443985763:web:0c4dc7ccc616f2c8bc6356",
  measurementId: "G-0SWQ6BF188"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

$(".submitName").on("click", function(event) {
  event.preventDefault();
  var player1 = $("#player1").val();
  var player2 = $("#player2").val();
  console.log("player 1: " + player1, "player 2: " + player2);

  database.ref().set({
    player1:player1,
    player2:player2
  });
});
// $("#submit2").on("click", function(event) {
//   event.preventDefault();
//   var player2 = $("#player2").val();
//   console.log("player 2: " + player2);
//     });
  var chat = $("#chatLog").val().trim();


  
  //   chat:chatLog,
  //   dateAdded:firebase.database.ServerValue.TIMESTAMP