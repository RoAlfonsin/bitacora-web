//Create a table with a list of reservations for specific Package
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetailPackage = () => {
    const [reservations, setReservations] = useState([]);
    let { packId } = useParams();
    packId = packId.slice(1);

    async function getReservationsPackages() {
        const url = process.env.BACKEND_URL + "/api/reservations-package/" + packId;
        console.log("url", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        setReservations(data);
    }

    useEffect(() => {
        getReservationsPackages();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Package {packId} Details</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Patient Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{element.id}</td>
                                        <td>{element.reservationDay}</td>
                                        <td>{element.timeSlot}:00</td>
                                        <td>{element.patientName}</td>
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
