import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { filterByCategory } from "../redux/actions"


const FilterCategory = ({ setCurrentPage }) => {

  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)

  const handleSelect = (e) => {
    e.preventDefault()
    dispatch(filterByCategory(e.target.value))
  }

  return (
    <div>
      <select
        onChange={e => handleSelect(e)}>
        {categories.map((t) => (
          <option value={t.id}>{t.name}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterCategory;