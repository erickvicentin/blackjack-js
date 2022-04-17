//mazo
let deck = []
let puntosJugador = 0
let puntosPC = 0
let playerName = ''

/**
 * @name CARDS_TYPES
 * @description
 * C = Clubs, D = Diamonds, H = Hearts, S = Spades
 */
const CARDS_TYPES = ['C', 'H', 'D', 'S']
const CARDS_SPECIAL = ['A', 'J', 'Q', 'K']
const CARD_PATH = card => `assets/cartas/${card}.png`

// SELECTORES HTML
const cartasJugador = document.querySelector('#player-cards')
const cartasPC = document.querySelector('#pc-cards')
const btnPedirCarta = document.querySelector('#req-btn')
const btnPararJuego = document.querySelector('#stop-btn')
const btnIniciarJuego = document.querySelector('#start-btn')

const updateHTML = (puntosJugador, puntosPC) => {
    setPlayerPoints(puntosJugador)
    setPcPoints(puntosPC)
}

const setPlayerName = name => {
    document.querySelectorAll('b')[0].innerText = name
}

const setPlayerPoints = points => {
    document.getElementById('playerPoints').innerText = points
}

const setPcPoints = points => {
    document.getElementById('pcPoints').innerText = points
}

/**
 * @description
 * This method initialize deck and does random sort with all cards
 */
const crearDeck = () => {
    CARDS_TYPES.forEach(x => {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + x)
        }
    })
    CARDS_TYPES.forEach(x => {
        CARDS_SPECIAL.forEach(y => {
            deck.push(y + x)
        })
    })
    return _.shuffle(deck)
}

const pedirCarta = (deck) => {

    if (deck.length === 0) {
        alert('No hay cartas en el mazo. Inicie el juego.')
    }

    return deck.pop(Math.trunc(Math.random() * deck.length + 1))
}

//pedirCarta(crearDeck())
const valorCarta = carta => {
    const valor = carta.substring(0, carta.length - 1)
    return (isNaN(valor))
        ? (valor === 'A') ? 11 : 10
        : parseInt(valor)
}

// EVENTOS

btnPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta(deck)
    puntosJugador += valorCarta(carta)
    updateHTML(puntosJugador, puntosPC)
    const imgCarta = document.createElement('img')
    imgCarta.src = CARD_PATH(carta)
    imgCarta.classList.add('carta')
    cartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        btnPedirCarta.disabled = true
    }
})

btnIniciarJuego.addEventListener('click', () => {
    deck = crearDeck()
    setPlayerName('Erick')
    puntosJugador = 0
    puntosPC = 0
    document.getElementById('start-icon').innerText = ' Reiniciar juego'
    document.getElementById('start-icon').className = 'fas fa-sync'
    btnPedirCarta.disabled = false
    while (cartasJugador.lastChild) {
        cartasJugador.removeChild(cartasJugador.lastChild)
    }
    updateHTML(puntosJugador, puntosPC)
})

// turno de la computadora
