import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { adminDeleteShoes, getProducts } from "../../redux/actions";

function Shoes() {
  const allProduts = useSelector((state) => state.allProductsCopy);
  const [shoes, setShoes] = useState(allProduts.slice(0,201));
  const [buscar, setBuscar] = useState("");
  const [actualizar, setActualizar] = useState(true);
  const [filtro, setFiltro] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    if(e.target.id === "filtro"){
      if(e.target.value === "sinstock"){
        let filtrado = [...allProduts] // lo hago de esta manera porque el sort modifica el array original
         filtrado = filtrado.filter((z) => z.stock === 0).slice(0,201)
        return setShoes(filtrado)
      }
      let ordenar = [...allProduts] // lo hago de esta manera porque el sort modifica el array original
      if(e.target.value === "mas"){
        ordenar = ordenar.sort((a, b) => b.sold - a.sold).slice(0,201)
        return setShoes(ordenar)
      }
      if(e.target.value === "menos"){
        ordenar = ordenar.sort((a, b) => a.sold - b.sold).slice(0,201)
        return setShoes(ordenar)
      }
      if(e.target.value === 'marca'){
        ordenar = ordenar.sort(function (a, b) {
         
          if (a.brand > b.brand) {
            return 1;
          }
          if (a.brand < b.brand) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }).slice(0,201);
        return setShoes(ordenar)
      }
    }else{
      setBuscar(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = allProduts.filter((el) =>
      el.id.toLowerCase().includes(buscar.toLowerCase())
    );
    if (!resultado.length) return swal("No hay resultados"); // cambiar alerta por swal
    setBuscar("");
    setShoes(resultado);
  };

  const allShoes = () => {
    let reload = allProduts
    setShoes(reload.slice(0,201));
  };

  const deleteShoes = async ({ id, name }) => {
    // esta funcion va a despachar una accion que elimina el producto
    await swal({
      title: "¿Estás seguro de realizar esta acción?",
      text: "¡Una vez eliminado, no podrá recuperar este producto!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        swal(`¡El producto ${name}, ha sido eliminado correctamente!`, {
          icon: "success"
        });
        await dispatch(adminDeleteShoes(id));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        swal("¡La acción ha sido cancelada con éxito!");
      }
    });
  };
  const editShoes = ({ id, name }) => {
    // console.log(history)
    history.push("/admin/edit/"+id);
  };

  useEffect(() => {
    if (actualizar) {
      dispatch(getProducts());
    }
    setShoes(allProduts.slice(0,201));
    setActualizar(false);
  }, [allProduts]); // no tocar porfa xd

  return (
    <div className="w-full">
      <div className=" px-4 py-3 space-y-2">
        <div className="bg-grey col-12 mt-2 align-middle justify-end flex " >
        <div className="relative inline-block w-40 p-2 text-gray-700">
          <select id="filtro" value={filtro} onChange={handleChange} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:shadow-outline" placeholder="Regular input">
            <option hidden >filtrar - ordenar</option>
            <option value="sinstock">Sin Stock</option>
            <option value="mas">+ Ventas</option>
            <option value="menos">- Ventas</option>
            <option value="marca"> Marca</option>
          </select>
        </div>
				<input onChange={handleChange} value={buscar} type="text" className="col-8 border-2 p-2 m-1 rounded-lg " placeholder="Buscar producto..." id="buscar"/>
        <button onClick={handleSubmit} className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">Buscar</button>
        <button onClick={allShoes} className="h-10 px-5 m-2 ml-10 text-gray-100 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-700">Recargar</button>
        <button
       className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
          onClick={() => {
            history.push("/form");
          }}
        >
          Crear producto
        </button>
			</div>
      </div>
      <table className="table w-full">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            {/* <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              {" "}
            </th> */}
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ID
            </th>
            <th className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
              NOMBRE
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              MARCA
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              STOCK
            </th>
            <th className="border border-gray-300 p-2 text-sm font-semibold tracking-wide text-center">
              VENDIDAS
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              PRECIO
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {shoes &&
            shoes.map((shoes) => {
              return (
                <tr className="odd:bg-white even:bg-slate-50" key={shoes.id}>
                  {/* <th className="border border-gray-200 p-3 text-sm text-gray-700">
                    {" "}
                    <img
                      src={shoes.image}
                      draggable="false"
                      width="70"
                      height="70"
                      alt="das"
                    />{" "}
                  </th> */}
                  <th className="border border-gray-200 p-3 text-sm text-gray-700">
                    {shoes.id}
                  </th>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    {" "}
                    {shoes.title}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    {" "}
                    {shoes.brand}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    {shoes.stock ? (
                      shoes.stock
                    ) : (
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-40">
                        Sin Stock
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    {shoes.sold}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    ${shoes.price}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    <div className="flex space-x-4">
                      <button
                        className="px-2 bg-lime-500 py-2 rounded-md text-white font-semibold hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:bg-lime-300 "
                        id={shoes.id}
                        onClick={() =>
                          editShoes({ id: shoes.id, name: shoes.title })
                        }
                      >
                        Editar
                      </button>
                      <button
                        className="px-2 bg-red-500 py-2 rounded-md text-white font-semibold hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:bg-red-300 "
                        id={shoes.id}
                        onClick={() =>
                          deleteShoes({ id: shoes.id, name: shoes.title })
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Shoes;
