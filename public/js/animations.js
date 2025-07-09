// Modal Animation
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gameModal');
  const modalContent = document.getElementById('modalContent');
  
  // Show modal with animation
  function showModal() {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('show');
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  }
  
  // Hide modal with animation
  function hideModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modal.classList.remove('show');
      modal.classList.add('hidden');
    }, 300);
  }
  
  // Add event listeners
  document.getElementById('addGameBtn')?.addEventListener('click', showModal);
  document.getElementById('closeModalBtn')?.addEventListener('click', hideModal);
  document.getElementById('cancelBtn')?.addEventListener('click', hideModal);
  
  // Game card hover effects
  const gameCards = document.querySelectorAll('#gamesContainer > div');
  gameCards.forEach(card => {
    card.classList.add('game-card');
    
    // Add 3D tilt effect
    card.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  });
});