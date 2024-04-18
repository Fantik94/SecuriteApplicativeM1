import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './context/AuthContext';

function Menu() {
    const { isAuthenticated, userRole, logout } = useContext(AuthContext);

    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark container">
                <NavLink to="/" className="navbar-brand fs-3">
                    <i>DADABAPT.blog</i>
                </NavLink>
                <div className="d-flex justify-content-between w-100">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Accueil
                            </NavLink>
                        </li>
                        {isAuthenticated && userRole === "ADMIN" && (
                            <li className="nav-item">
                                <NavLink to="/add-blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Ajouter un Blog
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated && userRole === "ADMIN" && (
                            <li className="nav-item">
                                <NavLink to="/blog-list" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Gérer les Blogs
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {isAuthenticated && (
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout}>
                                    Déconnexion
                                </button>
                            </li>
                        )}
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Connexion/Inscription
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Menu;
