import React, { useState } from "react";
import Filters from './Filters'

const PageHeading = ({ products, setOrder, setCurrentPage, order }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-gray-200 py-5 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex flex-col justify-center items-center ease-in-out transition duration-500">
     
      {show ? null : <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} order={order} />}
    </div>
  );
};

export default PageHeading;
