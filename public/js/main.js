
const gamesContainer = document.getElementById('gamesContainer');

// fetch and show games 
async function fetchGames() {
  try {
    const response = await fetch('/api/games');
    const games = await response.json();
    displayGames(games);
  } catch (err) {
    console.error('Error fetching games:', err);
    showNotification('Failed to load games', 'error');
  }
}

// display games in the DOM 
function displayGames(games) {
  gamesContainer.innerHTML = '';

  if (games.length === 0) {
    gamesContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-gray-400 text-5xl mb-4">
          <i class="fas fa-gamepad"></i>
        </div>
        <h3 class="text-xl font-medium text-gray-300">No games found</h3>
        <p class="text-gray-500 mt-2">Add your first game to get started</p>
        <button id="addFirstGameBtn" class="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium">
          Add Game
        </button>
      </div>
    `;
    document.getElementById('addFirstGameBtn').addEventListener('click', () => {
      document.getElementById('addGameBtn').click();
    });
    return;
  }

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:border-purple-500 game-card';
    gameCard.innerHTML = `
      <div class="relative h-48 overflow-hidden">
        <img src="${game.imageUrl || 'https://via.placeholder.com/400x225?text=No+Image'}" 
             alt="${game.title}" 
             class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div class="flex justify-between items-end">
            <h3 class="text-xl font-bold text-white">${game.title}</h3>
            <span class="bg-purple-600 text-white text-sm font-bold px-2 py-1 rounded-full">
              ${game.rating}/10
            </span>
          </div>
        </div>
      </div>
      <div class="p-5">
        <div class="flex items-center text-sm text-gray-400 mb-3">
          <span class="bg-gray-700 px-2 py-1 rounded mr-2">${game.genre}</span>
          <span>${game.releaseYear}</span>
        </div>
        <p class="text-gray-300 mb-4 line-clamp-3">${game.description}</p>
        <div class="flex space-x-2">
          <button onclick="editGame('${game._id}')" 
                  class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition">
            <i class="fas fa-edit mr-2"></i> Edit
          </button>
          <button onclick="deleteGame('${game._id}')" 
                  class="flex-1 bg-red-600/90 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition">
            <i class="fas fa-trash mr-2"></i> Delete
          </button>
        </div>
      </div>
    `;
    gamesContainer.appendChild(gameCard);
  });
}

// edit game 
window.editGame = async function(id) {
  try {
    const response = await fetch(`/api/games/${id}`);
    const game = await response.json();
    
    document.getElementById('gameId').value = game._id;
    document.getElementById('title').value = game.title;
    document.getElementById('genre').value = game.genre;
    document.getElementById('releaseYear').value = game.releaseYear;
    document.getElementById('rating').value = game.rating;
    document.getElementById('imageUrl').value = game.imageUrl;
    document.getElementById('description').value = game.description;
    
    document.getElementById('modalTitle').textContent = 'Edit Game';
    document.getElementById('gameModal').classList.remove('hidden');
    document.getElementById('gameModal').classList.add('show');
  } catch (err) {
    console.error('Error fetching game:', err);
    showNotification('Failed to load game details', 'error');
  }
};

// del game function
window.deleteGame = async function(id) {
  if (!confirm('Are you sure you want to delete this game?')) return;
  
  try {
    const response = await fetch(`/api/games/${id}`, { method: 'DELETE' });
    if (response.ok) {
      showNotification('Game deleted successfully', 'success');
      fetchGames();
    } else {
      throw new Error('Failed to delete');
    }
  } catch (err) {
    console.error('Error deleting game:', err);
    showNotification('Failed to delete game', 'error');
  }
};

// show notification
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
    type === 'error' ? 'bg-red-600' : 
    type === 'success' ? 'bg-green-600' : 'bg-blue-600'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2', 'transition-all', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchGames);


window.fetchGames = fetchGames;