const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const cards = document.querySelectorAll('.card');
    let currentCard = 0;
    cards[currentCard].classList.add('active');
    leftArrow.addEventListener('click', () => {
      cards[currentCard].classList.remove('active');
      currentCard = (currentCard - 1 + cards.length) % cards.length;
      cards[currentCard].classList.add('active');
    });
    rightArrow.addEventListener('click', () => {
      cards[currentCard].classList.remove('active');
      currentCard = (currentCard + 1) % cards.length;
      cards[currentCard].classList.add('active');
    });
    setInterval(() => {
      cards[currentCard].classList.remove('active');
      currentCard = (currentCard + 1) % cards.length;
      cards[currentCard].classList.add('active');
    }, 3000);
