import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { getShoeDetail, getPictures, /*clearStateDetail*/ } from "../redux/actions";
import { create_new_wishlist } from "../redux/actions";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartItem";

const QuickView = ({ id, product }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.product_detail);
    const pictures = useSelector((state) => state.pictures);
    const { addToCart } = useContext(CartContext);
    const numberFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
    }).format(value);
    const handleaddwishlist = (e) => {
        e.preventDefault();
        dispatch(create_new_wishlist({user_id: 1, product_id: id}))
        setCount(1)
    };

    useEffect(() => {
        dispatch(getShoeDetail(id))
        dispatch(getPictures(id))
        // return () => {
        //     dispatch(clearStateDetail())
        // }
    }, [dispatch, id ]);

    const result = product.wishlists.filter( d => d.userId === '1')
    const [count, setCount] = useState(result?.length || 0);

    return (
        <div id="viewerBox" className="lg:p-10 md:p-6 p-4 bg-white">
            <div className="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-stretch justify-center lg:space-x-8">
                <CarouselProvider naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={3} className="lg:w-1/2 flex justify-between items-strech bg-gray-50 px-2 py-20 md:py-6 md:px-6 lg:py-0">
                    <div className="flex items-center">
                        <ButtonBack aria-label="slide back" className="mr-3 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-100" role="button">
                            <svg className="w-10 h-10 lg:w-16 lg:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40 16L24 32L40 48" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                    </div>
                    <div className="slider">
                        <div className="slide-ana lg:relative">
                            <Slider>
                                {
                                    pictures.map((r, index) => 
                                        <Slide>
                                            <img key={index++} src={r} alt="Not found" className="h-[150px] w-[350px] mt-[130px]" />
                                        </Slide>
                                    )
                                }
                            </Slider>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ButtonNext role="button" aria-label="next slide" className="cursor-pointer ml-2">
                            <svg className="w-10 h-10 lg:w-16 lg:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 16L40 32L24 48" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                <div className="h-full lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
                    <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">{selected.title}</h1>
                    <p className="text-3xl font-medium text-gray-600 mt-8 md:mt-10">{numberFormat(selected.price)}</p>
                    <div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
                    { product.stock ?
                        <button onClick={() => addToCart(product)} disabled={product.stock === 0} className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 text-white">
                        <p>Añadir al Carrito</p>
                        </button>
                        :
                        <button onClick={() => addToCart(product)} disabled={product.stock === 0} className="w-full md:w-3/5  text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-red-600 text-white hover:bg-red-800">
                         <p class="text-white ">Sin Stock</p>
                        </button>
                        }
                        <Link to={`/detail/${id}`} className="w-full md:w-2/5">
                            <button className="w-full border border-gray-800 text-base font-medium leading-none text-gray-800 uppercase py-6 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white">
                                Ver detalles
                            </button>
                        </Link>
                    </div>
                </div>
                <style>{`
                    .slider {
                        width: 350px;
                        height: 400px;
                        position: relative;
                        overflow: hidden;
                    }
        
                    .slide-ana {
                        height: 360px;
                    }
        
                    .slide-ana > div {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        transition: all 0.7s;
                    }

                    .slide-ana > div > div > div {
                        width: 600%;
                    }
        
                    @media (min-width: 200px) and (max-width: 639px) {
                        .slider {
                            height: 300px;
                            width: 170px;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default QuickView;
