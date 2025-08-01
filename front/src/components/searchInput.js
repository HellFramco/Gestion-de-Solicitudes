import React from 'react';
import IconSVG from './icon';

const SeacrhInput = ({
  type = 'text',
  name = 'name',
  value,
  placeholder = 'nombre',
  colClassName = '',
  onChange
}) => {
  return (
    <div className={`${colClassName}`}>
      <div className="section_dashboard_buscador">
        <IconSVG name="IconBusqueda" />
        <input
          type={type}
          className=""
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SeacrhInput;
