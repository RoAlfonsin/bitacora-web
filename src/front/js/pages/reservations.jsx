import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Reservations = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [type, setType] = useState("psychology");
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState(12);
    const [patientName, setPatientName] = useState("");
    const [packages, setPackages] = useState([]);
    const [packageToUse, setPackageToUse] = useState(null);
    const user = store.currentUser;

    async function submitHandler(e) {
        e.preventDefault();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let dateFormatted = new Date(date);
        let utcDate = dateFormatted.getTime() + dateFormatted.getTimezoneOffset() * 60000;
        dateFormatted = new Date(utcDate + 3600000 * 2);
        if (dateFormatted < today) {
            const modal = document.getElementById('pastDate');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            return;
        }
        let packageId = packageToUse
        if (type === "" || date === "" || timeSlot === "" || patientName === "") {
            const modal = document.getElementById('missingFields');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            return;
        }
        if (dateFormatted.getDay() === 0) {
            const modal = document.getElementById('sunday');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            return;
        }
        if (dateFormatted.getDay() === 6 && timeSlot > 13) {
            const modal = document.getElementById('saturday');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            return;
        }
        for (let element of packages) {
            let expirationDate = new Date(element.expirationDate);
            if (element.usedSessions < element.totalSessions && expirationDate > dateFormatted) {
                packageId = element.id;
                break;
            }
        }
        if (packageId === null) {
            packageId = -1;
        }
        const url = process.env.BACKEND_URL + "/api/new-reservation";
        const body = {
            userId: user.id,
            packageId: packageId,
            type: type,
            date: dateFormatted,
            timeSlot: timeSlot,
            patientName: patientName,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    alert("There is no available office for this date and time");
                } else {
                    const modal = document.getElementById('success');
                    const modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                }
            }
            );
    }


    useEffect(() => {
        actions.getUserPackages(user.id).then((data) => {
            setPackages(data);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <h1 className="text-center">Reservation</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
                                Type
                            </label>
                            <select
                                className="form-control"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="psychology">Psychology</option>
                                <option value="nutrition">Nutrition</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">
                                Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="timeSlot" className="form-label">
                                Time Slot
                            </label>
                            <select
                                className="form-control"
                                id="timeSlot"
                                value={timeSlot}
                                onChange={(e) => setTimeSlot(e.target.value)}
                            >
                                <option value="7">7:00</option>
                                <option value="8">8:00</option>
                                <option value="9">9:00</option>
                                <option value="10">10:00</option>
                                <option value="11">11:00</option>
                                <option value="12">12:00</option>
                                <option value="13">13:00</option>
                                <option value="14">14:00</option>
                                <option value="15">15:00</option>
                                <option value="16">16:00</option>
                                <option value="17">17:00</option>
                                <option value="18">18:00</option>
                                <option value="19">19:00</option>
                                <option value="20">20:00</option>
                                <option value="21">21:00</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="patientName" className="form-label">
                                Patient Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="patientName"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => { submitHandler(e) }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id="sunday">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Sundays are closed</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id="saturday">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Saturdays after 13:00 are closed</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id="missingFields">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>All fields are required</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id="pastDate">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>You can't make a reservation for a past date</p>
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
                            <p>Reservation created</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate("/")}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}