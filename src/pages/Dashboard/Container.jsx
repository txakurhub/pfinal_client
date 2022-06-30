import React from 'react'
import Categories from './Categories'
import Customers from './Customers'
import Shoes from './Shoes'

function Container({active}) {
    
    if(active === "customers") return <Customers/>
    if(active === "shoes") return <Shoes/>
    if(active === "categories") return <Categories/>
    if(active === "dashboard")return(<div>Aca van datos del admin y datos informativo sobre la pagina</div>)
}

export default Container