import React from 'react';
import SeacrhInput from './searchInput';

const SeacrhData = ({ searchTerm, handleSearchChange, btnCreate }) => {
  return (
    <div className="buscar_data">
      <SeacrhInput
        name="search"
        label="Buscar"
        placeholder="Buscar y filtrar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {btnCreate}
    </div>
  );
};

export default SeacrhData;
