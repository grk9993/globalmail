document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.cards');
  const originalCards = document.querySelectorAll('.card');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  
  let currentIndex = 0;
  const cardCount = originalCards.length;
  let autoScrollInterval;
  let isHovered = false;
  
  // Clone cards and set up the slider
  function initializeSlider() {
    // Clear existing content
    cardsContainer.innerHTML = '';
    
    // Add original cards
    originalCards.forEach(card => {
      cardsContainer.appendChild(card.cloneNode(true));
    });
    
    // Add clones for infinite scroll
    originalCards.forEach(card => {
      cardsContainer.appendChild(card.cloneNode(true));
    });
    
    updateSliderPosition();
  }
  
  function updateSliderPosition(smooth = true) {
    const cardWidth = document.querySelector('.card').offsetWidth;
    const gap = 30; // Same as CSS gap
    const offset = -(currentIndex * (cardWidth + gap));
    
    cardsContainer.style.transition = smooth ? 'transform 0.5s ease' : 'none';
    cardsContainer.style.transform = `translateX(${offset}px)`;
  }
  
  function slideRight() {
    currentIndex++;
    updateSliderPosition();
    
    // If we've scrolled past all original cards
    if (currentIndex >= cardCount) {
      // Wait for transition to finish
      setTimeout(() => {
        // Reset to first card without transition
        currentIndex = 0;
        updateSliderPosition(false);
      }, 500);
    }
  }
  
  function slideLeft() {
    currentIndex--;
    updateSliderPosition();
    
    // If we've scrolled to the clones
    if (currentIndex < 0) {
      // Wait for transition to finish
      setTimeout(() => {
        // Reset to last original card without transition
        currentIndex = cardCount - 1;
        updateSliderPosition(false);
      }, 500);
    }
  }
  
  function startAutoScroll() {
    if (!autoScrollInterval) {
      autoScrollInterval = setInterval(slideRight, 3000);
    }
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }
  
  // Initialize slider
  initializeSlider();
  startAutoScroll();
  
  // Event listeners
  cardsContainer.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoScroll();
  });
  
  cardsContainer.addEventListener('mouseleave', () => {
    isHovered = false;
    startAutoScroll();
  });
  
  leftArrow.addEventListener('click', () => {
    slideLeft();
    stopAutoScroll();
    if (!isHovered) {
      setTimeout(startAutoScroll, 2000);
    }
  });
  
  rightArrow.addEventListener('click', () => {
    slideRight();
    stopAutoScroll();
    if (!isHovered) {
      setTimeout(startAutoScroll, 2000);
    }
  });
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSliderPosition(false);
    }, 100);
  });
});
