document.addEventListener('DOMContentLoaded', function() {
    const addNewGame = async (event) => {
      event.preventDefault();
  
      const nameInput = document.querySelector('#name');
      const gametypeInput = document.querySelector('#type');
      const minplayersInput = document.querySelector('#minplayers');
      const maxplayersInput = document.querySelector('#maxplayers');
  
      const name = nameInput ? nameInput.value.trim() : 'noname';
      const gametype = gametypeInput ? gametypeInput.value.trim() : 'Card';
      const minplayers = minplayersInput ? minplayersInput.value.trim() : '0';
      const maxplayers = maxplayersInput ? maxplayersInput.value.trim() : '0';
  
      if (name && gametype && minplayers && maxplayers) {
        const response = await fetch('/user/game/new', {
          method: 'POST',
          body: JSON.stringify({ name, gametype, minplayers, maxplayers }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          console.log('added game successfully', name, gametype, maxplayers, minplayers);
        } else {
          alert('Failed to add game');
        }
      }
    };
  
    const addGameForm = document.querySelector('#addGameForm');
    if (addGameForm) {
      addGameForm.addEventListener('submit', addNewGame);
    } else {
        console.log('no addgameform');
    }
  });