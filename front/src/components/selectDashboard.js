import React, { forwardRef } from 'react';
import IconSVG from './icon';

const SelectDashboard = forwardRef(({
  label,
  name,
  options,
  onSelectChange,
  defaultOption,
  value,
  className,
  icon
}, ref) => {
  return (
    <div className="input_dashboard">
      <label>{label}</label>
      <section className="input_dashboard_content">
        <IconSVG name={icon} />
        <select
          ref={ref}
          name={name}
          className={`required ${className ?? ''}`}
          data-required={`Debe seleccionar un ${label}`}
          onChange={onSelectChange}
          value={value}
        >
          <option value="">{defaultOption}</option>
          {options.length > 0 ? (
            options.map(option => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))
          ) : (
            <option value="">Sin opciones disponibles</option>
          )}
        </select>
      </section>
    </div>
  );
});

export default SelectDashboard;
