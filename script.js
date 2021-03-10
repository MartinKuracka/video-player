const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volumeRange = document.querySelector('.volume-range');
const currentTime = document.querySelector('.time-elapsed');
const durationEl = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
var volumeLevel;

// Play & Pause ----------------------------------- //

// show Play Icon
const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause','fa-play' );
    playBtn.setAttribute('title', 'Play');
};

const togglePlay = () => {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play','fa-pause' );
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
};

// If video ended show Play button
video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //

//  Calculate minutes and seconds
const timeCalculation = (time) => {
    let seconds = Math.floor(time % 60);
    seconds < 10 ? seconds = `0${seconds}` : false;
    let minutes = Math.floor(time/60);
    minutes <10 ? minutes = `0${minutes}` : false;
    return `${minutes}:${seconds}`
};

// Update progress bar as the video plays
const updateProgress = () => {
    // update progress bar
    progressBar.style.width = `${(video.currentTime / video.duration)*100}%`;
    //  update current time
    progressTime = timeCalculation(video.currentTime);
    currentTime.textContent = `${progressTime} /`;
    // update duration
    calculatedDuration = timeCalculation(video.duration);
    durationEl.textContent = `${calculatedDuration}`;
};

// change playback position when clicked on progress bar
const setProgress = (e) => {
    const clickedPosition = e.offsetX / progressRange.clientWidth;
    const skipVideoToPosition =  video.duration * clickedPosition;
    video.currentTime = skipVideoToPosition;
    progressBar.style.width = `${clickedPosition * 100}%`;
}


// Volume Controls --------------------------- //
function setVolume(e) {
    video.volume = e.offsetX / volumeRange.clientWidth;
    volumeLevel = video.volume;    
    video.volume < 0.1 ? video.volume = 0 : false;
    video.volume > 0.9 ? video.volume = 1 : false;
    video.volume === 0 ? setMuteIcon() : volumeIcon.classList.replace('fa-volume-mute','fa-volume-up');
    volumeBar.style.width = `${video.volume * 100}%`;
    console.log('volumelevel is', video.volume);
}

const setMuteIcon = () => {
    console.log('muted')
    volumeIcon.classList.replace('fa-volume-up','fa-volume-mute');
}

const toggleMute = () => {
    if (volumeIcon.classList.contains('fa-volume-mute')) {
        volumeIcon.classList.replace('fa-volume-mute','fa-volume-up');
        video.volume = volumeLevel;
        console.log(volumeLevel);
        volumeBar.style.width = `${volumeLevel*100}%`;
    } else {
        volumeIcon.classList.replace('fa-volume-up','fa-volume-mute');
        video.volume = 0;
        volumeBar.style.width = '0%';
    }
}


// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event listeners
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', setVolume);
volumeIcon.addEventListener('click', toggleMute);