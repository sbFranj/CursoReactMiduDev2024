import { useCatImage } from "../hooks/useCatImage";

export function CatImage ({fact}){
    const { imgUrl } = useCatImage({ fact })

    return (
        <>
            { imgUrl && <img src={imgUrl}/>}
        </>
    )
}