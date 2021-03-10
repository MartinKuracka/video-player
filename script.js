const player = document.querySelector('.player');
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
const speed = document.querySelector('.player-speed');
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
const changeVolumeIcon = (volume) => {
    volumeIcon.className = '';
    if (volume > 0.4) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume > 0 && volume <= 0.4) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute')
    }
 }

function setVolume(e) {
    video.volume = e.offsetX / volumeRange.clientWidth;    
    video.volume < 0.1 ? video.volume = 0 : false;
    video.volume > 0.9 ? video.volume = 1 : false;
    volumeLevel = video.volume;
    // volume === 0 ? setMuteIcon() : volumeIcon.classList.replace('fa-volume-mute','fa-volume-up');
    volumeBar.style.width = `${video.volume * 100}%`;
    console.log('volumelevel is', volumeLevel);
    changeVolumeIcon(video.volume);
    // Change icons based on volume level

}

const setMuteIcon = () => {
    console.log('muted')
    volumeIcon.classList.replace('fa-volume-up','fa-volume-mute');
}

const toggleMute = () => {
    if (volumeIcon.classList.contains('fa-volume-mute')) {
        video.volume = volumeLevel;
        changeVolumeIcon(video.volume);
        console.log(volumeLevel);
        volumeBar.style.width = `${volumeLevel*100}%`;
    } else {
        volumeIcon.className = '';
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        video.volume = 0;
        volumeBar.style.width = '0%';
    }
}


// Change Playback Speed -------------------- //
const changeSpeed = (e) => {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
/* Close fullscreen */
function closeFullscreen() {
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
}
video.classList.remove('video-fullscreen');

};

let fullscreen = false
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}

// Event listeners
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', setVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen)