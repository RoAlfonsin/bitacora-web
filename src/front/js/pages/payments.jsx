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
        console.log("data", data);
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
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Package</th>
                                <th scope="col">Price</th>
                                <th scope="col">Used Sessions</th>
                                <th scope="col">Total Sessions</th>
                                <th scope="col">Purchase Date</th>
                                <th scope="col">Expiration Date</th>
                                <th scope="col">Paid</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((element, index) => {
                                const purchaseDateRemoveIndex = element.purchaseDate.indexOf(":");
                                const expirationDateRemoveIndex = element.expirationDate.indexOf(":");
                                const purchaseDate = element.purchaseDate.slice(0, purchaseDateRemoveIndex - 2);
                                const expirationDate = element.expirationDate.slice(0, expirationDateRemoveIndex - 2);
                                return (
                                    <tr key={index}>
                                        <td>{element.id}</td>
                                        <td>$ {element.price}</td>
                                        <td>{element.usedSessions}</td>
                                        <td>{element.totalSessions}</td>
                                        <td>{purchaseDate}</td>
                                        <td>{expirationDate}</td>
                                        <td>{String(element.isPaid)}</td>
                                        <td><Link to={"/details/:" + element.id}>Details</Link></td>
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