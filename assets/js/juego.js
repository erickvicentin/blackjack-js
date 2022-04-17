//mazo
let deck = []

/**
 * @name CARDS_TYPES
 * @description
 * C = Clubs, D = Diamonds, H = Hearts, S = Spades
 */
const CARDS_TYPES = ['C', 'H', 'D', 'S']
const CARDS_SPECIAL = ['A', 'J', 'Q', 'K']

/**
 * @description
 * This method initialize deck and does random sort with all cards
 */
const crearDeck = () => {
    CARDS_TYPES.forEach(x => {
        for ( let i = 2; i <= 10; i++ ) {
            deck.push(i+x)
        }
    })
    CARDS_TYPES.forEach(x => {
        CARDS_SPECIAL.forEach(y => {
            deck.push(y+x)
        })
    })
    
    return _.shuffle(deck)
}

const pedirCarta = (deck) => {
    
    //Error Handling
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el mazo.'
    }

    const carta = deck.pop(Math.trunc(Math.random()*deck.length+1))
    console.log(deck)
    console.log(carta)
}


pedirCarta(crearDeck())