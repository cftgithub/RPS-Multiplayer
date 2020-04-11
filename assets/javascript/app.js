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
  $("#conversation").append(snapshot.val().chat);
  $("#conversation").append("<br>");
  $("#p1").html(snapshot.val().name1);
  $("#p2").html(snapshot.val().name2);
  $("#vs1").html(snapshot.val().weapon1);
  $("#vs2").html(snapshot.val().weapon2).hide();
})

// determin wins
// var p1Weapon = document.getElementById(vs1).val();
var p1Weapon = $("#vs1").text();
console.log(p1Weapon);


// chat box
var input = document.getElementById("chatLog");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitChat").click();
  }
});
$("#submitChat").on("click", function () {
  event.preventDefault();
  chatLog = $("#chatLog").val().trim();
  console.log(chatLog);
  database.ref().push({
    chat: chatLog
  })
  // clears textbox after submit
  $("#chatLog").val("");
})
// submit player1 name, append game buttons
$("#submit1").on("click", function () {
  event.preventDefault();
  var player1 = $("#player1").val();
  database.ref().push({
    name1: player1
  })
  console.log("player 1: " + player1)
  $("#submit2").prop("disabled", true);
  $("#weapons1").append("<h5>Choose your weapon!</h5>" + "<br>" + "<button id='rock1'>Rock</button> " + "<button id='paper1'>Paper</button> "
    + "<button id='scissor1'>Scissor</button>");
})
// submit player2 name, append game buttons
$("#submit2").on("click", function () {
  event.preventDefault();
  var player2 = $("#player2").val();
  database.ref().push({
    name2: player2
  })
  console.log("player 2: " + player2)
  $("#submit1").prop("disabled", true);
  $("#weapons2").append("<h5>Choose your weapon!</h5>" + "<br>" + "<button id='rock2'>Rock</button> " + "<button id='paper2'>Paper</button> "
    + "<button id='scissor2'>Scissor</button>");
})

// clear data stored in Firebase when browser is closed
function clearData(onunload) {
  database.ref().remove();
}

// Player1 weapons control
$(document).on("click", "#rock1", function () {
  $("#weapons1").html("rock1");
  $("#paper1", "#scissor1").hide();
  var weapon1 = "rock1";
  database.ref().push({
    weapon1: weapon1
  })
});
$(document).on("click", "#paper1", function () {
  $("#weapons1").html("paper1");
  $("#rock1", "#scissor1").hide();
  var weapon1 = "paper1";
  database.ref().push({
    weapon1: weapon1
  })
});
$(document).on("click", "#scissor1", function () {
  $("#weapons1").html("scissor1");
  $("#paper1", "#rock1").hide();
  var weapon1 = "scissor1";
  database.ref().push({
    weapon1: weapon1
  })
});

// Player2 weapons control
$(document).on("click", "#rock2", function () {
  $("#weapons2").html("rock2");
  $("#paper2", "#scissor2").hide();
  var weapon2 = "rock2";
  database.ref().push({
    weapon2: weapon2
  })
});
$(document).on("click", "#paper2", function () {
  $("#weapons2").html("paper2");
  $("#rock2", "#scissor2").hide();
  var weapon2 = "paper2";
  database.ref().push({
    weapon2: weapon2
  })
});
$(document).on("click", "#scissor2", function () {
  $("#weapons2").html("scissor2");
  $("#paper2", "#rock2").hide();
  var weapon2 = "scissor2";
  database.ref().push({
    weapon2: weapon2
  })
});
  // change above to if statement?

  