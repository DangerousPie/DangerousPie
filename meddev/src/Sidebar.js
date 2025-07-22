import React, { useState } from "react";
import { Link } from "react-router-dom";
import { roles } from "./constants";

export default function Sidebar({ userRole, onLogin, onLogout }) {
  const [selectedRole, setSelectedRole] = useState(roles.PATIENT);

  const handleRoleChange = (e) => setSelectedRole(e.target.value);
  const handleLoginClick = () => onLogin(selectedRole);

  return (
    <nav className="sidebar-nav" style={{ padding: "1rem", background: "#111", color: "#eee", height: "100vh", width: "220px", boxShadow: "2px 0 8px rgba(0,0,0,0.8)" }}>
      <h2 style={{ color: "#00ff9f", marginBottom: "1rem" }}>Navigation</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li><Link to="/patient-records" style={{ color: "#eee", textDecoration: "none" }}>Patient Records</Link></li>
        <li><Link to="/sap-xml" style={{ color: "#eee", textDecoration: "none" }}>SAP & XML</Link></li>
        <li><Link to="/ci-cd" style={{ color: "#eee", textDecoration: "none" }}>CI/CD & Quality</Link></li>
        <li><Link to="/mentoring" style={{ color: "#eee", textDecoration: "none" }}>Mentoring</Link></li>
      </ul>

      <div style={{ marginTop: "2rem", borderTop: "1px solid #333", paddingTop: "1rem" }}>
        {userRole ? (
          <>
            <p style={{ marginBottom: "0.3rem" }}>
              Logged in as: <strong style={{ color: "#00ff9f" }}>{userRole.toUpperCase()}</strong>
            </p>
            <button
              onClick={onLogout}
              style={{
                backgroundColor: "#ff0055",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <label htmlFor="role-select" style={{ fontWeight: "600" }}>
              Select Role to Login:
            </label>
            <select
              id="role-select"
              value={selectedRole}
              onChange={handleRoleChange}
              style={{
                width: "100%",
                margin: "0.5rem 0 1rem",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #444",
                backgroundColor: "#222",
                color: "#eee",
              }}
            >
              <option value={roles.ADMIN}>Admin</option>
              <option value={roles.DOCTOR}>Doctor</option>
              <option value={roles.NURSE}>Nurse</option>
              <option value={roles.PATIENT}>Patient</option>
            </select>
            <button
              onClick={handleLoginClick}
              style={{
                backgroundColor: "#00ff9f",
                border: "none",
                color: "#111",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                fontWeight: "700",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
