// Image overlay functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'image-overlay';
  overlay.innerHTML = `
    <button class="overlay-close">&times;</button>
    <img class="overlay-image" src="" alt="">
  `;
  document.body.appendChild(overlay);

  const overlayImage = overlay.querySelector('.overlay-image');
  const closeButton = overlay.querySelector('.overlay-close');

  // Find all clickable images
  const clickableImages = document.querySelectorAll('.gallery img, .main-img, .director img, .director-photo');

  // Add click event to each image
  clickableImages.forEach(img => {
    img.addEventListener('click', function() {
      overlayImage.src = this.src;
      overlayImage.alt = this.alt;
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close overlay when clicking outside image or on close button
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target === closeButton) {
      closeOverlay();
    }
  });

  // Close overlay with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      closeOverlay();
    }
  });

  function closeOverlay() {
    overlay.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Custom Video Controls Functionality
  const video = document.querySelector('.custom-video');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');
  const volumeBtn = document.getElementById('volumeBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  if (video) {
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
      } else {
        video.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      }
    });

    // Update progress bar
    video.addEventListener('timeupdate', function() {
      const progress = (video.currentTime / video.duration) * 100;
      progressFill.style.width = progress + '%';
      currentTimeDisplay.textContent = formatTime(video.currentTime);
    });

    // Set duration when metadata loads
    video.addEventListener('loadedmetadata', function() {
      durationDisplay.textContent = formatTime(video.duration);
    });

    // Progress bar click functionality
    progressBar.addEventListener('click', function(e) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progressWidth = rect.width;
      const clickTime = (clickX / progressWidth) * video.duration;
      video.currentTime = clickTime;
    });

    // Volume toggle
    volumeBtn.addEventListener('click', function() {
      if (video.muted) {
        video.muted = false;
        volumeBtn.textContent = '🔊';
      } else {
        video.muted = true;
        volumeBtn.textContent = '🔇';
      }
    });

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function() {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });

    // Video ended event
    video.addEventListener('ended', function() {
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      progressFill.style.width = '0%';
      video.currentTime = 0;
    });
  }

  // Format time helper function
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }
});