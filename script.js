let currentAudio = null;
let stopTimer = null;

const previewStartTimes = {
  "temp.mp3": 92.5,
  "listen.mp3": 72,
  "reach.mp3": 63.5,
  "words.mp3": 69
};

function showPage(pageId) {
  const transition = document.getElementById("transitionScreen");

  transition.classList.add("active");
  stopAudio();
  closeAlbum();

  setTimeout(function () {
    document.querySelectorAll(".page").forEach(function (page) {
      page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    setTimeout(function () {
      transition.classList.remove("active");
    }, 220);
  }, 320);
}

function openAlbum(type) {
  const modal = document.getElementById("albumModal");
  const single = document.getElementById("singleModal");
  const ep = document.getElementById("epModal");

  single.classList.remove("active");
  ep.classList.remove("active");

  if (type === "single") {
    single.classList.add("active");
  }

  if (type === "ep") {
    ep.classList.add("active");
  }

  modal.classList.add("active");
}

function closeAlbum() {
  const modal = document.getElementById("albumModal");

  if (modal) {
    modal.classList.remove("active");
  }

  stopAudio();
}

function playPreview(fileName) {
  const audio = document.getElementById("audioPlayer");

  if (currentAudio === fileName && !audio.paused) {
    stopAudio();
    return;
  }

  clearTimeout(stopTimer);

  audio.src = fileName;
  audio.currentTime = previewStartTimes[fileName] || 0;
  audio.play();

  currentAudio = fileName;

  stopTimer = setTimeout(function () {
    stopAudio();
  }, 30000);
}

function stopAudio() {
  const audio = document.getElementById("audioPlayer");

  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  currentAudio = null;

  clearTimeout(stopTimer);
}
