import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            //display modal
            const modal = document.getElementById('invalid');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
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
                if (data.msg == 'Invalid email or password') {
                    //display modal
                    const modal = document.getElementById('invalid');
                    const modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                } else {
                    actions.setUser(data);
                    const modal = document.getElementById('success');
                    const modalOptions = {
                        keyboard: false,
                        backdrop: 'static'
                    };
                    const modalInstance = new bootstrap.Modal(modal, modalOptions);
                    modalInstance.show();
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
            <div className="modal" tabIndex="-1" id="invalid">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Invalid email or password</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id="success">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Success</h5>
                        </div>
                        <div className="modal-body">
                            <p>User logged in</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate("/")}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};