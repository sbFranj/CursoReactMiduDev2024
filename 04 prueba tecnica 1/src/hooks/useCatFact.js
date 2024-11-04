import { useEffect, useState } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact() {
    const [fact, setFact] = useState("Loren ipsum cat fact whatever")

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect(refreshFact, [])
    return { fact, refreshFact }
}