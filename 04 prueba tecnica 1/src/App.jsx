import "./App.css"
import { useCatFact } from "./hooks/useCatFact"
import { CatImage } from "./components/catImage"

export function App() {
    const { fact, refreshFact } = useCatFact()

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <>
            <main>
                <h1>App de gatitos</h1>
                <button onClick={handleClick}>Get new fact</button>

                {fact && <p>{fact}</p>}
                <CatImage fact={fact}></CatImage>
            </main>
        </>
    )
}