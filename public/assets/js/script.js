const addNewGame = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const gametype = document.querySelector('#type').value.trim();
    const minplayers = document.querySelector('#minplayers').value.trim();
    const maxplayers = document.querySelector('#maxplayers').value.trim();

    if (name && gametype && minplayers && maxplayers) {
        const response = await fetch('/user/game/new', {
            method: 'POST',
            body: JSON.stringify({ name, gametype, minplayers, maxplayers}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            console.log('added game successfully');
        } else {
            alert('Failed to add game');
        }
    }
}

document
    .querySelector('#addGameForm')
    .addEventListener('submit', addNewGame);
