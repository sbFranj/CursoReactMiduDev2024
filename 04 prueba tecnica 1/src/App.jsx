import "./App.css"
import { Image } from "./components/Image"
import { useCatFact } from "./hooks/useCatFact"


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
                <Image fact={fact}></Image>
            </main>
        </>
    )
}