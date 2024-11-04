import { useCatImage } from "../hooks/useCatImage";

export function Image ({fact}){
    const { imgUrl } = useCatImage({ fact })

    return (
        <>
            { imgUrl && <img src={imgUrl}/>}
        </>
    )
}