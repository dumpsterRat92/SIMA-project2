document.addEventListener('DOMContentLoaded', function() {
    const addNewGame = async (event) => {
      event.preventDefault();
  
      const tagsInput = document.querySelector('#tags');
      const nameInput = document.querySelector('#name');
      const gametypeInput = document.querySelector('#type');
      const minplayersInput = document.querySelector('#minplayers');
      const maxplayersInput = document.querySelector('#maxplayers');
      var addGameBtn = document.getElementById( 'addGameBtn' );
      var addGameModal = document.getElementById( 'addGameModal' );
  
      const tags = tagsInput ? tagsInput.value.trim() : 'tagless'
      const name = nameInput ? nameInput.value.trim() : 'noname';
      const gametype = gametypeInput ? gametypeInput.value.trim() : 'Card';
      const minplayers = minplayersInput ? minplayersInput.value.trim() : '0';
      const maxplayers = maxplayersInput ? maxplayersInput.value.trim() : '0';
  
      
      if (name && gametype && minplayers && maxplayers && tags) {
        const response = await fetch('/user/game/new', {
          method: 'POST',
          body: JSON.stringify({ name, gametype, minplayers, maxplayers, tags }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          console.log('added game successfully', name, gametype, minplayers, maxplayers, tags);
          addGameModal.style.display = 'none';
        } else {
          alert('Failed to add game');
        }
      }
    };
    
    // const loadGames = async ()=>{
    //     try {
    //         const games = await fetchGames();
    //         console.log(games);
    //         return games;
    //     } catch (err) {
    //         console.error('Failed to load bruh', error);
    //         throw error
    //     }
    // }

    // const fetchGames = async () => {
    //     const response = await fetch('/user/game')
    // }

    const addGameForm = document.querySelector('#addGameForm');
    if (addGameForm) {
      addGameForm.addEventListener('submit', addNewGame);
    } else {
        console.log('no addgameform');
    }

        //Shows the modal when the 'Add new game' button is clicked
        addGameBtn.addEventListener( 'click', function() {
          addGameModal.style.display = "block";
        });  
  });

  