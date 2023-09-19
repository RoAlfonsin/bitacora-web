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
    const [packages, setPackages] = useState([]);
    const [packageToUse, setPackageToUse] = useState(null);
    const user = store.currentUser;
    console.log("packages", packages);

    async function submitHandler(e) {
        e.preventDefault();
        let dateFormatted = new Date(date);
        let utcDate = dateFormatted.getTime() + dateFormatted.getTimezoneOffset() * 60000;
        dateFormatted = new Date(utcDate + 3600000 * 2);
        console.log("dateFormatted", dateFormatted);
        if (type === "" || date === "" || timeSlot === "") {
            alert("All fields are required");
            return;
        }
        if (dateFormatted.getDay() === 0) {
            alert("Sundays are closed");
            return;
        }
        if (dateFormatted.getDay() === 6 && timeSlot > 13) {
            alert("Saturdays after 13:00 are closed");
            return;
        }
        for (let element of packages) {
            if (element.type === type && element.usedSessions < element.totalSessions && element.expirationDate > dateFormatted) {
                setPackageToUse(element.id);
                break;
            }
        }
        if (packageToUse === null) {
            setPackageToUse(-1);
        }
        const url = process.env.BACKEND_URL + "/api/new-reservation";
        const body = {
            userId: user.id,
            packageId: packageToUse,
            type: type,
            date: dateFormatted,
            timeSlot: timeSlot,
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
                    alert("Reservation created");
                    navigate("/");
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
        </div>
    );
}