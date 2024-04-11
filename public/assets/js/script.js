document.addEventListener('DOMContentLoaded', function() {
const addNewGame = async (event) => {
    event.preventDefault();
    
    const tagsInput = document.querySelector('#tags');
    const nameInput = document.querySelector('#name');
    const gametypeInput = document.querySelector('#type');
    const minplayersInput = document.querySelector('#minplayers');
    const maxplayersInput = document.querySelector('#maxplayers');
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
            setTimeout(() => {
                location.reload();
            }, 100);
        } else {
            console.log('Failed to add game');
        }
    }
};

const addGameForm = document.querySelector('#addGameForm');
if (addGameForm) {
    addGameForm.addEventListener('submit', addNewGame);
} else {
    console.log('no addgameform');
}

//Shows the modal when the 'Add new game' button is clicked
var addGameBtn = document.getElementById( 'addGameBtn' );
addGameBtn.addEventListener( 'click', function() {
    addGameModal.style.display = "block";
}); 

const dltBtn = document.querySelector('#dltbtn');
if (dltBtn){
    dltBtn.addEventListener('click', async function(event){
      event.preventDefault();
        try {
            const parentEl = event.target.parentNode;
            const targetId = parentEl.id;
            const response = await fetch(`/user/game/${targetId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            setTimeout(() => {
              location.reload();
            }, 250)
            if (response.ok) {
                console.log('deleted game successfully');
            } else {
                alert('Failed to delete game');
            }
        } catch (err) {
            console.error(err)
        }
    })
} else {
    console.log('no maidens');
}

  var closeModalBtn = document.getElementById('closeModal');


  closeModalBtn.addEventListener('click', function() {
    event.preventDefault();
      addGameModal.style.display = "none";
  });


var modalOverlay = document.getElementById('modalOverlay');

const path = window.location.pathname;
let className = 'defaultbg';

if (path === '/') {
    className = 'homebg';
} else if (path.includes('login')) {
    className = 'loginbg';
}

document.body.classList.add(className);

});



