import React, { Suspense, lazy } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Spinner from './components/Spinner';
import FadeInWrapper from './components/fadeInWrapper';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CRUDView = lazy(() => import('./pages/CRUDView'));

function App() {
  return (
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
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/crud"
                element={
                  <PrivateRoute>
                    <CRUDView />
                  </PrivateRoute>
                }
              />
            </Routes>
          </FadeInWrapper>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
