const audioIds = ['audio1', 'audio2', 'audio3', 'audio4', 'audio5', 'audio6', 'audio7', 'audio8'];
let currentlyPlayingAudio = null;

function togglePlayPause(audioId, button) {
    const audio = document.getElementById(audioId);
    const playIcon = button.querySelector('.play-icon');
    const pauseIcon = button.querySelector('.pause-icon');

    // Pause the currently playing audio if it is different from the clicked one
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        const currentButton = document.querySelector(`button[onclick*="${currentlyPlayingAudio.id}"]`);
        if (currentButton) {
            const currentPlayIcon = currentButton.querySelector('.play-icon');
            const currentPauseIcon = currentButton.querySelector('.pause-icon');
            currentPlayIcon.style.display = 'block';
            currentPauseIcon.style.display = 'none';
        }
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

function pauseAllAudios() {
    audioIds.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset time to the start
        }
    });
    currentlyPlayingAudio = null;
}

// Stop the audio when the article is closed
document.querySelectorAll('article').forEach(article => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'style' && mutation.target.style.display === 'none') {
                const audio = mutation.target.querySelector('audio');
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    const button = mutation.target.querySelector('.control-button');
                    if (button) {
                        const playIcon = button.querySelector('.play-icon');
                        const pauseIcon = button.querySelector('.pause-icon');
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                    }
                    // Reset the currentlyPlayingAudio if it's the one being paused
                    if (currentlyPlayingAudio === audio) {
                        currentlyPlayingAudio = null;
                    }
                }
            }
        });
    });

    observer.observe(article, { attributes: true });
});

window.addEventListener('beforeunload', pauseAllAudios);
