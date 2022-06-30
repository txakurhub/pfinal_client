import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { orderStatus } from '../redux/actions'

function OrderStatus() {

  const dispatch = useDispatch()
  const orderstatus = useSelector(state => state.orderstatus)

  useEffect(() => {
    dispatch(orderStatus())
  }, [dispatch])

  return (
    <div>
      {
        orderstatus ? orderstatus.sort((a, b) => a.id - b.id).map(e => {

          const hora = e.order_date.split('-').join('/').slice(0, 10)
          const horaFinal = hora + '-' + e.order_date.slice(11, 19)

          return (
            <div>
              <br />
              <p>////////////////////////////////////////////////////////////////////////</p>
              <h1>Detalles de la órden</h1>
              <p>ID DE COMPRA: {e.id}</p>
              <p>MONTO TOTAL: ${e.amount}</p>
              <p>EMAIL DE USUARIO: {e.order_email}</p>
              <p>FECHA DE COMPRA: {horaFinal}</p>
              <p>ESTADO DE ÓRDEN: {e.order_status}</p>
              {
                e.Products && e.Products.map(c => (
                  <div>
                    <br />
                    <h1>Detalles del producto</h1>
                    <p>ID: {c.id}</p>
                    <h1>TÍTULO: {c.title}</h1>
                    <p>MARCA: {c.brand}</p>
                    <p>MODELO: {c.model}</p>
                    <p>PRECIO: ${c.price}</p>
                    <p>CATEGORÍA: {c.category}</p>
                  </div>
                ))
              }
            </div>
          )
        }) : "No existen órdenes de productos"
      }
    </div>
  )
}

export default OrderStatus