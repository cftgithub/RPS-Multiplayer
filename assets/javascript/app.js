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

// Get a snapshot of stored data on initial load and update page in real-time
database.ref().on("child_added", function (snapshot) {
  player1 = snapshot.val().name1;
  player2 = snapshot.val().name2;
  chatLog = snapshot.val().chat;
  $("#player1").html(player1);
  $("#player2").html(player2);
  $("#conversation").append(snapshot.val().chat);
  $("#conversation").append("<br>");  
});

var input = document.getElementById("chatLog");
input.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    document.getElementById("submitChat").click();
  }
  //   chatLog = $("#chatLog").val().trim();
  // console.log(chatLog);
  // database.ref().push({
  //   chat: chatLog
  // });
  // $("#chatLog").val("");
  // }
});

$("#submitChat").on("click", function () {
  event.preventDefault();
  chatLog = $("#chatLog").val().trim();
  console.log(chatLog);
  database.ref().push({
    chat: chatLog
  });
  $("#chatLog").val("");
});

$(".submitName").on("click", function (event) {
  event.preventDefault();
  var player1 = $("#player1").val();
  var player2 = $("#player2").val();
  console.log("player 1: " + player1, "player 2: " + player2);

  database.ref().set({
    name1: player1,
    name2: player2
  });
  $("#player1, #player2").val("");
});
// $("#submit2").on("click", function(event) {
//   event.preventDefault();
//   var player2 = $("#player2").val();
//   console.log("player 2: " + player2);
//     });




  //   chat:chatLog,
  //   dateAdded:firebase.database.ServerValue.TIMESTAMP
