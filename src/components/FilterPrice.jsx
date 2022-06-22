import { useState } from "react"
import { useDispatch } from "react-redux"
import { filterByPrice, filterByRangePrice } from "../redux/actions"

const FilterPrice = ({ setOrder, setCurrentPage, order }) => {

  const dispatch = useDispatch()
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  const handlePrice = (e) => {
    e.preventDefault()
    setOrder(e.target.value)
    dispatch(filterByPrice(order))
    setCurrentPage(1)
  }

  const handlePriceMin = (e) => {
    e.preventDefault()
    setPriceMin(e.target.value)
  }

  const handlePriceMax = (e) => {
    e.preventDefault()
    setPriceMax(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(filterByRangePrice(priceMin, priceMax))
  }

  return (
    <div>
      <select onChange={e => handlePrice(e)}>
        <option hidden>Filter by price</option>
        <option value='lowest'>Lowest price</option>
        <option value='higher'>Higher price</option>
      </select>

      <form onSubmit={handleSubmit}>
        <input type='number' value={priceMin} min={1} max={priceMax} placeholder='Minimal price' onChange={handlePriceMin} />
        <input type='number' value={priceMax} max={50000} min={priceMin} placeholder='Maximum price' onChange={handlePriceMax} />
        <input type='submit' value='Aplicar filtrado' />
      </form>
    </div>
  )
}

export default FilterPrice;