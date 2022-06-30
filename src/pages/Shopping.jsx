import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderProducts } from "../redux/actions";

const Shopping = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const ProductOrder = useSelector((state) => state.orderProduct);
  console.log(ProductOrder);

  useEffect(() => {
    if (!ProductOrder.length) {
      dispatch(getOrderProducts());
    }
  }, [dispatch, ProductOrder]);
  return (
    <div >
      <h1>Shopping</h1>
 
      {ProductOrder ? (
        ProductOrder.map((product) => (
          <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div >
              <img
                src={product.image}
                alt={product.title}
                className="w-full mt-[100px]"
              />
            </div>
            <div className="xl:w-2/5 md:w-1/4 lg:ml-8 md:mt-0 mt-6"></div>
            {product.id}
            {product.title}
          </div>
        ))
      ) : (
        <div> Not found</div>
      )}
    </div>
  );
};

export default Shopping;
