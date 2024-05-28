const audioIds = ['audio1', 'audio2', 'audio3', 'audio4', 'audio5', 'audio6', 'audio7', 'audio8'];
let currentlyPlayingAudio = null;

function togglePlayPause(audioId, button) {
    const audio = document.getElementById(audioId);
    const playIcon = button.querySelector('.play-icon');
    const pauseIcon = button.querySelector('.pause-icon');

    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        resetPlayPauseButton(currentlyPlayingAudio);
        currentlyPlayingAudio = null;
    }

    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        currentlyPlayingAudio = audio;
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        currentlyPlayingAudio = null;
    }
}

function skipTime(audioId, time) {
    const audio = document.getElementById(audioId);
    audio.currentTime += time;
}

function resetPlayPauseButton(audio) {
    const button = document.querySelector(`button[onclick*="${audio.id}"]`);
    if (button) {
        const playIcon = button.querySelector('.play-icon');
        const pauseIcon = button.querySelector('.pause-icon');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

function pauseAllAudios() {
    audioIds.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset time to the start
            resetPlayPauseButton(audio);
        }
    });
    currentlyPlayingAudio = null;
}

// Stop the audio when the article is closed
document.querySelectorAll('article').forEach(article => {
    article.addEventListener('click', () => {
        const audio = article.querySelector('audio');
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            resetPlayPauseButton(audio);
            currentlyPlayingAudio = null;
        }
    });
});

window.addEventListener('beforeunload', pauseAllAudios);
