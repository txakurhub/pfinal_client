import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterByOrder, orderStatus } from '../redux/actions'

function OrderStatus() {

  const dispatch = useDispatch()
  const orderstatus = useSelector(state => state.orderstatus)

  const handleChange = (e) => {
    e.preventDefault()
    dispatch(filterByOrder(e.target.value))
  }

  useEffect(() => {
    dispatch(orderStatus())
  }, [dispatch])

  return (
    <div className="w-full">
    <div className=" px-4 py-3 space-y-2">
        <div className="bg-grey col-12 mt-2 align-middle justify-content flex " >
        <div className="relative inline-block w-40 p-2 text-gray-700">
        <select onChange={handleChange} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:shadow-outline">
         <option hidden>Órdenes</option>
         <option value='success'>Realizadas con éxito</option>
         <option value='pendiente'>En proceso</option>
         <option value='failure'>Fallidas</option>
       </select>           
        </div>
				
			</div>
      </div>
      <table className="table w-full">
      <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
          <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
            ID</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
            
            TOTAL</th>

            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
            
            CANTIDAD</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">

            USUARIO</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">

            FECHA</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">

            ESTADO</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">

            ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orderstatus ? orderstatus.sort((a, b) => a.id - b.id).map(e => {
                  const hora = e.order_date.split('-').join('/').slice(0, 10)
                  const horaFinal = hora + ' ' + e.order_date.slice(11, 19)
                  const cantidad = e.Products.length
            return (
              <tr className="odd:bg-white even:bg-slate-50" key={e.id}>
                <th className="border border-gray-200 p-3 text-sm text-gray-700">{e.id}</th>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> $ {e.amount}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> {cantidad}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> {e.order_email}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> {horaFinal}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> {e.order_status}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700">
                  <div>
                    <button
                        className="px-2 bg-lime-500 py-2 rounded-md text-white font-semibold hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:bg-lime-300 "
                     id={e.id} onClick={()=>{}}>Editar</button>
                    <button
                        className="px-2 bg-red-500 py-2 rounded-md text-white font-semibold hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:bg-red-300 "

                     id={e.id} onClick={()=>{}}>Eliminar</button>
                  </div>
                </td>
              </tr>
            );
          }): <div> no hay nda </div>
        }
        </tbody>
      </table>
    </div>
  )
}

export default OrderStatus