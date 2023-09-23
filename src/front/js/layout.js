import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Navbar } from "./component/navbar.jsx";
import { AuthProvider } from "./component/authProvider.jsx";
import { Home } from "./pages/home";
import { Calendar } from "./pages/calendar.jsx";
import { History } from "./pages/history.jsx";
import { Payments } from "./pages/payments.jsx";
import { DetailPackage } from "./pages/detailPackage.jsx";
import { Packages } from "./pages/packages.jsx";
import { Reservations } from "./pages/reservations.jsx";
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
        <Navbar />
        <Routes>
          <Route element={<AuthProvider> <Home /> </AuthProvider>} path="/" />
          <Route element={<AuthProvider> <Calendar /> </AuthProvider>} path="/calendar" />
          <Route element={<AuthProvider> <Reservations /> </AuthProvider>} path="/reservations" />
          <Route element={<AuthProvider> <Packages /> </AuthProvider>} path="/packages" />
          <Route element={<AuthProvider> <h1>This is profile</h1> </AuthProvider>} path="/profile/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<AuthProvider> <History /> </AuthProvider>} path="/history" />
          <Route element={<AuthProvider> <Payments /> </AuthProvider>} path="/payments" />
          <Route element={<AuthProvider> <DetailPackage /> </AuthProvider>} path="/details/:packId" />

        </Routes>
        {/*Footer*/}
      </BrowserRouter>
    </>
  );
};

export default injectContext(Layout);
