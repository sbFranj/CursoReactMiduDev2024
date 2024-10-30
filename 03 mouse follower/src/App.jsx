import { useEffect, useState } from 'react'
import './App.css'

// componente que con la logica de seguir al raton
const FollowMouse = ()=>{
  // useState para activar o desactivar la logica
  const [enabled, setEnabled] = useState(false)

  // useState para setear la posicion del ratón
  const [position, setPosition] = useState({x:0, y:0})

  //useEffect que se suscribe al evento de las coordenadas del ratón
  useEffect(()=>{
    const handleMove = (event)=>{
      const { clientX, clientY} = event
      setPosition({x:clientX, y:clientY})
    }

    if(enabled){
      window.addEventListener("pointermove", handleMove)
    }

    // cleanup para desuscribirse del evento
    return () =>{
      window.removeEventListener("pointermove", handleMove)
    }
  },[enabled])

  // useEffect para hacer desaparecer el cursos con las clases de css
  useEffect(()=>{
    document.body.classList.toggle("no-cursor", enabled)
    return ()=>{
      document.body.classList.toggle("no-cursor")
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}290px)`
      }} />
      <button onClick={()=>setEnabled((!enabled))}>
        {enabled? "Desactivar" : "Activar"} seguimiento
      </button>
    </>
  )
}

function App() {
  return(
    <main>
      <FollowMouse/>
    </main>
  )
  
}

export default App
