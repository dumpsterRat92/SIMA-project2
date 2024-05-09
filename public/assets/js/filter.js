const filterByDropdown = document.getElementById('filterBy');
const gameContainer = document.getElementById('gamelist');

// Function to filter and rearrange game cards based on selected filter
function filterAndRearrangeCards() {
  const selectedFilter = filterByDropdown.value;

  // Get all game cards
  const gameCards = Array.from(gameContainer.getElementsByClassName('game-card'));

  // Sort game cards based on selected filter
  switch (selectedFilter) {
    case 'playerCount':
      gameCards.sort((a, b) => {
        const playerCountA = a.querySelector('p:nth-of-type(1)').textContent;
        const playerCountB = b.querySelector('p:nth-of-type(1)').textContent;
        return playerCountA.localeCompare(playerCountB);
      });
      break;
    case 'gameType':
      gameCards.sort((a, b) => {
        const gameTypeA = a.querySelector('p:nth-of-type(2)').textContent;
        const gameTypeB = b.querySelector('p:nth-of-type(2)').textContent;
        return gameTypeA.localeCompare(gameTypeB);
      });
      break;
    case 'tag':
      gameCards.sort((a, b) => {
        const tagA = a.querySelector('p:nth-of-type(3)').textContent.trim();
        const tagB = b.querySelector('p:nth-of-type(3)').textContent.trim();
        return tagA.localeCompare(tagB);
      });
      break;
    default:
      // For 'all' filter, display in original order
      gameCards.sort((a,b)=>{
        const nameA = a.querySelector('h3:nth-of-type(1)').textContent;
        const nameB = b.querySelector('h3:nth-of-type(1)').textContent;
        return nameA.localeCompare(nameB);
      })
      break;
  }

  // Remove existing game cards from container
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  // Append sorted game cards to the container
  gameCards.forEach(card => {
    gameContainer.appendChild(card);
  });
}

// Event listener to trigger filterAndRearrangeCards() when filter dropdown changes
filterByDropdown.addEventListener('change', filterAndRearrangeCards);

// Initial call to filterAndRearrangeCards() to display cards in default order
filterAndRearrangeCards();