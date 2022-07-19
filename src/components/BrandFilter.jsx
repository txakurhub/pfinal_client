import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterByBrand } from "../redux/actions";

export default function BrandFilter({ setCurrentPage }) {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  let brandsName = allProducts.map((t) => t.brand).sort();

  function handleFilterTemp(e) {
    dispatch(filterByBrand(e.target.value));
    setCurrentPage(1);
  }
  return (
    <select onChange={(e) => handleFilterTemp(e)}>
      <option value="All">All Brands</option>
      {brandsName.map((b) => {
        return (
          <option value={b} key={brandsName.indexOf(b)}>
            {b}
          </option>
        );
      })}
    </select>
  );
}
