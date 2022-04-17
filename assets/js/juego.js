//mazo
let deck = []
let puntosJugador = 0
let puntosPC = 0

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
const resultado = document.querySelector('.resultado')

btnPararJuego.disabled = true
btnPedirCarta.disabled = true

const limpiarCartas = () => {
    while (cartasJugador.lastChild) {
        cartasJugador.removeChild(cartasJugador.lastChild)
    }
    while (cartasPC.lastChild) {
        cartasPC.removeChild(cartasPC.lastChild)
    }
}

const limpiarResultado = () => {
    resultado.removeChild(resultado.lastChild)
}

const updateHTML = (puntosJugador, puntosPC) => {
    setPlayerPoints(puntosJugador)
    setPcPoints(puntosPC)
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

    if (puntosJugador >= 21) {
        btnPedirCarta.disabled = true
        btnPararJuego.disabled = true
        turnoComputadora(puntosJugador)
    }
})

btnIniciarJuego.addEventListener('click', () => {
    deck = crearDeck()
    puntosJugador = 0
    puntosPC = 0
    document.getElementById('start-btn').innerHTML = `
        <div>
            <i id='start-icon' class="fas fa-sync"></i>
            Reiniciar
        </div>
        `     
    btnPedirCarta.disabled = false
    btnPararJuego.disabled = false
    limpiarCartas()
    limpiarResultado()
    updateHTML(puntosJugador, puntosPC)
})

btnPararJuego.addEventListener('click', () => {
    btnPedirCarta.disabled = true
    btnPararJuego.disabled = true
    turnoComputadora(puntosJugador)
})

// turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta(deck)
        puntosPC += valorCarta(carta)
        updateHTML(puntosJugador, puntosPC)
        const imgCarta = document.createElement('img')
        imgCarta.src = CARD_PATH(carta)
        imgCarta.classList.add('carta')
        cartasPC.append(imgCarta)

        if (puntosMinimos > 21) {
            break;
        }

    } while ( puntosPC < puntosMinimos && puntosMinimos <= 21)
    checkResultado(puntosMinimos, puntosPC)
}

const checkResultado = ( playerPoints, pcPoints ) => {
    const resText = document.createElement('h1')
    if( playerPoints === pcPoints ) {
        resText.classList.add('empate')
        resText.classList.add('result')
        resText.innerText = 'ES UN EMPATE'
        resultado.append(resText)
    } else if ( playerPoints > 21 ) {
        resText.classList.add('pc-win')
        resText.classList.add('result')
        resText.innerText = 'LA PC GANA'
        resultado.append(resText)
    } else if ( pcPoints > 21) {
        resText.classList.add('result')
        resText.classList.add('player-win')
        resText.innerText = 'JUGADOR GANA'
        resultado.append(resText)
    } else {
        resText.classList.add('result')
        resText.classList.add('pc-win')
        resText.innerText = 'LA PC GANA'
        resultado.append(resText)
    }
}