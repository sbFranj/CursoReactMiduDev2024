// componente Square
export const Square = ({children, isSelected, updateBoard, index})=>{
    // si es el turno del jugador se selecciona cambiandole la clase
    const className = `square ${isSelected? 'is-selected':''}`
    
    // cuando hace click actualiza la tabla
    const handleClick = () =>{
      // esta funcion es la que le pasan por los props
      updateBoard(index)
    }
    // devolvemos un div con el onlick que llama al handleClick y le pasamos la clase
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }