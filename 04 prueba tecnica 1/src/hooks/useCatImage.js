import { useEffect, useState } from "react"

export function useCatImage ({ fact }){
    const [imgUrl, setImgUrl] = useState("")

    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split(" ", 3).join(" ")
        setImgUrl(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red`)
    }, [fact])

    return {imgUrl}
}