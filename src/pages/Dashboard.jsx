import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCategoryAdmin,
  getCategories,
  getProducts,
  getUsers,
  orderStatus
} from "../redux/actions";
import Container from "./Dashboard/Container";
import Nav from "./Dashboard/Nav";

const Dashboard = () => {
  const [view, setView] = useState("dashboard");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllCategoryAdmin());
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(orderStatus());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Nav setView={setView} /> {/* va ir arriba */}
      <Container active={view} /> {/* ocupa el resto de la pantalla */}
    </div>
  );
};

export default Dashboard;
