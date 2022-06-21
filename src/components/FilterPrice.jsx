import { useDispatch } from "react-redux"
import { filterByPrice } from "../redux/actions"

const FilterPrice = ({ setOrder, setCurrentPage, order }) => {

  const dispatch = useDispatch()

  const handlePrice = (e) => {
    e.preventDefault()
    setOrder(e.target.value)
    dispatch(filterByPrice(order))
    setCurrentPage(1)
  }

  return (
    <div>
      <select onChange={e => handlePrice(e)}>
        <option hidden>Filter by price</option>
        <option value='lowest'>Lowest price</option>
        <option value='higher'>Higher price</option>
      </select>
    </div>
  )
}

export default FilterPrice;