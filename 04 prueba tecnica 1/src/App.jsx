import { useEffect, useState } from "react"
import "./App.css"

const URL_FACTS_CATS = "https://catfact.ninja/fact"
const URL_IMG_CAT = `https://cataas.com`

export function App() {
    const [fact, setFact] = useState("Loren ipsum cat fact whatever")
    const [imgUrl, setImgUrl] = useState("")

    const getRandomFact = async ()=>{
        fetch(URL_FACTS_CATS)
        .then(res => res.json())
        .then(data => setFact(data.fact))
    }
    
    const handleClick = () =>{
        getRandomFact()
    }
    
    useEffect(() => {
        getRandomFact()
    }, [])

    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split(" ", 3).join(" ")
        setImgUrl(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red`)
    }, [fact])

    return (
        <>
            <main>
                <h1>App de gatitos</h1>

                {fact && <p>{fact}</p>}
                {imgUrl && <img src={imgUrl}></img>}
                <button onClick={handleClick}>Get new fact</button>
            </main>
        </>
    )
}