import React from 'react'
//import { useSelector } from 'react-redux'

function Customers() {
    //const allCustomers = useSelector(state=> state.allCustomers)
  return (
    <div>
      <div >
        <input type="text" placeholder='ID del usuario' value="" />
        <button >Buscar</button>
        {"   "}
        <button >All shoes</button>
      </div>
        <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">NOMBRE</th>
            <th scope="col">USUARIO</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ESTADO</th>
            <th scope="col">ROL</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
        <tr>
                <th scope="row"> <img src="https://raw.githubusercontent.com/MaxiiMartins/contador/master/usuario.png" width="25" height="25" alt="NOT FOUND" /> </th>
                <td className="text-dark">NOMBRE</td>
                <td className="text-dark">USUARIO</td>
                <td className="text-dark">EMAIL@EJEMPLO.COM</td>
                <td className="text-dark">ACTIVO</td>
                <td className="text-dark">USER</td>
                <td className="text-dark">
                  <div>
                    <button >Editar</button>
                    <button >Eliminar</button>
                  </div>
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Customers