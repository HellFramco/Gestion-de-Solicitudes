import React from 'react';
import './../assets/modal.css';

const Modal = ({
  isOpen,
  onClose,
  children,
  titulo,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <section className="modal_content_dashboard" onClick={onClose}>
      <aside
        className={`modal_content_items ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal_header">
          <h3>{titulo}</h3>
          <button className="modal__close_dashboard" onClick={onClose}>
            ×
          </button>
        </header>
        {children}
      </aside>
    </section>
  );
};

export default Modal;
