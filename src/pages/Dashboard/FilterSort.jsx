import React from 'react'


function FilterSort({estado,tipo,cambiar}) {
  return (
    <div>
      <select name={tipo}>
        <option hidden=""></option>
        {estado?.map(e=>( <option key={e.id} value={e.name}>{e.name}</option> ))}
      </select>
    </div>
  )
}

export default FilterSort