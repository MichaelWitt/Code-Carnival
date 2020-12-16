// Make player 2 automatic?
// JQuery updates?
// Stop ability to press start again and again without playing
// Fix loser/winner display error

const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();
let players = new Array();
let currentPlayer = 0;

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

const createPlayers = () => {
    players = new Array();

    for(let i = 1; i < 3; i++) {

        let hand = new Array();

        let player = { Name: `Player_${i}`, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

const createPlayersUI = () => {
    $("#players").empty();
    for(let i = 0; i < players.length; i++) {
        const div_player = document.createElement('div');
        const div_playerid = document.createElement('div');
        const div_hand = document.createElement('div');
        const div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = 'Player ' + players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

const shuffle = () => {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

const dealHands = () => {
    // alternate handing cards to each player
    // 2 cards each
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

const renderCard = (card, player) => {
    const hand = document.getElementById('hand_' + player);
    hand.append(getCardUI(card));
    // let hand = $(`#hand_${player}`);
    // console.log('player:', player)
    // console.log('hand:', hand)
    // hand.append(getCardUI(card));
}

const getCardUI = (card) => {
    var el = document.createElement('div');

    ;
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

// returns the number of points that a player has in hand
const getPoints = (player) => {
    let points = 0;
    for(let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

const updatePoints = () => {
    for (let i = 0 ; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
        
    }
}

function hitMe()
{
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
}

const stay = () => {
    // move on to next player, if any
    if (currentPlayer != players.length-1) {
        document.getElementById(`player_${currentPlayer}`).classList.remove('active');
        currentPlayer += 1;
        document.getElementById(`player_${currentPlayer}`).classList.add('active');
    }

    else {
        end();
    }
}

const end = () => {
    
    let winner;
    let score = 0;

    if (players[1].Points === players[0].Points) {
        $("#status").html(`Tie!`);
        $("#status").show();
        end();
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

const check = () => {
    if (players[0].Points > 21) {
        $("#status").html(`Player ${players[0].ID}: LOST`);
        $("#status").show();

        end();
    }
    if (players[1].Points > 21) {
        $("#status").html(`Player ${players[1].ID}: LOST`);
        $("#status").show();
        // document.getElementById('status').style.display = "inline-block";
        end();
    }
}

const updateDeck = () => {
    document.getElementById('deckcount').innerHTML = deck.length;
}

const startblackjack = () => {
    $("#startBtn").val("restart");
    $("#status").hide();
    // deal 2 cards to every player object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    $(`player_${currentPlayer}`).addClass('active');
}