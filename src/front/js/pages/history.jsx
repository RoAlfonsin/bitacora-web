//Create a list of past reservations
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const History = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.currentUser);
    const [reservations, setReservations] = useState([]);

    async function getReservations() {
        const url = process.env.BACKEND_URL + "/api/reservations/" + user.id;
        const response = await fetch(url);
        const data = await response.json();
        setReservations(data);
    }

    useEffect(() => {
        getReservations();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>History</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{reservation.reservationDay}</td>
                                        <td>{reservation.timeSlot}:00</td>
                                        <td>{reservation.patientName}</td>
                                        <td>{reservation.packageId}</td>
                                    </tr>
                                );
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};