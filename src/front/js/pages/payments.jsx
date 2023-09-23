//Check packages and show if there are paid packages
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Payments = () => {
    const { store, actions } = useContext(Context);
    const user = store.currentUser;
    const [packages, setPackages] = useState([]);

    async function getPackages() {
        const url = process.env.BACKEND_URL + "/api/packages/" + user.id;
        const response = await fetch(url);
        const data = await response.json();
        setPackages(data);
    }

    useEffect(() => {
        getPackages();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>My payments</h1>
                    <table className="table table-striped table-sm table-responsive fixed-table-body">
                        <thead className="fs-6">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Price</th>
                                <th scope="col">Hours Left</th>
                                <th scope="col">Acquired</th>
                                <th scope="col">Expires</th>
                                <th scope="col">Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={"/details/:" + element.id}>{element.id}</Link></td>
                                        <td>${element.price}</td>
                                        <td className="text-center">{element.totalSessions - element.usedSessions}</td>
                                        <td>{element.purchaseDayReadable}</td>
                                        <td>{element.expirationDayReadable}</td>
                                        <td>{String(element.isPaid)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};