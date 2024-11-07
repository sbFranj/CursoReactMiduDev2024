import { useId } from "react"
import "./Filters.css"
import { useFilters } from "../hooks/useFilters"

export function Filters() {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState, minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState, category: event.target.value
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}>
        </input>
        <span>{filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>
          <select id={categoryFilterId} onChange={handleChangeCategory}>
            <option value="all">Todo</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </label>
      </div>
    </section>
  )
}