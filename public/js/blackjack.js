const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();
let players = new Array();
let currentPlayer = 0;

// Create Deck
const createDeck = () => {
    deck = new Array();
    for (let i = 0 ; i < values.length; i++) {
        for(let x = 0; x < suits.length; x++) {

            let weight = parseInt(values[i]);

            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                weight = 10;
            }
            if (values[i] == "A") {
                weight = 11;
            }

            let card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

// Create players array
const createPlayers = () => {
    players = new Array();

    for(let i = 1; i < 3; i++) {

        let hand = new Array();

        let player = { Name: `Player_${i}`, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

// Create the UI for each player
const createPlayersUI = () => {
    $("#players").empty();
    for(let i = 0; i < players.length; i++) {
        const div_player = document.createElement('div');
        const div_playerid = document.createElement('div');
        const div_hand = document.createElement('div');
        const div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = `points_${i}`;
        div_player.id = `player_${i}`;
        div_player.className = 'player';
        div_hand.id = `hand_${i}`;

        div_playerid.innerHTML = `Player ${players[i].ID}`;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

// Shuffle the cards
const shuffle = () => {
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

// Deal the cards to each player
const dealHands = () => {
    for(let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            let card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
    updateDeck();
}

// Render the card
const renderCard = (card, player) => {
    const hand = document.getElementById(`hand_${player}`);
    hand.append(getCardUI(card));
}

// Get the card UI
const getCardUI = (card) => {
    const el = document.createElement('div');
    let icon = '';

    if (card.Suit == 'Hearts') {
        icon='&hearts;'
    }
    else if (card.Suit == 'Spades'){
        icon = '&spades;'
    }
    else if (card.Suit == 'Diamonds'){
        icon = '&diams;'
    }
    else {
        icon = '&clubs;';
    }

    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;

    return el;
}

// Gets the points a player has
const getPoints = (player) => {
    let points = 0;
    for(let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

// Updates the points each player has
const updatePoints = () => {
    for (let i = 0 ; i < players.length; i++) {
        getPoints(i);
        document.getElementById(`points_${i}`).innerHTML = players[i].Points;
    }
}

// Hit Me Function
const hitMe = () => {
    const card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
}

// Stay Function
const stay = () => {
    if (currentPlayer != players.length-1) {
        document.getElementById(`player_${currentPlayer}`).classList.remove('active');
        currentPlayer += 1;
        document.getElementById(`player_${currentPlayer}`).classList.add('active');
    }
    else {
        end();
    }
}

// Run final point check for each player
const end = () => {
    
    let winner;
    let score = 0;

    if (players[1].Points === players[0].Points) {
        $("#status").html(`Tie!`);
        $("#status").show();
    }

    for(let i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }
        score = players[i].Points;
    }

    $("#status").html(`Winner: Player ${players[winner].ID}`);
    $("#status").show();
}

// Check if a player has more than 21 points
const check = () => {
    if (players[0].Points > 21) {
        $("#status").html(`Player ${players[0].ID} Lost`);
        $("#status").show();
        end();
    }
    if (players[1].Points > 21) {
        $("#status").html(`Player ${players[1].ID} Lost`);
        $("#status").show();
        end();
    }
}

// Update the deck count
const updateDeck = () => {
    document.getElementById('deckcount').innerHTML = deck.length;
}

// Start the game
const startblackjack = () => {
    $("#startBtn").val("restart");
    $("#status").hide();

    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    $(`player_${currentPlayer}`).addClass('active');
}