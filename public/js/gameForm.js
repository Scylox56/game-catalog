document.addEventListener('DOMContentLoaded', () => {
  const gameForm = document.getElementById('gameForm');
  const gameModal = document.getElementById('gameModal');
  const addGameBtn = document.getElementById('addGameBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // this opens a modal for new games
  addGameBtn.addEventListener('click', () => {
    gameForm.reset();
    document.getElementById('gameId').value = '';
    document.getElementById('modalTitle').textContent = 'Add New Game';
    gameModal.classList.remove('hidden');
  });

  // close modal
  function closeModal() {
    gameModal.classList.add('hidden');
  }

  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // to handle form submission
  gameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const gameId = document.getElementById('gameId').value;
    const gameData = {
      title: document.getElementById('title').value,
      genre: document.getElementById('genre').value,
      releaseYear: document.getElementById('releaseYear').value,
      rating: document.getElementById('rating').value,
      imageUrl: document.getElementById('imageUrl').value,
      description: document.getElementById('description').value
    };

    try {
      let response;
      if (gameId) {
        // update existing game
        response = await fetch(`/api/games/${gameId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gameData)
        });
      } else {
        // create new game
        response = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gameData)
        });
      }

      if (response.ok) {
        closeModal();
        fetchGames(); // refresh the game list
      }
    } catch (err) {
      console.error('Error saving game:', err);
    }
  });
});

// helper function to refresh game list 
function fetchGames() {
  if (window.fetchGames) {
    window.fetchGames();
  }
}