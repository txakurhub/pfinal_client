import React from "react";
const Modal = ({ active, toggle, children}) => {
  return (
    <>
      {
        active && 
        <div className="p-12 backdrop-blur-sm transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0" id="modal">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded h-full">
            {children}
            <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out" onClick={toggle}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default Modal;