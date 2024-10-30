import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameToStorage } from './logic/storage'

// lo que se ve en mi app
function App() {
  // tabla
  const [board, setBoard] = useState(() => {
    // intentamos recuperar la tabla
    const boardFromStorage = window.localStorage.getItem("board")
    // si la hay pues seteamos nuestra tabla
    if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
  })

  // turno actual
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.x
  })

  // null = no hay ganador; false = empate; true = ganador
  const [winner, setWinner] = useState(null)

  // vuelve a default todos los estados
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    resetGameStorage()
  }

  // funcion para actualizar la tabla
  const updateBoardFunction = (index) => {
    // si en esa posicion de la tabla contiene no contiene una ficha
    // y no hay un ganador da true
    if (!board[index] && !winner) {
      // copia de la tabla, BUENAS PRACTICAS: no se muta un props
      const newBoard = [...board]
      // le asignamos a esa posicion de la tabla el turno/ficha actual
      newBoard[index] = turn
      // actualizamos la tabla
      setBoard(newBoard)

      // el turno cambia una vez la tabla actualizada, cambia al contrario del que ha jugado
      const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
      // actualizamos el turno
      setTurn(newTurn)

      saveGameToStorage({newBoard:newBoard, newTurn:newTurn})      

      //revisamos si hay ganador
      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)) {
        setWinner(false) // empate
      }
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              // Creamos un componente Square para que salga por la app y le pasamos al prop 
              // updateBoard la funcion para actualizar la tabla.
              <Square key={index} index={index} updateBoard={updateBoardFunction}>
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
