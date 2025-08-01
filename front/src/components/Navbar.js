import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const toggleSubMenu = (menuName) => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  const handleMenuClick = (title) => {
    console.log("Menú:", title);
  };

  return (
    <ul className="dashboard_menu_items">
      <div className="dashboard_menu_main">
        <li className="dashboard_menu_item_drop">
          <Link
            to="/dashboard/emplooyes"
            className={`dashboard_menu_item_content ${
              activeSubMenu === "item_users" ? "active__item_menu" : ""
            }`}
            onClick={() => {
              toggleSubMenu("item_users");
              toggleMenu("default_item");
              handleMenuClick("Usuarios");
            }}
          >
            <span>Empleados</span>
          </Link>
        </li>

        {/* CIERRE DE SESIÓN */}
        <div className="dashboard_menu_exit">
          <li className="dashboard_menu_item dashboard_cerrar_sesion">
            <Link to="/" onClick={handleLogout}>
              <div>Cerrar sesión</div>
            </Link>
          </li>
        </div>
      </div>

      <footer className="dashboard_footer">
        <li>
          <Link to="/">Términos y condiciones</Link> |{" "}
          <Link to="/">Política de tratamiento de datos</Link>
        </li>
        <li>
          <p>© 2025 Manuel Barrios</p>
        </li>
      </footer>
    </ul>
  );
};

export default Navbar;
