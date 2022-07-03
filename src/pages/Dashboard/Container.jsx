import React from "react";
import { useSelector } from "react-redux";
import OrderStatus from "../../components/OrderStatus";
import Users from "../../components/Users";
import Categories from "./Categories";
import PanelAdmin from "./PanelAdmin";
import Shoes from "./Shoes";

const Container = ({ active }) => {
  const { allProducts, users, orderstatus, allcategoriesAdmin } = useSelector(
    (state) => state
  );

  if (active === "customers") return <Users />;
  if (active === "shoes") return <Shoes />;
  if (active === "categories") return <Categories />;
  if (active === "order") return <OrderStatus />;
  if (active === "dashboard") {
    if (allProducts.length && users.length && orderstatus)
      return (
        <PanelAdmin
          productData={allProducts}
          userData={users}
          categoryData={allcategoriesAdmin}
          orderData={orderstatus}
        />
      );
    else return <div>Espera que esta cargando capo</div>;
  }
};

export default Container;
