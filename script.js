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
  const videoContainer = document.querySelector('.video-container');
  const bigPlayButton = document.getElementById('bigPlayButton');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');
  const volumeBtn = document.getElementById('volumeBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  if (video && bigPlayButton) {
    // Big play button functionality
    bigPlayButton.addEventListener('click', function() {
      video.play();
      videoContainer.classList.add('playing');
      if (playIcon && pauseIcon) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
      }
    });

    // Video click to toggle play/pause
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        videoContainer.classList.add('playing');
        if (playIcon && pauseIcon) {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'inline';
        }
      } else {
        video.pause();
        videoContainer.classList.remove('playing');
        if (playIcon && pauseIcon) {
          playIcon.style.display = 'inline';
          pauseIcon.style.display = 'none';
        }
      }
    });
    // Play/Pause functionality
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
          video.play();
          videoContainer.classList.add('playing');
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'inline';
        } else {
          video.pause();
          videoContainer.classList.remove('playing');
          playIcon.style.display = 'inline';
          pauseIcon.style.display = 'none';
        }
      });
    }

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
      videoContainer.classList.remove('playing');
      if (playIcon && pauseIcon) {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      }
      if (progressFill) {
        progressFill.style.width = '0%';
      }
      video.currentTime = 0;
    });

    // Video pause event
    video.addEventListener('pause', function() {
      videoContainer.classList.remove('playing');
    });

    // Video play event
    video.addEventListener('play', function() {
      videoContainer.classList.add('playing');
    });
  }

  // Format time helper function
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  // Navigation Menu Functionality
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section, header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.querySelector('.nav-menu');
  const navList = document.getElementById('navList');

  // Hamburger menu toggle
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('mobile-open');
      }
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 767) {
          hamburgerBtn.classList.remove('active');
          navMenu.classList.remove('mobile-open');
        }
      });
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Highlight active section on scroll
  function updateActiveSection() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // Update active class
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current || 
          link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Listen for scroll events
  window.addEventListener('scroll', updateActiveSection);
  
  // Initial call to set active section
  updateActiveSection();
});