import React from 'react'
import style from './Error404.module.css'
import { Link } from 'react-router-dom'
import x from '../assets/x.png'

function Error404() {
    return (
        <div className={style.contenedor}>
            {/* <h1>No tienes acceso a esta ruta</h1> */}
            <h1>Debes ser administrador para poder ingresar a esta ruta.</h1>
            <img src={x} /> <br />
            <Link to='/'>
                <button>Volver al inicio</button>
            </Link>
        </div>
    )
}

export default Error404