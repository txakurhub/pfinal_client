import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getOrderProducts } from "../redux/actions";

const Shopping = ({email}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loader, setLoader] = useState(true);
  const ProductOrder = useSelector((state) => state.orderProduct);


  // const { user } = useAuth()
//  const email = user?.reloadUserInfo.email
  const numberFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
    }).format(value);

  useEffect(() => {
    // if (!ProductOrder.length) {
      dispatch(getOrderProducts(email));
    // }
  }, [dispatch]); 

  const handledetail = (e)=>{
   e.preventDefault();
    history.push(`/detail/${e.target.value}`)
    window.location.reload();
  }
  return (
    <div>
      <h1 >Compras</h1>
      <br />
      <hr />
      {ProductOrder?.length > 0 ? (
        ProductOrder.map((e) => {
          const hora = e.order_date.split("-").join("/").slice(0, 10);
          
          const horaFinal = hora 

          return (
            <div key={e.id}>
              <div>{horaFinal}</div>
                <h1 className="text-2xl">Estado de la orden: {e.order_status}</h1>
              <div>{e.Products? e.Products.length: 0} Compras</div>
              
              {e.Products &&
                e.Products.map((product) => (
                  <div key={product.id}>

<section className="container mx-auto p-10 md:p-20 transform duration-500 mb-0">
        <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-screen-lg  border border-gray-200 bg-white">
            <img className="w-full md:w-2/4 h-auto" draggable="false" src={product.image} alt="" />
            <div className="p-8 my-auto">
                <h1 className="text-2xl font-semibold text-gray-800">{product.title}</h1>
                <p className="text-base text-gray-600 mt-2">
                {product.category}
                </p>
                <p className="text-base text-gray-400 mt-2">
                {numberFormat(product.price)}
                </p>
                <p className="text-base text-gray-400 mt-2">
                  
                  <button onClick={(e)=>handledetail(e)} value={product.id} className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">Más información</button>
        
                
                </p>
            </div>
        </article>
    </section>
                    
               

   
                  </div>
                ))}
            </div>
          );
        })
      ) : (
        <div> No Existe Registro De Compras</div>
      )}
    </div>
  );
};

export default Shopping;
