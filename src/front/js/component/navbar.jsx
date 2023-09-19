import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	console.log("store.currentUser",store.currentUser);
	let user = store.currentUser;
	console.log("user",user);
	const navigate = useNavigate();

	function handleLogout() {
		actions.setUser(null);
		user = null;
		navigate("/");
	}

	function renderLogin() {
		if (user == null) {
			return (
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</li>
			);
		} else {
			return (
				<li className="nav-item">
					<button className="btn btn-danger" onClick={handleLogout}>
						Logout
					</button>
				</li>
			);
		}
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Bitacora
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/calendar">
								Calendar
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/reservations">
								Reservations
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/packages">
								Packages
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/profile">
								Profile
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/history">
								History
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/payments">
								Payments
							</Link>
						</li>
						{renderLogin()}
					</ul>
				</div>
			</div>
		</nav>
	);
};
