import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as CharJS } from "chart.js/auto"; //importar para que muestre los graficos
import img from "../../assets/user.png";
const PanelAdmin = ({ productData, userData, categoryData, id }) => {
  const userList = [
    userData.length,
    userData.filter((e) => e.banned).length,
    userData.filter((e) => e.banned).length
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
  const [admin, setAdmin] = useState(
    userData.find((e) => e.id === "7R07xtn17ZU09JHnm6Mi")
  ); //harcodeado porque falta hacer ruta protegida
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {admin && (
          <div>
            <h1>{`${admin.firstname} ${admin.lastname}`}</h1>
            <img src={img} alt="user" width={100} height={100} />
            {admin.admin && <h3>Admin </h3>}
            {admin.superAdmin && <h3>Super Admin </h3>}
          </div>
        )}
        <div className="w-64">
          {/* esto es user */}
          <h3>Usuarios total</h3>
          <Pie data={dataUser} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <h3>Categorias total</h3>
          <Bar data={dataCategory} />
        </div>

        <div className="w-1/2">
          <h3>TOP 10 Productos mas vendidos</h3>
          <Bar data={dataProduct} />
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
