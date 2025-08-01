import React, { Suspense, lazy } from 'react';
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Spinner from './components/Spinner';
import FadeInWrapper from './components/fadeInWrapper';
import PrivateRoute from './components/PrivateRoute';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Emplooyes = lazy(() => import('./pages/emplooyes/Emplooyes'));

function App() {
  return (
    <>
      <ToastContainer
        className="toast-container"
        position="top-right"
        autoClose={3000}
      />
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <FadeInWrapper>
              <Routes>
                {/* Redirige / a /login */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Rutas privadas */}
                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                >
                  <Route index element={<Navigate to="emplooyes" />} />
                  <Route path="emplooyes" element={<Emplooyes />} />
                </Route>
              </Routes>
            </FadeInWrapper>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
