document.addEventListener('DOMContentLoaded', function() {
    const audios = document.querySelectorAll('audio');
    let currentAudio = null;

    audios.forEach(audio => {
        audio.addEventListener('play', () => {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = audio;
        });

        audio.addEventListener('ended', () => {
            currentAudio = null;
        });
    });

    window.addEventListener('hashchange', checkVisibleAudio);
    window.addEventListener('load', checkVisibleAudio);

    function checkVisibleAudio() {
        const hash = window.location.hash;
        if (currentAudio && !document.querySelector(hash).contains(currentAudio)) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }

    window.togglePlayPause = function(audioId, button) {
        const audio = document.getElementById(audioId);
        const playIcon = button.querySelector('.play-icon');
        const pauseIcon = button.querySelector('.pause-icon');

        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    };

    window.skipTime = function(audioId, time) {
        const audio = document.getElementById(audioId);
        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + time));
    };

    function updateIcons() {
        const buttons = document.querySelectorAll('.control-button');
        buttons.forEach(button => {
            const audioId = button.closest('.play-button-container').nextElementSibling.id;
            const audio = document.getElementById(audioId);
            const playIcon = button.querySelector('.play-icon');
            const pauseIcon = button.querySelector('.pause-icon');

            if (audio.paused) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
        });
    }

    setInterval(updateIcons, 100);
});

document.addEventListener('DOMContentLoaded', function () {
            const audios = document.querySelectorAll('audio');

            audios.forEach(audio => {
                const audioId = audio.id.match(/\d+/)[0]; // Get the numeric part from the id
                const seekBar = document.getElementById(`seek-bar${audioId}`);
                const currentTimeDisplay = document.getElementById(`current-time${audioId}`);
                const durationDisplay = document.getElementById(`duration${audioId}`);

                audio.addEventListener('loadedmetadata', () => {
                    durationDisplay.textContent = formatTime(audio.duration);
                    seekBar.max = audio.duration;
                });

                audio.addEventListener('timeupdate', () => {
                    currentTimeDisplay.textContent = formatTime(audio.currentTime);
                    seekBar.value = audio.currentTime;
                });

                seekBar.addEventListener('input', () => {
                    audio.currentTime = seekBar.value;
                });
            });
        });

        function togglePlayPause(audioId, button) {
            const audio = document.getElementById(audioId);
            const playIcon = button.querySelector('.play-icon');
            const pauseIcon = button.querySelector('.pause-icon');
            if (audio.paused) {
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                audio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        }

        function skipTime(audioId, time) {
            const audio = document.getElementById(audioId);
            audio.currentTime += time;
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
