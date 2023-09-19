import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Packages = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.currentUser);
    const navigate = useNavigate();

    const packages = {
        "Bronze": {
            "price": 708,
            "totalSessions": 5,
            "packageDuration": 30,
            "description": "Pay 5 sessions and get a 5% discount",
            "realPrice": "Less than $145 per session",
        },
        "Silver": {
            "price": 1341,
            "totalSessions": 10,
            "packageDuration": 30,
            "description": "Pay 9 sessions and get 1 free",
            "realPrice": "Less than $135 per session",
        },
        "Gold": {
            "price": 2533,
            "totalSessions": 20,
            "packageDuration": 60,
            "description": "Pay 17 sessions and get 2 free",
            "realPrice": "Less than $127 per session",
        },
        "Platinum": {
            "price": 4768,
            "totalSessions": 40,
            "packageDuration": 60,
            "description": "Pay 32 sessions and get 8 free",
            "realPrice": "Less than $120 per session",
        }
    };

    function buyPackage(e) {
        const packageName = e.target.id;
        console.log(packageName);
        console.log("event", e.target);
        const url = process.env.BACKEND_URL + "/api/packages/" + user.id;
        const body = {
            price: packages[packageName].price,
            totalSessions: packages[packageName].totalSessions,
            packageDuration: packages[packageName].packageDuration,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        fetch(url, options)
            .then((response) => {
                if (response.status === 200) {
                    alert("Package purchased successfully");
                    navigate("/calendar");
                } else {
                    alert("Error purchasing package");
                }
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className="container border">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Packages</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-around flex-row m-2">
                    <div className="card m-1" style={{width: "20rem"}}>
                        <div className="card-body bg-primary-subtle">
                            <h4 className="card-title">Bronze</h4>
                            <h5 className="card-subtitle mb-2 text-muted">${packages.Bronze.price}</h5>
                            <p className="card-text m-0">{packages.Bronze.totalSessions} Sessions</p>
                            <p className="card-text m-0">{packages.Bronze.packageDuration} days duration</p>
                            <p className="card-text m-0">{packages.Bronze.description}</p>
                            <p className="card-text m-0">{packages.Bronze.realPrice}</p>
                            <button className="btn btn-primary w-100 m-1" id="Bronze" onClick={(e) => buyPackage(e)}>Buy</button>
                        </div>
                    </div>
                    <div className="card m-1" style={{width: "20rem"}}>
                        <div className="card-body bg-primary-subtle">
                            <h4 className="card-title">Silver</h4>
                            <h5 className="card-subtitle mb-2 text-muted">${packages.Silver.price}</h5>
                            <p className="card-text m-0">{packages.Silver.totalSessions} Sessions</p>
                            <p className="card-text m-0">{packages.Silver.packageDuration} days duration</p>
                            <p className="card-text m-0">{packages.Silver.description}</p>
                            <p className="card-text m-0">{packages.Silver.realPrice}</p>
                            <button className="btn btn-primary w-100 m-1" id="Silver" onClick={(e) => buyPackage(e)}>Buy</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-around flex-row m-2">
                    <div className="card m-1" style={{width: "20rem"}}>
                        <div className="card-body bg-primary-subtle">
                            <h4 className="card-title">Gold</h4>
                            <h5 className="card-subtitle mb-2 text-muted">${packages.Gold.price}</h5>
                            <p className="card-text m-0">{packages.Gold.totalSessions} Sessions</p>
                            <p className="card-text m-0">{packages.Gold.packageDuration} days duration</p>
                            <p className="card-text m-0">{packages.Gold.description}</p>
                            <p className="card-text m-0">{packages.Gold.realPrice}</p>
                            <button className="btn btn-primary w-100 m-1" id="Gold" onClick={(e) => buyPackage(e)}>Buy</button>
                        </div>
                    </div>
                    <div className="card m-1" style={{width: "20rem"}}>
                        <div className="card-body bg-primary-subtle">
                            <h4 className="card-title">Platinum</h4>
                            <h5 className="card-subtitle mb-2 text-muted">${packages.Platinum.price}</h5>
                            <p className="card-text m-0">{packages.Platinum.totalSessions} Sessions</p>
                            <p className="card-text m-0">{packages.Platinum.packageDuration} days duration</p>
                            <p className="card-text m-0">{packages.Platinum.description}</p>
                            <p className="card-text m-0">{packages.Platinum.realPrice}</p>
                            <button className="btn btn-primary w-100 m-1" id="Platinum" onClick={(e) => buyPackage(e)}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};