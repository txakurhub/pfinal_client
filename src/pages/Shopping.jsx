import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderProducts } from "../redux/actions";


const Shopping = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const ProductOrder = useSelector((state) => state.orderProduct);
  console.log(ProductOrder);


  const numberFormat = (value) => new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol'
  }).format(value);



  useEffect(() => {
    if (!ProductOrder.length) {
      dispatch(getOrderProducts());
    }
  }, [dispatch, ProductOrder]);
  return (
    <div >
      <h1>Shopping</h1>
      <hr />
      {ProductOrder ? (
        ProductOrder.map((e) => {  
          const hora = e.order_date.split('-').join('/').slice(0, 10)
          const horaFinal = hora + '-' + e.order_date.slice(11, 19)
          return (
          
          <div key={e.id}>
<div>
  {horaFinal} 
</div>
            {e.Products && e.Products.map((product) =>(
              <div key={product.id}>
               <div >
                <img
                 src={product.image}
                 alt="Not found Image "
               />
              </div>
            
            <div>
            {product.id}
            </div>
            <br />
            <div>
            Titulo: {product.title}
            </div>
            <br />
            <div>
            Categoria: {product.category}
            </div>
            <br />
            <div>
              {numberFormat(product.price) }
            </div>
            <hr />
          </div>
    
         ))}
  
          </div>
       
        )})
      ) : (
        <div> Not found</div>
      )}
    </div>
  );
};

export default Shopping;
