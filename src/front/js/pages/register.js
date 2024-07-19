
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { actions } = useContext(Context);

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const data = await actions.register(email, password);
            setMessage("User registered successfully");
            console.log("User registered successfully", data);
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            setMessage(`Error registering user: ${error.message}`);
            console.log("Error registering user", error);
        }
    };

    return (
        <div className="container-fluid py-3">
            <h1>Registrate</h1>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                        </span>
                    </div>
                </div>
                <button type="submit" className="btn-a">Register</button>
                <Link to="/" className="home">Come Back to Home</Link>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};


