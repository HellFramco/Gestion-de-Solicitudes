import { forwardRef } from 'react';
import IconSVG from './icon';

const InputDashboard = forwardRef(({
  type = 'text',
  name,
  value,
  placeholder = 'nombre',
  label = 'Nombre',
  colClassName = '',
  onChange,
  icon,
  onKeyDown
}, ref) => {
  return (
    <div className={`input_dashboard ${colClassName}`}>
      <label htmlFor={name}>{label}</label>
      <section className="input_dashboard_content">
        {icon && <IconSVG name={icon} />}
        <input
          ref={ref}
          type={type}
          className="required"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
          id={name}
          onKeyDown={onKeyDown}
        />
      </section>
    </div>
  );
});

export default InputDashboard;
