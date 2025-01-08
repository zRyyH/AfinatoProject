import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "../contexts/appContext";
import { AnimatePresence } from "framer-motion";

import LoginPage from '../pages/loginPage';
import CalendarPage from "../providers/calendarProvider";

const App = () => {
    const { isAuth } = useContext(AppContext);

    return (
        <AnimatePresence mode="wait">
            <Routes key={isAuth}>
                <Route
                    path="/"
                    element={
                        isAuth ? <Navigate to="/calendar" replace /> : <LoginPage />
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        isAuth ? <CalendarPage /> : <Navigate to="/" replace />
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default App;