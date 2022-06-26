import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { allFilters } from "../redux/actions"
import FilterPrice from '../components/FilterPrice'
import swal from 'sweetalert';

const Filters = ({ setOrder, setCurrentPage, order }) => {

  const [filter, setFilter] = useState({})
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!filter.brand && !filter.category) {
      swal("Select a filter type")
    }
    else {
      dispatch(allFilters({ ...filter, precioMin: priceMin, precioMax: priceMax }))
      setFilter({
        brand: '',
        category: '',
      })
      setPriceMin('')
      setPriceMax('')
    }
  }

  const handlePriceMin = (e) => {
    e.preventDefault()
    setPriceMin(e.target.value)
  }

  const handlePriceMax = (e) => {
    e.preventDefault()
    setPriceMax(e.target.value)
  }
  
  return (
    <div>

      <FilterPrice setCurrentPage={setCurrentPage} setOrder={setOrder} order={order} />

      <select name='brand' value={filter.brand} onChange={handleChange}>
        <option hidden>Brand</option>
        <option value='Nike'>Nike</option>
        <option value='adidas'>Adidas</option>
        <option value='Vans'>Vans</option>
        <option value='Converse'>Converse</option>
        <option value='Caterpillar'>Caterpillar</option>
        <option value='Vizzano'>Vizzano</option>
        <option value='Briganti'>Briganti</option>
        <option value='Faraon'>Faraon</option>
        <option value='Sport'>Sport</option>
        <option value='Moleca'>Moleca</option>
      </select>

      <select name='category' value={filter.category} onChange={handleChange}>
        <option hidden>Category</option>
        {categories.map((t) => (
          <option
            key={categories.indexOf(t)}
            value={t.id}>{t.name}</option>
        ))}
      </select>

      <input type='number' value={priceMin} min={1} max={priceMax} placeholder='Minimal price' onChange={handlePriceMin} />
      <input type='number' value={priceMax} max={80000} min={priceMin} placeholder='Maximum price' onChange={handlePriceMax} />

      <input type='submit' value='Apply filters' onClick={e => handleSubmit(e)} />
    </div>
  )
}

export default Filters