//Create a list of reservations for the current user, with button to delete them
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Calendar = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.currentUser);
    const [reservations, setReservations] = useState([]);

    async function getReservations() {
        const url = process.env.BACKEND_URL + "/api/reservations/" + user.id;
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        setReservations(data);
    }

    useEffect(() => {
        getReservations();
    } , []);

    async function deleteReservation(reservation_id) {
        const url = process.env.BACKEND_URL + "/api/reservations/" + reservation_id;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("data", data);
        getReservations();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>My reservations</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{reservation.date}</td>
                                        <td>{reservation.timeSlot}:00</td>
                                        <td>{reservation.patientName}</td>
                                        <td><button className="btn btn-danger btn-sm" onClick={() => deleteReservation(reservation.id)}>Delete</button></td>
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