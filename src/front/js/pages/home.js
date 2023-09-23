//Creating buttons to navigate from home
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	return (
		<div className="container border">
			<div className="row m-2">
				<div className="col-12">
					<h1 className="text-center">Welcome to the Bitacora!</h1>
				</div>
			</div>
			<div className="row m-2">
				<div className="col-6 d-grid gap-5">
					<Link to={"/calendar"}>
						<button className="btn btn-info w-100 bg-info-subtle">Calendar</button>
					</Link>
				</div>
				<div className="col-6 d-grid gap-5">
					<Link to={"/reservations"}>
						<button className="btn btn-info w-100 bg-info-subtle">Reservations</button>
					</Link>
				</div>
			</div>
			<div className="row m-2">
				<div className="col-6 d-grid gap-5">
					<Link to={"/packages"}>
						<button className="btn btn-info w-100 bg-info-subtle">Packages</button>
					</Link>
				</div>
				<div className="col-6 d-grid gap-5">
					<Link to={"/history"}>
						<button className="btn btn-info w-100 bg-info-subtle">History</button>
					</Link>
				</div>
			</div>
			<div className="row m-2">
				<div className="col-6 d-grid gap-5">
					<Link to={"/payments"}>
						<button className="btn btn-info w-100 bg-info-subtle">Payments</button>
					</Link>
				</div>
				<div className="col-6 d-grid gap-5">

				</div>
			</div>
		</div>
	);
};
