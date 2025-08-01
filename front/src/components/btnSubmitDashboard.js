import React from 'react';
import IconSVG from './icon';

const BtnSubmitDashboard = ({ text }) => {
  return (
    <div className="btn_dashboard">
      <button type="submit">
        <IconSVG name="IconGuardar" />
        <span>{text}</span>
      </button>
    </div>
  );
};

export default BtnSubmitDashboard;
