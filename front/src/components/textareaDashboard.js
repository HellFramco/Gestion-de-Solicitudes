import React, { forwardRef } from 'react';
import IconSVG from './icon';

const TextareaDashboard = forwardRef(({
  name,
  value,
  placeholder = 'nombre',
  label = 'Nombre',
  colClassName = '',
  onChange,
  icon
}, ref) => {
  return (
    <div className={`input_dashboard ${colClassName}`}>
      <label htmlFor={name}>{label}</label>
      <section className='input_dashboard_content'>
        {icon && <IconSVG name={icon} />}
        <textarea
          ref={ref}
          className="required"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
          id={name}
        />
      </section>
    </div>
  );
});

export default TextareaDashboard;
