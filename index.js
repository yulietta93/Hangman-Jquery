import "./styles.scss";

$(document).ready(function() {

  var words = ["red","yellow","blue","white","black","pink","grey","orange"];
  var randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  var randomWordArray = randomWord.split("");

  for (var i = 0; i < randomWord.length; i++) {
    $("#container").append('<div class="letter ' + i + '"></div>');
    $("#container")
      .find(":nth-child(" + (i + 1) + ")")
      .text(randomWordArray[i]);
    $(".letter").css("color", "salmon");
  }

  var lives = 0;
    $("button").on("click", function() {$(this).addClass("marcado"); $(this).prop("disabled", "true");
    var matchFound = false;

    var userGuess = $(this).text();
    for (var i = 0; i < randomWord.length; i++) {
      if (userGuess === randomWord.charAt(i)) {
        $("#container")
          .find(":nth-child(" + (i + 1) + ")")
          .css("color", "white")
          .addClass("winner");
        matchFound = true;
      }
    }

    var goodGuesses = [];
    $(".letter").each(function(index) {
      if ($(this).hasClass("winner")) {
        goodGuesses.push(index);
        if (goodGuesses.length === randomWordArray.length) {
          $("#container").hide();
          $("button").prop("disabled", "true");
          $(".category").text("¡¡¡¡¡¡YOU WINNNNNN!!!!!!!!");
          $(".category").append(
            "<br><button enabled class='play-again'>Volver a Jugar</button>"
          );
        }
      }
    });

    if (matchFound === false) {
      lives += 1;
    }

    if (lives === 7) {
      $("#container").hide();
      $("button").prop("disabled", "true");
      $(".category").text("You lost - The correct word:" + randomWord);
      $(".category").append("<br><button enabled class='play-again'>Play Again</button>");
    }

    $(".play-again").on("click", function() {
      location.reload();
    });
  });
});
