import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchSneakes } from '../redux/actions'

const NavBar = ({ setCurrentPage , nombreProductos }) => {
  // console.log(nombreProductos)
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const [suggestionsState,setSuggestionsState] = useState({mostrar:false,sugerencia:[]})

  const suggestions = (texto)=>{
    if(nombreProductos.length){
      if(!texto) {
        setSuggestionsState({sugerencia:[],mostrar:false})
        return
      }
      if(texto){
        const filtrado = nombreProductos.filter(e=>`${e.title} ${e.brand}`.toLowerCase().includes(texto.toLowerCase()))
        setSuggestionsState({mostrar:true,sugerencia:filtrado})
      }
    }
  }

  const handleClick = (e)=>{
    setInput(e.target.id)
    setSuggestionsState({sugerencia:[],mostrar:false})
  }

  const handleChange = async (e) => {
    await setInput(e.target.value)
    suggestions(e.target.value)
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
      {suggestionsState.mostrar && (
        <div>
          {suggestionsState.sugerencia.map((el,index)=>(
        <p key={index} onClick={(e)=>handleClick(e)} id={el.title}>{`${el.title}`}</p>
      ))}
        </div>
      )}
    </div>
  )
}

export default NavBar