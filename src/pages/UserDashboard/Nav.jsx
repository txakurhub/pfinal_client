import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getUser } from "../../redux/actions";
import { getFirestore, doc, getDoc } from "firebase/firestore";



const Nav = ({ setView, id }) => {
  const db = getFirestore();
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = (value) => setView(value);
  const history = useHistory()
  const [info, setInfo] = useState(null)


  const userInfo = async (currentUser)=>{
    const users = doc(db, 'user', currentUser);
      const docSnap = await getDoc(users);
      setInfo(docSnap.data())
  }

  const { user } =  useAuth()
const dispatch = useDispatch()
  useEffect(() => {
    
      dispatch(getUser(id))
      userInfo(user)
  }, [dispatch]);
  const currentUser = useSelector(state => state.user);


  return (
    <div className="dark:bg-gray-900 relative w-full bg-gray-100 shadow-sm p-6">
      {/* For md screen size */}
      <div id="md-searchbar" className={`${mdOptionsToggle ? "hidden" : "flex"} bg-gray-100 dark:bg-gray-900 lg:hidden pb-5 pt-0 items-center justify-center`}>
        <ul className={`hidden md:flex items-center justify-center space-x-8 bg-white w-full py-2 rounded-xl`}>
          <li>
            <a  href={"/"} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
            Inicio
            </a>
          </li>
          
          {/* <li>
            <a onClick={(e) => handleClick("perfil")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
             Mi perfil
            </a>
          </li> */}
          <li>
            <a onClick={(e) => handleClick("edit")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
              Editar mi perfil
            </a>
          </li>
          <li>
            <a onClick={(e) => handleClick("compras")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
             Mis Compras
            </a>
          </li>
          <li>
              <a onClick={(e) => handleClick("carrito")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Mi carrito
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("favoritos")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
               Mis favoritos
              </a>
            </li>
    
        </ul>
      </div>
      {/* For large screens */}
      <div className="dark:bg-gray-900 bg-gray-100 container mx-auto flex items-center justify-between">
        <a href="/" className="md:w-2/12 cursor-pointer text-gray-800 dark:text-white font-extrabold text-xl flex" aria-label="the Cribbb.">
          <p className="text-[#9CA3AF]">E</p>-<p>Commerce</p>
        </a>
        <div className="justify-end flex items-center space-x-4 xl:space-x-8">
          <ul className={`hidden lg:flex items-center justify-center space-x-8`}>
            <li>
              <a  href={"/"} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Inicio
              </a>
            </li>

            {/* <li>
            <a onClick={(e) => handleClick("perfil")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
             Mi perfil
            </a>
          </li> */}
            <li>
              <a onClick={(e) => handleClick("edit")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Editar
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("compras")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Mis compras
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("carrito")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Mi carrito
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("favoritos")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
               Mis favoritos
              </a>
            </li>
          </ul>
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
      {/* For small screen */}
      <div id="mobile-menu" className={`${showMenu ? "flex" : "hidden"} fixed dark:bg-gray-900 z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}>
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 p-4 relative">
          <button onClick={() => setShowMenu(false)} aria-label="close menu" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
            <svg className="fill-stroke text-gray-800 dark:text-white" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="mt-6 p-4 h-full">
          <ul className={`h-full flex flex-col items-center justify-evenly bg-white w-full py-2 rounded-xl md:hidden lg:hidden xl:hidden 2xl:hidden`}>
            <li>
              <a  href={"/"} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                inicio
              </a>
            </li>

            {/* <li>
            <a onClick={(e) => handleClick("perfil")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
             Mi perfil
            </a>
          </li> */}
            <li>
              <a onClick={(e) => handleClick("edit")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Editar
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("compras")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Mis compras
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("carrito")} className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                Mi carrito
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("favoritos")} className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
               Mis favoritos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
