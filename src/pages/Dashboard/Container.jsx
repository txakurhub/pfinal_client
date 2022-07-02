import React from 'react'
import OrderStatus from '../../components/OrderStatus'
import Users from '../../components/Users'
import Categories from './Categories'
import Shoes from './Shoes'

function Container({active}) {

    if(active === "customers") return <Users/>
    if(active === "shoes") return <Shoes/>
    if(active === "categories") return <Categories/>
    if(active === "order") return <OrderStatus/>
    if(active === "dashboard")return(<div>Aca van datos del admin y datos informativo sobre la pagina</div>)
}

export default Container