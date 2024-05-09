// Listen for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Async function to handle adding a new game via form submission
    const addNewGame = async (event) => {
        event.preventDefault(); // Prevents the form from submitting traditionally
        checkSessionStatus(); // Checks if the user session is still active
        const hidethistoo = document.querySelector('#hidethistoo');
        hidethistoo.style.display = "none"; // Hides the element with id 'hidethistoo'
        const hidethis = document.querySelector('#hidethis');
        hidethis.style.display = "none"; // Hides the element with id 'hidethis'

        // Retrieves values from form inputs
        const tagsInput = document.querySelector('#tags');
        const nameInput = document.querySelector('#name');
        const gametypeInput = document.querySelector('#type');
        const minplayersInput = document.querySelector('#minplayers');
        const maxplayersInput = document.querySelector('#maxplayers');
        var addGameModal = document.getElementById('addGameModal');

        // Trims input values and sets defaults if empty
        const tags = tagsInput ? tagsInput.value.trim() : 'tagless';
        const name = nameInput ? nameInput.value.trim() : 'noname';
        const gametype = gametypeInput ? gametypeInput.value.trim() : 'Card';
        const minplayers = minplayersInput ? minplayersInput.value.trim() : '0';
        const maxplayers = maxplayersInput ? maxplayersInput.value.trim() : '0';

        // If all fields are filled, sends a POST request to add the game
        if (name && gametype && minplayers && maxplayers && tags) {
            const response = await fetch('/user/game/new', {
                method: 'POST',
                body: JSON.stringify({ name, gametype, minplayers, maxplayers, tags }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log('added game successfully', name, gametype, minplayers, maxplayers, tags);
                addGameModal.style.display = 'none'; // Hides the modal on success
                setTimeout(() => {
                    location.reload(); // Reloads the page after 100ms
                }, 100);
            } else {
                console.log('Failed to add game'); // Logs failure to console
            }
        }
    };

    // Adds event listener to the form submit action
    const addGameForm = document.querySelector('#addGameForm');
    if (addGameForm) {
        addGameForm.addEventListener('submit', addNewGame);
    } else {
        console.log('no addgameform');
    }

    // Event listener for opening the add game modal
    var addGameBtn = document.getElementById('addGameBtn');
    addGameBtn.addEventListener('click', function(event) {
        event.preventDefault();
        checkSessionStatus(); // Checks session status when attempting to open the modal
        const hidethis = document.querySelector('#hidethis');
        hidethis.style.display = "none";
        addGameModal.style.display = "block"; // Shows the add game modal
    });

    var closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', function(event) {
        event.preventDefault();
        const hidethis = document.querySelector('#hidethis');
        hidethis.style.display = "block";
        addGameModal.style.display = "none";
    })

    // Event listener for a delete button, to handle game deletion
    const dltBtn = document.querySelector('#dltbtn');
    if (dltBtn){
        dltBtn.addEventListener('click', async function(event){
            console.log('click')
            event.preventDefault();
            checkSessionStatus();
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
                console.error(err) // Logs error to console if exception occurs
            }
        })
    } else {
        console.log('no dltbtn');
    }

    // Function to check the status of the user session
    function checkSessionStatus() {
        fetch('/session-status')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'inactive') {
                    window.location.reload(true); // Reloads the page if session is inactive
                } else {
                    console.log('Session active');
                }
            })
            .catch(error => console.error('Error checking session status:', error));
    }

    // Retrieve the current path from the window's location
const path = window.location.pathname;
let className = 'defaultbg'; // Default class name for the background

// Determine the background class based on the current path
if (path === '/' || path.includes('gamepad')) {
    className = 'homebg'; // Set class for homepage or gamepad related pages
} else if (path.includes('login')) {
    className = 'loginbg'; // Set class for login pages
}

// Add the determined class to the body's class list
document.body.classList.add(className);
    // Continuously checks the session status every minute
setInterval(checkSessionStatus, 5 * 60 * 1000)


document.getElementById('refreshBtn').addEventListener('click', function(e){
    e.preventDefault();
    location.reload();
})
});

