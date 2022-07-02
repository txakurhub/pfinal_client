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
    <div className="w-full">
      <div className="flex bg-gray-100 shadow-sm p-6">
      <Nav/> {/* va ir arriba */}
      </div>
      <div className="flex h-screen">
      <div className="px-3 w-90 ">
      <Sidebar setView={setView} view={view}/> {/* barra lateral */}
       </div>
      <div className="p-2">
      <Container active={view}/> {/* ocupa el resto de la pantalla */}
      </div>
      </div>
    </div>
  )
}

export default Dashboard;