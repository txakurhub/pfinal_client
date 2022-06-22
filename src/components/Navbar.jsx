import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchSneakes } from '../redux/actions'

const NavBar = ({ setCurrentPage }) => {

  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchSneakes(input))
    setInput('')
    setCurrentPage(1)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='search' value={input} placeholder="Search sneakes..." onChange={handleChange} />
        <input type='submit' />
      </form>
    </div>
  )
}

export default NavBar