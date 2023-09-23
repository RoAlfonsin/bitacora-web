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
        console.log("data", data);
        let elementToDelete = [];
        for (let i = 0; i < data.length; i++) {
            let reservationDay = data[i].reservationDay;
            reservationDay = new Date(reservationDay);
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            if (reservationDay > today) {
                elementToDelete.push(i);
            }
        }
        for (let i = elementToDelete.length - 1; i >= 0; i--) {
            data.splice(elementToDelete[i], 1);
        }
        setReservations(data);
    }

    useEffect(() => {
        getReservations();
    }, []);

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
                                <th scope="col">Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{reservation.date}</td>
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