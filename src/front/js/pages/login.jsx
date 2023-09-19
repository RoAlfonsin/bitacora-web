import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Email and password are required");
            return;
        }
        const url = process.env.BACKEND_URL + "/api/users/login";
        const body = { email, password };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    alert(data.errors);
                } else {
                    actions.setUser(data);
                    alert("User logged in");
                    navigate("/");
                }
            });
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <h1 className="text-center">Login</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => { submitHandler(e) }
                                }
                            >
                                Login
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <Link to="/register">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};