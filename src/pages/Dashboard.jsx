import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategories, getProducts } from "../redux/actions";
import Container from "./Dashboard/Container";
import Nav from "./Dashboard/Nav";
import Sidebar from "./Dashboard/Sidebar";

function Dashboard() {
  const [view, setView] = useState("dashboard")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])
  
  return(
    <div>
      <Nav/> {/* va ir arriba */}
      <Sidebar setView={setView}/> {/* barra lateral */}
      <Container active={view}/> {/* ocupa el resto de la pantalla */}
    </div>
  )
}

export default Dashboard;