import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as CharJS } from "chart.js/auto"; //importar para que muestre los graficos
import img from "../../assets/user.png";
const PanelAdmin = ({ productData, userData, categoryData, admin }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  const userList = [
    userData.length,
    userData.filter((e) => e.banned).length,
    userData.filter((e) => e.admin).length
  ];
  //grafica usuarios
  const [dataUser, setDataUser] = useState({
    labels: ["activo", "banned", "admin"],
    datasets: [
      {
        label: "Customers",
        data: userList,
        backgroundColor: ["#2FC936", "#C92F2F", "#2F53C9"], //darle color a las columnas
        borderColor: ["black"],
        borderWidth: 2
      }
    ]
  });
  //grafica productos
  const productList = [...productData]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);
  const [dataProduct, setDataProduct] = useState({
    labels: productList.map((e) => `${e.title.slice(0, 25).trim()}...`), //userData.map(e=> e.year).sort((a,b)=>b-a)
    datasets: [
      {
        label: "Ventas",
        data: productList.map((e) => e.sold), //userData.map(e=>e.userGain)
        backgroundColor: [
          "#ecf0f1",
          "#3EC92F",
          "#C92F2F",
          "#2FABC9",
          "#2FC98E",
          "#2F64C9",
          "#8A2FC9",
          "#A7C92F",
          "#C9722F",
          "#86A8E7"
        ], //darle color a las columnas
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  //grafica categorias
  const categoryList = [...categoryData].sort(
    (a, b) => b.cantidad - a.cantidad
  );
  const [dataCategory, setDataCategory] = useState({
    labels: categoryList.map((e) => e.name),
    datasets: [
      {
        label: "Productos",
        data: categoryList.map((e) => e.cantidad),
        backgroundColor: [
          "#ecf0f1",
          "#3EC92F",
          "#C92F2F",
          "#2FABC9",
          "#2FC98E",
          "#2F64C9",
          "#8A2FC9",
          "#A7C92F",
          "#C9722F",
          "#86A8E7"
        ].reverse(), //darle color a las columnas
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  return (
    <div className="flex flex-row p-4 mx-5">
      <div className="flex flex-col w-1/2">
        <div className="mt-5 max-w-sm mx-2 bg-slate-50 shadow-md shadow-gray-500/50 rounded-lg overflow-hidden max-h-32">
          <div className="sm:flex sm:items-center px-6 py-2">
            <img
              className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full"
              src={admin.image?admin.image:img}
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              {admin.firstname ? <p className="text-xl leading-tight font-semibold py-1">{` ${admin.firstname} ${admin.lastname?admin.lastname:null}`}</p>:<p className="text-xl leading-tight font-semibold py-1">{`Usuario`}</p>}
            <p className="text-xs leading-tight text-gray-400 py-1">
                #{admin.uid}
              </p>
              <p className="text-xs leading-tight text-gray-600 py-1"> {admin.email}</p>
              <div className="mt-1">
                <button className="text-white-500 text-white bg-green-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">
                  {admin.admin && "Admin"}
                  {admin.superAdmin && "Super Admin"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 max-w-sm mx-2 bg-slate-50 shadow-md shadow-gray-500/50 rounded-lg overflow-hidden py-6  px-9">
          <h3 className="text-xl leading-tight pb-2">Usuarios total</h3>
          <Pie data={dataUser} />
        </div>
      </div>
      <div className="flex flex-col w-1/2">
      <div className="mt-5 w-auto bg-slate-50 shadow-md shadow-gray-500/50 rounded-lg overflow-hidden py-4 px-5">
          <h3 className="text-xl leading-tight pb-2">
            Productos mas vendidos
          </h3>
          <Bar data={dataProduct} options={options} />
        </div>
        <div className="mt-5 w-auto bg-slate-50 shadow-md shadow-gray-500/50 rounded-lg overflow-hidden py-2 px-5">
          <h3 className="text-xl leading-tight pb-2">Categorias total</h3>
          <Bar data={dataCategory} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;