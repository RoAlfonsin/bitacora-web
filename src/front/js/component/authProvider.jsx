import React, {useContext} from "react";
import {Context} from "../store/appContext";
import { Navigate } from "react-router-dom";

export const AuthProvider = ({children}) => {
    const {store, actions} = useContext(Context);
    const user = store.currentUser;
    if (user == null) {
        return <Navigate to="/login" />;
    }
    return children;
};