import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import PatientRecords from "./PatientRecords";
import SAPSection from "./SAPSection";
import CICDSection from "./CICDSection";
import MentoringSection from "./MentoringSection";

import { roles } from "./constants";
import "./App.css";

// Simulate async fetch
const fetchPatientRecords = () =>
  new Promise((res) =>
    setTimeout(
      () =>
        res([
          { id: 1, name: "John Doe", diagnosis: "Hypertension" },
          { id: 2, name: "Jane Smith", diagnosis: "Diabetes" },
        ]),
      1000
    )
  );

// Loading spinner for user feedback
const LoadingSpinner = () => (
  <div className="spinner" aria-label="Loading...">
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      stroke="#00ff9f"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <circle cx="25" cy="25" r="20" strokeOpacity="0.2" />
      <path d="M45 25a20 20 0 0 1-20 20" />
    </svg>
  </div>
);

// Simple message display for permissions or login state
const InfoMessage = ({ children }) => (
  <p style={{ color: "#ff5555", fontWeight: "600", marginTop: "1.5rem" }}>{children}</p>
);

/**
 * Custom Hook: Manages user authentication and patient records fetching
 */
function useAuth() {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPatientRecords = useCallback(async () => {
    if (userRole === roles.DOCTOR || userRole === roles.ADMIN) {
      setLoading(true);
      try {
        const data = await fetchPatientRecords();
        setPatientRecords(data);
      } catch (err) {
        console.error("Failed to fetch patient records", err);
        setPatientRecords([]);
      } finally {
        setLoading(false);
      }
    }
  }, [userRole]);

  useEffect(() => {
    if (isLoggedIn) {
      loadPatientRecords();
    } else {
      setPatientRecords([]);
    }
  }, [isLoggedIn, userRole, loadPatientRecords]);

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setPatientRecords([]);
  };

  return { userRole, isLoggedIn, patientRecords, loading, login, logout };
}

/**
 * ProtectedRoute: Renders children only if user meets the access criteria
 * Else, shows custom messages or redirects
 */
const ProtectedRoute = ({ isAllowed, fallback, children }) => {
  if (isAllowed === undefined) return null; // waiting for auth state?
  return isAllowed ? children : fallback;
};

export default function App() {
  const { userRole, isLoggedIn, patientRecords, loading, login, logout } = useAuth();

  // Route access config — scalable and declarative
  const routePermissions = {
    "/patient-records": (role) => role === roles.DOCTOR || role === roles.ADMIN,
    "/sap-xml": () => true,
    "/ci-cd": () => true,
    "/mentoring": () => true,
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar userRole={userRole} onLogin={login} onLogout={logout} />

        <main className="main-content">
          <header>
            <h1>Medical Informatics Portfolio</h1>
            <p>
              Experienced software developer specializing in medical informatics, full-stack web apps with React,
              REST APIs, OAuth2, SAP, XML, and secure RBAC systems for clinical environments.
            </p>
          </header>

          <Routes>
            <Route path="/" element={<Navigate to="/patient-records" replace />} />

            <Route
              path="/patient-records"
              element={
                <ProtectedRoute
                  isAllowed={routePermissions["/patient-records"](userRole)}
                  fallback={
                    isLoggedIn ? (
                      <InfoMessage>You do not have permission to view patient records.</InfoMessage>
                    ) : (
                      <InfoMessage>Please log in to see patient records.</InfoMessage>
                    )
                  }
                >
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <PatientRecords patientRecords={patientRecords} />
                  )}
                </ProtectedRoute>
              }
            />

            <Route
              path="/sap-xml"
              element={<SAPSection />}
            />
            <Route
              path="/ci-cd"
              element={<CICDSection />}
            />
            <Route
              path="/mentoring"
              element={<MentoringSection />}
            />
          </Routes>

          <footer style={{ marginTop: "3rem", textAlign: "center", color: "#555" }}>
            &copy; {new Date().getFullYear()} Your Name &ndash; Medical Informatics Software Developer
          </footer>
        </main>
      </div>
    </Router>
  );
}
