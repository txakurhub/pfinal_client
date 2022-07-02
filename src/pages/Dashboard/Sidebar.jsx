import React from 'react'

function Sidebar({setView , view}) {

    const handleClick=(value)=>{
        setView(value)
    }

  return (
  <div className="flex flex-col w-30 gap-2 px-5">
  <div className={view === "dashboard" ? `p-4 font-semibold text-slate-600 cursor-pointer`:`p-4 font-semibold text-slate-700 cursor-pointer`} onClick={(e)=>handleClick("dashboard")}>Dashboard</div>
  <div className={ view === "customers" ? `p-4 bg-gray-500 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`:`p-4 bg-gray-400 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`} onClick={(e)=>handleClick("customers")}>Customers</div>
  <div className={ view === "shoes" ? `p-4 bg-gray-500 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`:`p-4 bg-gray-400 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`} onClick={(e)=>handleClick("shoes")}>Shoes</div>
  <div className={ view === "categories" ? `p-4 bg-gray-500 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`:`p-4 bg-gray-400 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`} onClick={(e)=>handleClick("categories")}>Categories</div>
  <div className={ view === "order" ? `p-4 bg-gray-500 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`:`p-4 bg-gray-400 text-white font-semibold rounded-lg hover:text-slate-700 cursor-pointer`} onClick={(e)=>handleClick("order")}>Order status</div>
 </div>
  )
}

export default Sidebar