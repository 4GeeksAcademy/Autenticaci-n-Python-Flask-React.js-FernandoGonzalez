import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("See you next time!");
        actions.logout();
        navigate("/login");
    };

    return (
        <div className="container-fluid">
            <h1>Mi Perfil</h1>
            <img src="https://image.tmdb.org/t/p/original/1r8TWaAExHbFRzyqT3Vcbq1XZQb.jpg" className="card" alt="..." />
            <button onClick={handleLogout} className="btn-c">
                Cerrar Sesión
            </button>
        </div>
    );
};




