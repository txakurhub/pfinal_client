import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { allFilters } from "../redux/actions"
import FilterPrice from '../components/FilterPrice';
import swal from 'sweetalert';

const Filters = ({ setOrder, setCurrentPage, order }) => {

  const [filter, setFilter] = useState({});
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filter.brand && !filter.category) {
      swal("Seleccione un tipo de filtro");
    } else {
      dispatch(allFilters({ ...filter, precioMin: priceMin, precioMax: priceMax }));
      setFilter({
        brand: '',
        category: '',
      });
      setPriceMin('');
      setPriceMax('');
    };
  };

  const handlePriceMin = (e) => {
    e.preventDefault();
    setPriceMin(e.target.value);
  };

  const handlePriceMax = (e) => {
    e.preventDefault();
    setPriceMax(e.target.value);
  };
  
  return (
    <div className="w-[90%] flex justify-center items-center mt-4 flex-col lg:flex-col gap-10">
      {/* <div className="flex gap-3 mb-2.5 lg:mb-0 h-full justify-around"> */}
       
        <select name='brand' value={filter.brand} onChange={handleChange} className="w-60 border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
          <option hidden>Marca</option>
          <option value='Nike'>Nike</option>
          <option value='adidas'>Adidas</option>
          <option value='Vans'>Vans</option>
          <option value='Converse'>Converse</option>
          <option value='Caterpillar'>Caterpillar</option>
          <option value='Vizzano'>Vizzano</option>
          <option value='Briganti'>Briganti</option>
          <option value='Faraon'>Faraon</option>
          <option value='Sport'>Sport</option>
          <option value='Moleca'>Moleca</option>
        </select>
        <select name='category' value={filter.category} onChange={handleChange} className="w-60 border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
          <option hidden>Categoría</option>
          {categories.map((t) => (
            <option
              key={categories.indexOf(t)}
              value={t.id}>{t.name}</option>
          ))}
        </select>
      {/* </div> */}
      <div className="flex gap-3 lg:ml-3 justify-around">
        <p className='self-center'>De</p>
        <input type='number' value={priceMin} min={1} max={priceMax} placeholder="min" onChange={handlePriceMin} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400 w-20" />
        <p className='self-center'>a</p>
        <input type='number' value={priceMax} max={80000} min={priceMin} placeholder="max" onChange={handlePriceMax} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400 w-20"  />
      </div>
        <button onClick={e => handleSubmit(e)} className="hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">
            Aplicar Filtros
        </button>
    </div>
  );
};

export default Filters;
