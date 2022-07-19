import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartItem";

const FeaturedCards = ({ title, image, price, id, product, brand, model, toggle, onClick, setProduct, sinStock }) => {
    const { addToCart } = useContext(CartContext);

    const numberFormat = (value) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            currencyDisplay: "symbol",
        }).format(value);

    return (
        <div key={id} className="flex m-2 mb-6 group w-[240px] h-[120px] bg-white rounded-lg hover:shadow-2xl transition delay-200 duration-300 overflow-hidden ">

            <img
                src={image}
                alt="Not found"
                className=" self-center  w-[140px] h-[70px] object-center object-cover "
            />
            <article className="flex flex-col">
                <p title={'$' + price} className=" mt-1 text-lg text-start font-medium text-gray-900">{numberFormat(price)}</p>
                <a title="Ir al detalle del producto" href={`/detail/${id}`} className="overflow-hidden  self-center">
                    <h3 title={title} className="mt-2 text-md text-start font-medium text-gray-900  h-[20px] truncate overflow-hidden">{brand}</h3>
                    <h3 title={title} className="mt-2 text-sm text-start text-gray-700  h-[20px] truncate overflow-hidden">{model}</h3>
                </a>
            </article>
        </div>


    );
};

export default FeaturedCards;