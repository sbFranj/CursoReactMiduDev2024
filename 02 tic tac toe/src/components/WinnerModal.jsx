import { Square } from "./Square"

export function WinnerModal({winner, resetGame}) {
    if (winner === null) return null

    const winnerText =  winner === false ? "Empate" : "Ganador: "

    return (
        <section className='winner'>
            <div className="text">
                {winnerText}
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Volver a empezar</button>
                </footer>
            </div>
        </section>
    )

}