import React, { useEffect, useRef } from 'react';
import IconSVG from './icon';

const ActionMenu = ({ actions, isActive, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    isActive && (
      <ul
        className="menu_acciones"
        ref={menuRef}
        onClick={(event) => event.stopPropagation()}
      >
        {actions.map((action, index) => (
          <li
            key={index}
            onClick={action.onClick}
            className={action.className}
          >
            <IconSVG name={action.icon} />
            <span>{action.label}</span>
          </li>
        ))}
      </ul>
    )
  );
};

export default ActionMenu;
