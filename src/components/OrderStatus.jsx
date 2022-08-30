import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import {
  deleteOrder,
  filterByOrder,
  orderStatus,
  updateStateOfOrder
} from "../redux/actions";

function OrderStatus() {
  const dispatch = useDispatch();
  const orderstatus = useSelector((state) => state.orderstatus);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(filterByOrder(e.target.value));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    swal({
      title: "¿Estás seguro de realizar esta acción?",
      text: "¡Una vez eliminada, no podrá recuperar esta órden!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        dispatch(deleteOrder({ id: e.target.value }));
        swal(`¡La órden ${e.target.value}, ha sido eliminado correctamente!`, {
          icon: "success"
        }).then(
          setTimeout(() => {
            window.location.reload();
          }, 2000)
        );
      }
    });
  };

  const handleClick = (e) => {
    const valor = e.target.value;
    const id = e.target.id;
    if (valor === "pendiente") {
      Swal.fire({
        title: `El estado de esta orden esta "${valor}"`,
        text: "Cambiar el estado de la orden a...",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Realizada",
        denyButtonText: `Cancelada`
      }).then((result) => {
        if (result.isConfirmed) {
          //si apreta que si
          dispatch(updateStateOfOrder({ order: "realizada", id: id })).then(
            (res) => {
              Swal.fire(
                'Cambiaste el estado "pendiente" a "realizada" ',
                "",
                "success"
              );
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          );
        } else if (result.isDenied) {
          //si apreta no
          dispatch(updateStateOfOrder({ order: "cancelada", id: id })).then(
            (res) => {
              setTimeout(() => {
                Swal.fire(
                  'Cambiaste el estado "pendiente" a "cancelada"',
                  "",
                  "warning"
                );
                window.location.reload();
              }, 2000);
            }
          );
        }
      });
    }

    if (valor === "cancelada") {
      Swal.fire({
        title: `El estado de esta orden esta "${valor}"`,
        text: "Cambiar el estado de la orden a...",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Realizada",
        denyButtonText: "Pendiente"
      }).then((result) => {
        if (result.isConfirmed) {
          //si apreta que si
          dispatch(updateStateOfOrder({ order: "", id: id })).then(
            (res) => {
              setTimeout(() => {
                Swal.fire(
                  'Cambiaste el estado "cancelada" a "pendiente"',
                  "",
                  "warning"
                );
                window.location.reload();
              }, 2000);
            }
          );
        } else if (result.isDenied) {
          //si apreta no
          dispatch(updateStateOfOrder({ order: "realizada", id: id })).then(
            (res) => {
              setTimeout(() => {
                Swal.fire(
                  'Cambiaste el estado "cancelada" a "realizada" ',
                  "",
                  "success"
                );
                window.location.reload();
              }, 2000);
            }
          );
        }
      });
    }

    if (valor === "realizada") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes cambiar el estado cuando la orden esta realizada"
      });
    }
  };

  useEffect(() => {
    dispatch(orderStatus());
  }, [dispatch]);

  return (
    <div className="w-[95%] m-auto">
      <div className=" px-4 py-3 space-y-2">
        <div className="bg-grey col-12 mt-2 align-middle justify-content flex ">
          <div className="relative inline-block w-40 p-2 text-gray-700">
            <select
              onChange={handleChange}
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-md appearance-none focus:shadow-outline"
            >
              <option hidden>Órdenes</option>
              <option value="todas">Todas</option>
              <option value="realizada">Realizadas</option>
              <option value="pendiente">Pendientes</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table w-full">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ID
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              TOTAL
            </th>

            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              CANTIDAD
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              USUARIO
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              FECHA
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ESTADO
            </th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {orderstatus ? (
            [...orderstatus]
              .sort((a, b) => a.id - b.id)
              .map((e) => {
                const hora = e.order_date.split("-").join("/").slice(0, 10);
                const horaFinal = hora + " " + e.order_date.slice(11, 19);
                const cantidad = e.Products.length;
                return (
                  <tr className="odd:bg-white even:bg-slate-50" key={e.id}>
                    <th className="border border-gray-200 p-3 text-sm text-gray-700">
                      {e.id}
                    </th>
                    <td className="border border-gray-200 p-3 text-sm text-gray-700">
                      {" "}
                      $ {e.amount}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-700">
                      {" "}
                      {cantidad}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-700">
                      {" "}
                      {e.order_email}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-700">
                      {" "}
                      {horaFinal}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-700">
                      {" "}
                      {e.order_status}
                    </td>
                    <td className="border border-gray-200 p-3 text-sm text-gray-700">
                      <div>
                        <button
                          className="px-2 bg-lime-500 py-2 rounded-md text-white font-semibold hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:bg-lime-300 "
                          value={e.order_status}
                          id={e.id}
                          onClick={(e) => {
                            handleClick(e);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="px-2 bg-red-500 py-2 rounded-md text-white font-semibold hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:bg-red-300 "
                          onClick={(e) => handleDelete(e)}
                          value={e.id}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
          ) : (
            <div> no hay nda </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderStatus;
