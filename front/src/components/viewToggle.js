import React from 'react';
import IconSVG from './icon';

const ViewToggle = ({ viewType, showCards, showList }) => {
  return (
    <div className="organizacion_dashboard">
      <div
        className={`option_diseño_card ${
          viewType === 'cards' ? 'active_organizacion_dashboard' : ''
        }`}
        onClick={showCards}
      >
        <IconSVG name="IconTipoTarjetas" />
      </div>
      <div
        className={`option_diseño_card ${
          viewType === 'list' ? 'active_organizacion_dashboard' : ''
        }`}
        onClick={showList}
      >
        <IconSVG name="IconTipoListas" />
      </div>
    </div>
  );
};

export default ViewToggle;
