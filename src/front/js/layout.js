import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Register } from "./pages/register.jsx";
import { Login } from "./pages/login.jsx";
import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <>
      <BrowserRouter basename={basename}>
        {/*Navbar*/}
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<h1>This is calendar</h1>} path="/calendar" />
          <Route element={<h1>This is reservations</h1>} path="/reservations" />
          <Route element={<h1>This is packages</h1>} path="/packages" />
          <Route element={<h1>This is profile</h1>} path="/profile/:id" />
          <Route element={ <Login/> } path="/login" />
          <Route element={ <Register/> } path="/register" />
          <Route element={<h1>This is history</h1>} path="/history" />
          <Route element={<h1>This is payments</h1>} path="/payments" />
          <Route element={<h1>This is documents</h1>} path="/documents" />
        </Routes>
        {/*Footer*/}
      </BrowserRouter>
    </>
  );
};

export default injectContext(Layout);
