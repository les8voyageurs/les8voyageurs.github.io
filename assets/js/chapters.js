document.addEventListener('DOMContentLoaded', function () {
    const chapters = [
        { id: 'ch1', title: 'Chapitre 1', description: 'La Chasse', image: 'images/C1i.webp', audio: 'Voix/C1.m4a' },
        { id: 'ch2', title: 'Chapitre 2', description: 'L\'étrange Marchand', image: 'images/C2i.webp', audio: 'Voix/C2.m4a' },
        { id: 'ch3', title: 'Chapitre 3', description: 'Le Pacte', image: 'images/C3i.webp', audio: 'Voix/C3.mp3' },
        { id: 'ch4', title: 'Chapitre 4', description: 'Le Départ', image: 'images/C4i.webp', audio: 'Voix/C4.mp3' },
        { id: 'ch5', title: 'Chapitre 5', description: 'La Rencontre Inattendue', image: 'images/C5i.webp', audio: 'Voix/C5.mp3' },
        { id: 'ch6', title: 'Chapitre 6', description: 'Les Murmures de la Forêt', image: 'images/C6i.webp', audio: 'Voix/C6.m4a' },
        { id: 'ch7', title: 'Chapitre 7', description: 'Le Dilemme de la Route', image: 'images/C7i.webp', audio: 'Voix/C7.mp3' },
        { id: 'ch8', title: 'Chapitre 8', description: 'Mayim’Bolor', image: 'images/C8i.webp', audio: 'Voix/C8.mp3' },
        { id: 'ch9', title: 'Chapitre 9', description: 'Les Echos de la Ville Noyée', image: 'images/C9i.webp', audio: 'Voix/C9.mp3' },
        { id: 'ch10', title: 'Chapitre 10', description: 'Frères de Baston', image: 'images/C10i.webp', audio: 'Voix/C10.mp3' },
        { id: 'ch11', title: 'Chapitre 11', description: 'Révélation et Décision', image: 'images/C11i.webp', audio: 'Voix/C11.mp3' },
        { id: 'ch12', title: 'Chapitre 12', description: 'La Nuit Porte Conseil', image: 'images/C12i.webp', audio: 'Voix/C12.mp3' },
        { id: 'ch13', title: 'Chapitre 13', description: 'L\'Ombre du Passé', image: 'images/C13i.webp', audio: 'Voix/C13.mp3' },
        { id: 'ch14', title: 'Chapitre 14', description: 'Bois Marin', image: 'images/C14i.webp', audio: 'Voix/C14.mp3' },
        // Add more chapters here
    ];

    const navList = document.getElementById('nav-list');
    const mainContent = document.getElementById('main');

    chapters.forEach((chapter, index) => {
        // Create nav links
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.href = `#${chapter.id}`;
        navLink.textContent = chapter.title;
        navItem.appendChild(navLink);
        navList.appendChild(navItem);

        // Create chapter articles
        const article = document.createElement('article');
        article.id = chapter.id;
        article.innerHTML = `
            <h2 class="major">${chapter.title}</h2>
            <p>${chapter.description}</p>
            <span class="image main"><img src="${chapter.image}" alt="" /></span>
            <audio id="audio${index + 1}" src="${chapter.audio}"></audio>
            <div class="audio-controls">
                <span class="time" id="current-time${index + 1}">0:00</span>
                <input type="range" id="seek-bar${index + 1}" class="slider" value="0">
                <span class="time" id="duration${index + 1}">0:00</span>
            </div>
            <div class="play-button-container">
                <button class="control-button" onclick="skipTime('audio${index + 1}', -10)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 19V5l-7 7 7 7zm0-7l7 7V5l-7 7z"/>
                    </svg>
                </button>
                <button class="control-button" onclick="togglePlayPause('audio${index + 1}', this)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <g class="play-icon">
                            <path d="M8 5v14l11-7z"/>
                        </g>
                        <g class="pause-icon" style="display:none;">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </g>
                    </svg>
                </button>
                <button class="control-button" onclick="skipTime('audio${index + 1}', 10)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 5v14l7-7-7-7zm7 0v14l7-7-7-7z"/>
                    </svg>
                </button>
            </div>
        `;
        mainContent.appendChild(article);
    });

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
