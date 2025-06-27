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
});