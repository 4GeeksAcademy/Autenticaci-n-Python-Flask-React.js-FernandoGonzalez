import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.login(email, password);
            if (response && response.token) {
                window.location.href = "/private";
            }
        } catch (error) {
            setError("Tu contraseña o email es incorrecta");
        }
    }


    return (
        <div className="container-fluid py-5">
            <h1>Inicia Sesion</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert.danger" role="alert">{error}</div>}
                <button type="submit" className="btn-b btn-primary">Login</button>
                <Link to="/" className="come">Come Back to Home</Link>
            </form>
        </div>
    );
};
