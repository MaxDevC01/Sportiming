
function init() {
  var timerValue = document.getElementById("timer-value");
  var currentLoopElement = document.getElementById("current-loop"); // New element to display current loop
  var interval;

  var exercices = document.getElementById("exercices");
  var exercicesArray = exercices.querySelectorAll(".exercice");
  var currentExercice = 0;
  var repeats = 12;
  var isRunning = false;
  var currentTime = 0;
  var firstClick = true; // Variable to track the first click
  var currentLoop = 1; // Variable to track the current loop

  function startTimer() {
    interval = setInterval(function () {
      currentTime++;
      timerValue.innerHTML = formatTime(currentTime);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
  }

  function showNextExercice() {
    if (firstClick) {
      firstClick = false;
      isRunning = true;
      startTimer();
    } else {
      exercicesArray[currentExercice].style.display = "none";

      if (currentExercice < exercicesArray.length - 1) {
        currentExercice++;
      } else if (repeats > 1) {
        currentExercice = 0;
        repeats--;
        currentLoop++;
        currentLoopElement.innerHTML = "Boucle " + currentLoop; // Update the HTML element with current loop
      } else {
        stopTimer();
        isRunning = false;
        return;
      }

      exercicesArray[currentExercice].style.display = "block";

      if (exercicesArray[currentExercice].id === "repos") {
        startReposTimer();
      }
    }
  }

  function startReposTimer() {
    var reposExercice = document.getElementById("repos");
    var reposTimerValue = document.getElementById("repos-timer-value");
    var reposTime = 45;

    var reposInterval = setInterval(function () {
      if (reposTime > 0) {
        reposTime--;
        reposTimerValue.innerHTML = formatTime(reposTime);
      } else {
        clearInterval(reposInterval);
        reposExercice.style.display = "none";
        showNextExercice();
      }
    }, 1000);

    for (var i = 0; i < exercicesArray.length; i++) {
      exercicesArray[i].style.display = "none";
    }

    reposExercice.style.display = "block";
  }

  function formatTime(timeInSeconds) {
    var hours = Math.floor(timeInSeconds / 3600);
    var minutes = Math.floor((timeInSeconds % 3600) / 60);
    var seconds = timeInSeconds % 60;
    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  }

  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }

  for (var i = 1; i < exercicesArray.length; i++) {
    exercicesArray[i].style.display = "none";
  }

  exercicesArray[currentExercice].style.display = "block";
  timerValue.innerHTML = formatTime(currentTime);

  window.addEventListener("click", function () {
    showNextExercice();
  });
}

window.onload = init;
