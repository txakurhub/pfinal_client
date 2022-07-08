import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSneakes } from "../redux/actions";
import ShoppingCart from "./ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";

const NavBar = ({ nombreProductos, setCurrentPage, loading, user, handleLogin, handleLogout }) => {
  const wishlist = useSelector((state) => state.wishlist);
  const [searchInput, setSearchInput] = useState(true);
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState('');
  const { userStorage } =  useAuth();
  console.log(userStorage);

  const To = (props) => history.push('/' + props ? props : null);

  const [suggestionsState, setSuggestionsState] = useState({ mostrar: false, sugerencia: [] });

  const suggestions = (texto) => {
    if (nombreProductos.length) {
      if (!texto) {
        setSuggestionsState({ sugerencia: [], mostrar: false });
        return;
      };
      if (texto) {
        const filtrado = nombreProductos.filter(e => `${e.title} ${e.brand}`.toLowerCase().includes(texto.toLowerCase()));
        setSuggestionsState({ mostrar: true, sugerencia: filtrado.length > 5 ? [filtrado[0], filtrado[1], filtrado[2], filtrado[4], filtrado[5]] : filtrado });
      };
    };
  };

  const handleClick = (e) => {
    setInput(e.target.id);
    setSuggestionsState({ sugerencia: [], mostrar: false });
  };

  const handleChange = async (e) => {
    await setInput(e.target.value);
    suggestions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchSneakes(input));
    setInput('');
    setCurrentPage(1);
  };

  return (
    <div className="dark:bg-gray-900">
      <div>
        <div className="relative">
          {/* For md screen size */}
          <div id="md-searchbar" className={`${mdOptionsToggle ? "hidden" : "flex"} bg-white dark:bg-gray-900 lg:hidden py-5 px-6 items-center justify-between`}>
            <form className="flex items-center space-x-3 text-gray-800 dark:text-white relative">
              <div>
                <svg className="fill-stroke" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.9984 18.9999L14.6484 14.6499" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input value={input} onChange={handleChange} type="text" placeholder="Search for products" className="text-sm leading-none dark:text-gray-300 dark:bg-gray-900 text-gray-600 focus:outline-none" />
              {
                suggestionsState.mostrar && (
                  <div className="absolute top-[37px] left-0 right-0 bg-white p-1 shadow">
                    {
                      suggestionsState.sugerencia.map((el, index) => (
                        <p key={index} onClick={(e) => handleClick(e)} id={el.title} className={`hover:bg-gray-50 h-[25px] truncate cursor-pointer`}>
                          {`${el.title}`}
                        </p>
                      ))
                    }
                  </div>
                )
              }
            </form>
            <div className="space-x-6 flex items-center">
              <button onClick={() => To('user/1/wishlist')} aria-label="Ver favoritos" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                <svg className="fill-stroke" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8921 3.07357C13.5516 2.73291 13.1473 2.46267 12.7023 2.2783C12.2574 2.09392 11.7804 1.99902 11.2988 1.99902C10.8171 1.99902 10.3402 2.09392 9.89521 2.2783C9.45023 2.46267 9.04595 2.73291 8.70544 3.07357L7.99878 3.78024L7.29211 3.07357C6.60432 2.38578 5.67147 1.99938 4.69878 1.99938C3.72609 1.99938 2.79324 2.38578 2.10544 3.07357C1.41765 3.76137 1.03125 4.69422 1.03125 5.66691C1.03125 6.6396 1.41765 7.57245 2.10544 8.26024L2.81211 8.96691L7.99878 14.1536L13.1854 8.96691L13.8921 8.26024C14.2328 7.91974 14.503 7.51545 14.6874 7.07048C14.8718 6.6255 14.9667 6.14857 14.9667 5.66691C14.9667 5.18525 14.8718 4.70831 14.6874 4.26334C14.503 3.81836 14.2328 3.41408 13.8921 3.07357V3.07357Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={() => To('cart')} aria-label="Ir al carrito" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                <svg className="fill-stroke" width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66667 1L1 4.2V15.4C1 15.8243 1.1873 16.2313 1.5207 16.5314C1.8541 16.8314 2.30628 17 2.77778 17H15.2222C15.6937 17 16.1459 16.8314 16.4793 16.5314C16.8127 16.2313 17 15.8243 17 15.4V4.2L14.3333 1H3.66667Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 4.2002H17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.5564 7.3999C12.5564 8.2486 12.1818 9.06253 11.515 9.66264C10.8482 10.2628 9.94386 10.5999 9.00087 10.5999C8.05788 10.5999 7.15351 10.2628 6.48671 9.66264C5.81991 9.06253 5.44531 8.2486 5.44531 7.3999" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {
                loading ?
                <h4 className="dark:text-white">Cargando...</h4> :
                user ?
                <button className="dark:text-white" onClick={handleLogout}>Cerrar sesión</button> :
                <button className="dark:text-white" onClick={handleLogin}>Iniciar sesión</button>
              }
            </div>
          </div>
          {/* For large screens */}
          <div className="dark:bg-gray-900 bg-gray-50 px-6 py-9">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="md:w-auto cursor-pointer text-gray-800 dark:text-white font-extrabold text-xl flex" aria-label="the Cribbb.">
                <p className="text-[#9CA3AF]">E</p>-<p>Commerce</p>
              </h1>
              <div className="md:w-auto justify-end flex items-center space-x-4 xl:space-x-8">
                {
                  user ?
                  <button title="Ir al perfil" onClick={() => To(`/user/profile/${user.uid}`)} className="ml-1.5 dark:text-white capitalize flex items-center">
                    {
                      userStorage.image ?
                      <div className="h-7 w-7 rounded-full mr-1.5 overflow-hidden">
                        <img src={userStorage.image} alt="Not found" className="h-full" />
                      </div> :
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    Hola, {user.displayName === null ? user.email.split('@', 1).toString() : user.displayName}
                  </button> :
                  null
                }
                <form onSubmit={handleSubmit} className="hidden lg:flex items-center relative">
                  <button onClick={() => setSearchInput(!searchInput)} aria-label="search items" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 11C5 15.4183 8.58172 19 13 19C17.4183 19 21 15.4183 21 11C21 6.58172 17.4183 3 13 3C8.58172 3 5 6.58172 5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.99961 20.9999L7.34961 16.6499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <input value={input} onChange={handleChange} id="searchInput" type="text" placeholder="buscar" className={`w-[250px] ${searchInput ? "hidden" : ""} text-sm dark:bg-gray-900 dark:placeholder-gray-300 text-gray-600 rounded ml-1 border border-transparent focus:outline-none focus:border-gray-400 px-1`} />
                  {
                    suggestionsState.mostrar && (
                      <div className="absolute top-[25px] left-0 right-0 bg-gray-50 p-1 z-10 rounded-b">
                        {
                          suggestionsState.sugerencia.map((el, index) => (
                            <p key={index} onClick={(e) => handleClick(e)} id={el.title} className={`hover:bg-white h-[25px] truncate cursor-pointer ${searchInput ? "hidden" : ""}`}>
                              {`${el.title}`}
                            </p>
                          ))
                        }
                      </div>
                    )
                  }
                </form>
                <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                  <button onClick={() => To('user/1/wishlist')} aria-label="view favourites" className="relative text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {
                      wishlist.length !== 0 ?
                      <p className={`flex items-center justify-center font-bold text-[10px] w-4 h-4 bg-red-500 rounded-full absolute top-[-5px] right-[-5px] text-white`}>
                        {wishlist.length}
                      </p> :
                      null
                    }
                  </button>
                  <ShoppingCart />
                  {
                    loading ?
                    <h4 className="dark:text-white">Cargando...</h4> :
                    user ?
                    <button className="dark:text-white" onClick={handleLogout}>Cerrar sesión</button> :
                    <button className="dark:text-white" onClick={handleLogin}>Iniciar sesión</button>
                  }
                </div>
                <div className="flex lg:hidden">
                  <button aria-label="show options" onClick={() => setMdOptionsToggle(!mdOptionsToggle)} className="text-black dark:text-white dark:hover:text-gray-300 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button aria-label="open menu" onClick={() => setShowMenu(true)} className="text-black dark:text-white dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* For small screen */}
          <div id="mobile-menu" className={`${showMenu ? "flex" : "hidden"} fixed dark:bg-gray-900 z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}>
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 p-4 relative">
              <form className="flex items-center space-x-3 relative">
                <div>
                  <svg className="fill-stroke text-gray-800 dark:text-white" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.9984 18.9999L14.6484 14.6499" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input value={input} onChange={handleChange} type="text" placeholder="Search for products" className="text-sm dark:bg-gray-900 text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none" />
              </form>
              {
                suggestionsState.mostrar && (
                  <div className="absolute top-[37px] left-0 right-0 bg-white p-1 shadow">
                    {
                      suggestionsState.sugerencia.map((el, index) => (
                        <p key={index} onClick={(e) => handleClick(e)} id={el.title} className={`hover:bg-gray-50 h-[25px] truncate cursor-pointer`}>
                          {`${el.title}`}
                        </p>
                      ))
                    }
                  </div>
                )
              }
              <button onClick={() => setShowMenu(false)} aria-label="close menu" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                <svg className="fill-stroke text-gray-800 dark:text-white" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 p-4">
              <ul className="flex flex-col space-y-6">
                <li>
                  <a href="/" className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                    Inicio
                    <div>
                      <svg className="fill-stroke text-black dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="h-full flex items-end">
              <ul className="flex flex-col space-y-8 bg-gray-50 w-full py-10 p-4 dark:bg-gray-800">
                <li className="dark:text-white text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                  <ShoppingCart />
                  <p className="text-base ml-1.5 cursor-pointer">Favoritos</p>
                </li>
                <li>
                  <a href="/user/1/wishlist" className="dark:text-white text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                    <div>
                      <svg className="fill-stroke" width={25} height={25} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-base">Favoritos</p>
                  </a>
                </li>
                {
                  user ?
                  <li>
                    <a to={`/user/profile/${user.uid}`} className="dark:text-white text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-base cursor-pointer">Perfil</p>
                    </a>
                  </li> :
                  null
                }
                <li>
                  {
                    loading ?
                    <h4 className="dark:text-white">Cargando...</h4> :
                    user ?
                    <button className="dark:text-white" onClick={handleLogout}>Cerrar sesión</button>:
                    <button className="dark:text-white" onClick={handleLogin}>Iniciar sesión</button>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default NavBar;
