import React, { useState } from "react";

const NavBar = ()=>{
    return(
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width={54} height={54} viewBox="0 0 54 54"/>
                <span className="font-semibold text-xl tracking-tight">La Navbar</span>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200">
                    <svg className="fill-stroke" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"/>
                    </button>
                </div>
            </div>
        </nav>
    )
}