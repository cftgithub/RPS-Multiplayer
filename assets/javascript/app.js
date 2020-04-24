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
  // if (snapshot.child("player1").exists() && snapshot.child("player2").exists()){
  //   player1 = snapshot.val().player1Name;
  //   player2 = snapshot.val(player2).name;
  // }
  chatLog = snapshot.val().chat;
  $("#conversation").append(snapshot.val().chat);
  $("#conversation").append("<br>");
  $("#p1").html(snapshot.val().name1);
  $("#p2").html(snapshot.val().name2);
  // used to determine who wins
  console.log("hit");
  $("#vs1").html(snapshot.val().weapon1).hide();
  $("#vs2").html(snapshot.val().weapon2).hide();
  $("#restart1").html(snapshot.val().resetP1);
  $("#restart2").html(snapshot.val().resetP2);
  $("#results").html(snapshot.val().gameResults);
})

// submit player1 name, append game buttons
var displayWeapon1 = "<h5>Choose your weapon!</h5>" + "<br>" + "<button id='rock1'>Rock</button> " + "<button id='paper1'>Paper</button> "
  + "<button id='scissor1'>Scissors</button>"
var displayWeapon2 = "<h5>Choose your weapon!</h5>" + "<br>" + "<button id='rock2'>Rock</button> " + "<button id='paper2'>Paper</button> "
  + "<button id='scissor2'>Scissors</button>"

var player1ref = database.ref("/player1");

$("#submit1").on("click", function () {
  event.preventDefault();
  var player1 = $("#player1").val();
  database.ref('/player1').set({
    name1: player1
  })
  player1ref.on("value", function (snapshot) {
    player1Name = snapshot.val().name1;
    console.log(snapshot.val());
  });
  console.log(player1Name);
  $("#submit2").prop("disabled", true);
  $("#weapons1").append(displayWeapon1);
  // $("#weapons1").append("<h5>Choose your weapon!</h5>");
  // $("#choices1").show();
})

// submit player2 name, append game buttons
$("#submit2").on("click", function () {
  event.preventDefault();
  var player2 = $("#player2").val();
  database.ref('/player2').set({
    name2: player2
  })
  var player2ref = database.ref("/player2");
  player2ref.on("value", function (snapshot) {
    player2Name = snapshot.val().name2;
    console.log(snapshot.val());
  });
  console.log(player2Name);
  $("#submit1").prop("disabled", true);
  $("#weapons2").append(displayWeapon2);
})

// Player1 weapons control
$(document).on("click", "#rock1", function () {
  $("#weapons1").html("Your weapon is: Rock");
  $("#paper1", "#scissor1").hide();
  var weapon1 = "Rock";
  database.ref('/player1').update({
    weapon1: weapon1
  })
  player1ref.on("value", function (snapshot) {
    player1wpn = snapshot.val().weapon1;
    // $("#vs1").html(snapshot.val().weapon1).hide();


  });
  console.log(player1wpn);


  // results();
});
$(document).on("click", "#paper1", function () {
  $("#weapons1").html("Your weapon is: Paper");
  $("#rock1", "#scissor1").hide();
  var weapon1 = "Paper";
  database.ref("/player1").update({
    weapon1: weapon1
  })
  // results();
});
$(document).on("click", "#scissor1", function () {
  $("#weapons1").html("Your weapon is: Scissors");
  $("#paper1", "#rock1").hide();
  var weapon1 = "Scissors";
  database.ref("/player1").update({
    weapon1: weapon1
  })
  // results();
});

// Player2 weapons control
$(document).on("click", "#rock2", function () {
  $("#weapons2").html("Your weapon is: Rock");
  $("#paper2", "#scissor2").hide();
  var weapon2 = "Rock";
  database.ref("/player2").update({
    weapon2: weapon2
  })
  results();
});
$(document).on("click", "#paper2", function () {
  $("#weapons2").html("Your weapon is: Paper");
  $("#rock2", "#scissor2").hide();
  var weapon2 = "Paper";
  database.ref("/player2").update({
    weapon2: weapon2
  })
  results();
});
$(document).on("click", "#scissor2", function () {
  $("#weapons2").html("Your weapon is: Scissors");
  $("#paper2", "#rock2").hide();
  var weapon2 = "Scissors";
  database.ref("/player2").update({
    weapon2: weapon2
  })
  results();
});
// change above to if statement?

// determin wins
var p1Wins = 0;
var p2Wins = 0;

function results() {
  var vs1 = document.getElementById("vs1").innerHTML;
  var vs2 = document.getElementById("vs2").innerHTML;
  var p1 = document.getElementById("p1").innerHTML;
  var p2 = document.getElementById("p2").innerHTML;
  console.log(vs1, vs2);
  // var getResults = document.getElementById("results").innerHTML;
  var p1winCount = document.getElementById("p1Score").innerHTML;
  var p2winCount = document.getElementById("p2Score").innerHTML;

  if (vs1 === vs2) {
    console.log("tie");
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + "It's a Tie!");
  }
  else if (vs1 === "Rock" && vs2 === "Paper") {
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + p2 + " Wins!");
    p2winCount = (p2Wins + 1);
  }
  else if (vs1 === "Rock" && vs2 === "Scissors") {
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + p1 + " Wins!");
    p1winCount = (p1Wins + 1);
  }
  else if (vs1 === "Paper" && vs2 === "Rock") {
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + p1 + " Wins!");
    p1winCount = (p1Wins + 1);
  }
  else if (vs1 === "Paper" && vs2 === "Scissors") {
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + p2 + " Wins!");
    p2winCount = (p2Wins + 1);
  }
  else if (vs1 === "Scissors" && vs2 === "Paper") {
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + p1 + " Wins!");
    p1winCount = (p1Wins + 1);
  }
  else if (vs1 === "Scissors" && vs2 === "Rock") {
    document.getElementById("results").innerHTML = (vs1 + " vs " + vs2 + "<br>" + p2 + " Wins!");
    p2winCount = (p2Wins + 1);
  }
  event.preventDefault();
  var gameResults = document.getElementById("results").innerHTML;
  database.ref().push({
    gameResults: gameResults
  })

  // if (vs1 !== "" && vs2 !== "") { //if both players have data
  //   //clear variables
  // }
}

// function restartGame() {

//   document.getElementById("restart1").innerHTML = ("<button id='start1'>Rematch!</button>");
//   document.getElementById("restart2").innerHTML = ("<button id='start2'>Rematch!</button>");
//   event.preventDefault();
//   var resetP1 = document.getElementById("restart1").innerHTML;
//   var resetP2 = document.getElementById("restart2").innerHTML;
//   database.ref().push({
//     resetP1: resetP1,
//     resetP2: resetP2
//   });

// }

// restart game?
// $(document).on("click", "#start1", function () {
//   $("#start2").prop("disabled", true);
//   $("#weapons1").html("<h5>Choose your weapon!</h5>" + "<br>" + "<button id='rock1'>Rock</button> " + "<button id='paper1'>Paper</button> "
//   + "<button id='scissor1'>Scissors</button>");
//   $("#weapons1").html("<h5>Choose your weapon!</h5>");
//   $("#choices1").show();
// });

// $(document).on("click", "#start2", function () {
//   $("#start1").prop("disabled", true);
//   $("#weapons2").html("<h5>Choose your weapon!</h5>" + "<br>" + "<button id='rock2'>Rock</button> " + "<button id='paper2'>Paper</button> "
//     + "<button id='scissor2'>Scissors</button>");
// });

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

// clear data stored in Firebase when browser is closed
function clearData(onunload) {
  database.ref().remove();
}
