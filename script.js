let currentAudio = null;

const trackStartTimes = {
  "temp.mp3": 0,
  "listen.mp3": 0,
  "reach.mp3": 0,
  "words.mp3": 0
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
  const startTime = trackStartTimes[fileName] || 0;

  if (currentAudio === fileName && !audio.paused) {
    stopAudio();
    return;
  }

  audio.pause();
  audio.src = fileName;
  audio.load();

  audio.onloadedmetadata = function () {
    audio.currentTime = startTime;
    audio.play();
    currentAudio = fileName;
  };

  audio.onended = function () {
    currentAudio = null;
  };
}

function stopAudio() {
  const audio = document.getElementById("audioPlayer");

  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.onloadedmetadata = null;
  audio.onended = null;
  currentAudio = null;
}
