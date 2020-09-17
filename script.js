const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio  = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


//Song titles
const songs = ['hey', 'summer', 'ukulele'];


//Keep track of songs:

let songIndex = 2;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details:

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}


//Play song

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


//Pause song

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}


//Previous Song:

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }


    loadSong(songs[songIndex]);

    playSong();
}

//next Song: 

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }


    loadSong(songs[songIndex]);

    playSong();
}

// Update Progress bar

function updateProgress(event) {
//duration and currenttime from this event:
const {duration, currentTime} = event.srcElement;
const progressPercent = (currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`;

}


// Set progress bar

function setProgress(event) {

    //width of the progress bar
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//event listener:
//check if the song is playing if not then to play if playing then stop

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});


//Change songs:

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time/ song update

audio.addEventListener('timeupdate', updateProgress);

//Click on the Progress bar:

progressContainer.addEventListener('click', setProgress);

//Song ends:
//Audio API:
audio.addEventListener('ended', nextSong)