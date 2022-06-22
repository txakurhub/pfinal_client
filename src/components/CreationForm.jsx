import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, getCategories } from '../redux/actions'
import style from './pruebadiseño.module.css'

const validaciones = (input) => {
  const errores = {}

  ////////TITLE/////////////
  if (!input.title.length) {
    errores.title = "Campo obligatorio"
  } else if (input.title.length < 6) {
    errores.title = "Título muy corto"
  }
  //////////////////////////

  ////////////BRAND////////
  if (!input.brand.length) {
    errores.brand = "Campo obligatorio"
  } else if (!/^[a-zA-Z ]*$/.test(input.brand)) {
    errores.brand = "Sólo se permiten palabras"
  } else if (input.brand.length < 4) {
    errores.brand = "Marca muy corta"
  }
  /////////////////////////

  ////////MODEL///////////
  if (!input.model.length) {
    errores.model = "Campo obligatorio"
  } else if (input.model.length < 6) {
    errores.model = "Modelo muy corto"
  }
  ///////////////////////

  ////////IMAGE/////////
  if (!input.image.length) {
    errores.image = "Campo obligatorio"
  }
  /////////////////////

  ////////PRICE///////
  if (!input.price.length) {
    errores.price = "Campo obligatorio"
  } else if (input.price < 200 || input.price > 50000) {
    errores.price = "El precio no debe ser menor a $200 y mayor a $50.000"
  }
  ///////////////////

  //////CATEGORY/////
  if (!input.category.length) {
    errores.category = "Campo obligatorio"
  }
  ///////////////////

  return errores
}

const CreationForm = () => {

  const [input, setInput] = useState({
    title: '',
    brand: '',
    model: '',
    price: '',
    image: '',
    category: ''
  })
  const [errores, setErrores] = useState([]);
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setErrores(validaciones({
      ...input, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.title.length || !input.brand.length || !input.model.length || !input.price.length || !input.image.length || !input.category.length) {
      alert("Faltan completar datos.")
    } else if (errores.title || errores.brand || errores.model || errores.price || errores.image) {
      alert("Revisar bien los campos completados.")
    } else {
      dispatch(createProduct(input))
      alert("Zapatilla creada!")
      setInput({
        title: '',
        brand: '',
        model: '',
        price: '',
        image: '',
        category: ''
      })
    }
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className={style.contenedor}>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <label>Select a title</label>
        <input type='text' name='title' value={input.title} maxlength={150} placeholder='Ej: Zapatillas Puma Better Foam Emerge' onChange={handleChange} />
        {errores.title && (<p className={style.danger}>{errores.title}</p>)}

        <label>Select a brand</label>
        <input type='text' name='brand' value={input.brand} maxlength={12} placeholder='Ej: Puma' onChange={handleChange} />
        {errores.brand && (<p className={style.danger}>{errores.brand}</p>)}

        <label>Select a model</label>
        <input type='text' name='model' value={input.model} maxlength={20} placeholder='Ej: Deportivas' onChange={handleChange} />
        {errores.model && (<p className={style.danger}>{errores.model}</p>)}

        <label>Select a price</label>
        <input type='number' name='price' value={input.price} placeholder='Ej: $13499' onChange={handleChange} />
        {errores.price && (<p className={style.danger}>{errores.price}</p>)}

        <label>Select an image</label>
        <input type="file" name='image' value={input.image} accept="image/*" onChange={handleChange} />
        {errores.image && (<p className={style.danger}>{errores.image}</p>)}

        <label>Select a category</label>
        <select name='category' onChange={handleChange}>
          <option hidden>Select category</option>
          {
            categories && categories.map(c => (
              <option value={c.name}>{c.name}</option>
            ))
          }

        </select>

        <input type='submit' value='To create' />

      </form>
    </div>
  )

}

export default CreationForm;