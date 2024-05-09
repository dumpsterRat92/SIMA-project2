const closeModal = document.getElementById('pickGameCloseModal');
const pickGameModal = document.querySelector('#pickGameModal')
const pickGameForm = document.querySelector('#pickGameForm');
const gameContainer2 = document.getElementById('gamelist');
const randomGameBtn = document.querySelector('#random');
const pickBtn = document.querySelector('#pickGameBtn');
const hidethis = document.querySelector('#hidethis');

pickBtn.addEventListener('click', function(e){
    e.preventDefault();
    hidethis.style.display = "none";
    pickGameModal.style.display = "block";
    
});

closeModal.addEventListener('click', function(e) {
    e.preventDefault();
    hidethis.style.display = "block";
    pickGameModal.style.display = "none";
});

if (pickGameForm) {
    pickGameForm.addEventListener('submit', async function(e){
        e.preventDefault();
        await gamePicker(false);
    });
    randomGameBtn.addEventListener('click', async function(e){
        e.preventDefault();
        await gamePicker(true);
    });
} else {
    console.log('no pickgameform');
}

async function gamePicker(boolean){
    const type = document.querySelector('#picktype').value;
    const tag = document.querySelector('#picktag').value;
    const playerCount = document.querySelector('#playerCount').value;
    const pickGameURL = '/user/game/pick';
    var queries = {}
    if(type){
        queries.type = type
    }
    if(tag){
        queries.tag = tag
    }
    if(playerCount){
        queries.playerCount = playerCount
    }
    console.log(queries)
    const queryString = Object.keys(queries)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`)
        .join('&');
        console.log(queryString)
    var url = '';
    if (queryString){
        url = `${pickGameURL}?${queryString}`
    } else {
        url = pickGameURL
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if(data.length==0){
            alert('No games found matching your criteria! :(')
        } else {
            if(boolean){
                gamePickerRandom(data)
                hidethis.style.display = "block";
                pickGameModal.style.display = "none";
            } else {
                displayPickedGames(data)
                hidethis.style.display = "block";
                pickGameModal.style.display = "none";
            }
        }
    } catch (err) {
        console.error(err)
    }
}

function displayPickedGames(data){
    gameContainer2.innerHTML = '';

    data.forEach(game => {

        const gameCard = document.createElement('div');
        gameCard.id = game.id;
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.minplayers}-${game.maxplayers}</p>
            <p>${game.gametype.name}</p>
            <p>${game.tags[0].name}</p>
            <a id="dltbtn" href="">Delete Game</a>
        `;

        gameContainer2.appendChild(gameCard);
    });
}

function gamePickerRandom(data){
    const pickedGame = data[randomizer(data)]
    console.log(pickedGame)
    gameContainer2.innerHTML = `<div id="${pickedGame.id}" class="game-card">
    <h3>${pickedGame.name}</h3>
    <p>${pickedGame.minplayers}-${pickedGame.maxplayers}</p>
    <p>${pickedGame.gametype.name}</p>
    <p>${pickedGame.tags[0].name}</p>
    <a id="dltbtn" href="">Delete Game</a>
  </div>`
}

function randomizer(arr){
    return Math.floor(Math.random()*arr.length)
}