import { WINNER_COMBOS } from "../constants"

// metodo para comprobar si ha ganado algun jugador
export const checkWinner = (boardToCheck)=>{
    let winner = null
    // revisamos las combinaciones ganadoras y si coincide con una devuelve el ganador
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] && // a == x u o
        boardToCheck[a] === boardToCheck[b] && // a y b == x u o
        boardToCheck[a] === boardToCheck[c] // a y c == x u o
      ){
        winner = boardToCheck[a]
      }
    }
    return winner
  }

  // si todas las posicione del array son distintas a null devuelve true
  export const checkEndGame = (newBoard) =>{
    return newBoard.every((square)=> square!==null)
  }