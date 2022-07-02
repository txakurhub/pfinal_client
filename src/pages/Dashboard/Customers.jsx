import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import UpdateUser from "../../components/UpdateUser";
import { getUsers } from "../../redux/actions";

function Customers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [id, setId] = useState("");
  const [buscar, setBuscar] = useState("");
  const [active, setActive] = useState(false);
  const [filtro, setFiltro] = useState("");
  const toggle = () => setActive(!active);
  const onClick = (r) => setId(r);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="w-full">
         <div className=" px-4 py-3 space-y-2">
        <div className="bg-grey col-12 mt-2 align-middle justify-end flex " >
        <div className="relative inline-block w-40 p-2 text-gray-700">
          <select id="filtro" value={filtro} onChange={(e)=>{setFiltro(e.target.value)}} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:shadow-outline" placeholder="Regular input">
            <option hidden >filtrar - ordenar</option>
            <option value="sinstock">Sin Stock</option>
            <option value="mas">+ Ventas</option>
            <option value="menos">- Ventas</option>
          </select>
        </div>
				<input onChange={(e)=>setBuscar(e.target.value)} value={buscar} type="text" className="col-8 border-2 p-2 m-1 rounded-lg " placeholder="Buscar producto..." id="search-filter"/>
        <button onClick={()=>{}} className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">Buscar</button>
        <button onClick={()=>{}} className="h-10 px-5 m-2 ml-10 text-gray-100 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-700">Recargar</button>
        <button
       className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
          onClick={() => {
            // history.push("/form");
          }}
        >
          Crear producto
        </button>
			</div>
      </div>
      <table className="table w-full">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              {" "}
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ID
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              NOMBRE
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              EMAIL
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ESTADO
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ROL
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((r) => {
            return (
              <tr key={r.id}>
                <th className="border border-gray-200 px-1 text-sm text-gray-700">
                  {" "}
                  <img
                    src="https://raw.githubusercontent.com/MaxiiMartins/contador/master/usuario.png"
                    width="25"
                    height="25"
                    draggable="false"
                    alt="NOT FOUND"
                  />{" "}
                </th>
                <td className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
                  {r.id}
                </td>
                <td className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
                  {r.firstname} {r.lastname}
                </td>
                <td className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
                  {r.email}
                </td>
                <td className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
                  {r.banned ? (
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-40">
                      bloqueado
                    </span>
                  ) : (
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-lime-800 bg-lime-200 rounded-lg bg-opacity-40">
                      Activo
                    </span>
                  )}
                </td>

                <td className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
                  {r.admin ? "admin" : "usuario"}
                </td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700 text-center">
                    <button
                      className="px-2 bg-lime-500 py-2 rounded-md text-white font-semibold hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:bg-lime-300 "
                      onClick={() => {
                        toggle();
                        onClick(r.id);
                      }}
                      key={r.id}
                    >
                      Editar
                    </button>
                    
                </td>
              </tr>
            );
          })}
          <Modal
            active={active}
            toggle={toggle}
            children={<UpdateUser id={id} />}
          />
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
