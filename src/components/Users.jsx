import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, reloadUser, searchUser } from "../redux/actions";
import Modal from "./Modal";
import UpdateUser from "./UpdateUser";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [id, setId] = useState('');
  const [buscar, setBuscar] = useState("");
  const [active, setActive] = useState(false);
  const [usuarios, setUsuarios] = useState(users)
  const toggle = () => setActive(!active);
  const onClick = (r) => setId(r);
  const [filtro, setFiltro] = useState("");

useEffect(() => {
  
    setUsuarios(users)
  }, [dispatch,users]);

  const handleChange = (e) => {
    e.preventDefault()
  
    setBuscar(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchUser(buscar.toLowerCase()))
    setBuscar('')
  }
  const handleUser = (e) =>{
    if(e.target.id === 'filtro'){
      if(e.target.value === "admin"){
        let filtrados = [...users]
        filtrados = filtrados.filter(f => f.admin === true)
        console.log(filtrados)
        return setUsuarios(filtrados)
      }
      if(e.target.value === 'usuarios'){
        let filtrados2 = [...users]
        filtrados2 = filtrados2.filter(f => f.admin === false)
        return setUsuarios(filtrados2)
      }
      if(e.target.value === 'todos'){
        let todos = [...users]

        return setUsuarios(todos)
      }
    }
    
  }

  return (
    <div className="w-full">
      <div className="py-3 col-12 mt-2 align-middle justify-evenly flex m-auto">
        <button onClick={() => { dispatch(reloadUser()) }} className="h-10 px-5 m-2 ml-10 text-gray-100 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-700">Recargar</button>
        <div>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={buscar} type="text" className="col-8 border-2 p-2 m-1 rounded-lg " placeholder="Buscar usuario..." id="search-filter" /> {/* falta terminar algo */}
            <input type="submit" className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700" value='Buscar' />
          </form>
        </div>
        <div className="relative inline-block w-40 p-2 text-gray-700">
          <select id="filtro"  value={filtro} onChange={handleUser} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:shadow-outline" placeholder="Regular input">
            <option hidden >Filtar</option>
            <option value="todos">Todos</option>
            <option value="admin">Admin</option>
            <option value="usuarios">Usuario</option>
          </select>
        </div>
      </div>
      <div className="table w-[90%] m-auto">
        <div className="flex flex-row justify-between items-center h-[40px]">
          {/* <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">{" "}</th> */}
          <p className="text-sm font-semibold tracking-wide text-center">NOMBRE/ROL</p>
          <p className="text-sm font-semibold tracking-wide text-center">EMAIL</p>
          <p className="text-sm font-semibold tracking-wide text-center">ID</p>
          <p className="text-sm font-semibold tracking-wide text-center">ESTADO | ACTION</p>
        </div>
        <div>
          {
            usuarios.map((r) => {
              return (
                <div key={r.id} className="hover:bg-gray-100 flex flex-row justify-between items-center mb-2 h-[40px] border-b border-gray-500">
                  {/* <th className="border border-gray-200 px-1 text-sm text-gray-700">
                    {" "}
                    <img
                      src="https://raw.githubusercontent.com/MaxiiMartins/contador/master/usuario.png"
                      width="25"
                      height="25"
                      draggable="false"
                      alt="NOT FOUND"
                    />{" "}
                  </th> */}
                  <p className="text-start text-sm font-semibold tracking-wide text-center w-[20%] truncate">{r.firstname} {r.lastname} {''}<small className="italic tracking-wide text-center">{r.admin ? "Admin" : "Usuario"}</small></p>
                  <p className="text-start tracking-wide text-center w-[25%] truncate">{r.email}</p>
                  <p className="text-start tracking-wide text-center w-[25%] truncate">{r.id}</p>
                  <div className="flex items-center justify-center">
                    {
                      r.banned ?
                        <p title="Bloqueado" className="h-4 w-4 rounded-full bg-red-500 mr-2" /> :
                        <p title="Activo" className="h-4 w-4 rounded-full bg-[#5ad539] mr-2" />
                    }
                    <button title="Editar usuario" onClick={() => { toggle(); onClick(r.id); }} key={r.id}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          }
          <Modal active={active} toggle={toggle} children={<UpdateUser id={id} />} />
        </div>
      </div>
    </div>
  );
};

export default Users;

