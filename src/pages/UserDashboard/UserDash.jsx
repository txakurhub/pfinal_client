import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LocalStorage } from "../../context/LocalStorage";
import Container from "./Container";
import Nav from "./Nav";

const Dashboard = () => {
  // const [userStorage, setUserStorage] = LocalStorage("user",{}) 
  const [view, setView] = LocalStorage("view",{}) 
  const dispatch = useDispatch();
  const { id } = useParams();
 

  return (
    <div className="w-full">
      <Nav setView={setView} id={id} /> {/* va ir arriba */}
      <Container active={view} id={id} />     {/* {ocupa el resto de la pantalla} */}
    </div>
  );
};

export default Dashboard;