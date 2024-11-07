import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer () {
  const { filters } = useFilters()

  return (
    <footer className='footer'>
      
      <h4>Prueba técnica de React ⚛️ － <a target='_blank' href='https://fransanchez.vercel.app/'>www.fransanchez.vercel.app</a></h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  )
}