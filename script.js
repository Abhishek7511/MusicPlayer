document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector('.play');
    const audioPlayer = document.querySelector('audio');
    const progressBar = document.querySelector('.progress-bar');
    const progressHead = document.querySelector('.progress-head');
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');
    const audioTitle = document.querySelector('.audio-title');
    const audioSinger = document.querySelector('.audio-singer');

    const tracks = [
        {
            name: "Let me down slowly",
            artist: "Alec Benjamin",
            cover: "https://via.placeholder.com/150", // Placeholder URL, replace with actual cover image URLs
            source: "Let me down slowly.mp3",
        },
        {
            name: "Let me love you",
            artist: "DJ Snake/Justin Beiber",
            cover: "https://via.placeholder.com/150", // Placeholder URL, replace with actual cover image URLs
            source: "Let me love you.mp3",
        },
        {
            name: "Perfect",
            artist: "Ed Sheeran",
            cover: "https://via.placeholder.com/150", // Placeholder URL, replace with actual cover image URLs
            source: "Perfect.mp3",
        },
    ];

    let currentTrackIndex = 0;

    // Load initial track
    loadTrack(currentTrackIndex);

    function loadTrack(index) {
        const track = tracks[index];
        audioPlayer.src = track.source;
        audioTitle.textContent = track.name;
        audioSinger.textContent = track.artist;
        // Update cover image
        document.querySelector('.audio-img img').src = track.cover;
        resetProgress();
    }

    function resetProgress() {
        progressBar.value = 0;
        progressHead.style.left = '0';
        currentTime.textContent = '00:00';
        duration.textContent = '00:00';
    }

    function playTrack() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        progressHead.style.left = `${progressPercent}%`;
        currentTime.textContent = formatTime(currentTime);
        duration.textContent = formatTime(duration);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }

    // Event listeners
    playBtn.addEventListener('click', playTrack);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('click', setProgress);
});
