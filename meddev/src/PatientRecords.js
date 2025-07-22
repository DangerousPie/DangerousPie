import React, { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Generate last N days ISO dates, descending order (oldest first)
const generateLastNDates = (n) => {
  const dates = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
};

// Generate vitals with smooth sine + noise variation for realism
const generateVitals = (baseHR, baseSys, baseDia, days) => {
  const dates = generateLastNDates(days);
  return dates.map((date, i) => ({
    time: date,
    heartRate: Math.round(baseHR + Math.sin(i / 3) * 5 + Math.random() * 3),
    systolic: Math.round(baseSys + Math.cos(i / 4) * 6 + Math.random() * 4),
    diastolic: Math.round(baseDia + Math.sin(i / 5) * 4 + Math.random() * 3),
  }));
};

// Simulated async fetch function with minimal delay
const fetchPatientVitals = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "John Doe", vitals: generateVitals(72, 120, 80, 30) },
        { id: 2, name: "Jane Smith", vitals: generateVitals(85, 130, 85, 30) },
      ]);
    }, 100);
  });

// Neon color palette
const colors = {
  heartRate: "#6f42c1", // vibrant purple
  systolic: "#20c997", // bright teal
  diastolic: "#fd7e14", // warm orange
};

// Custom Tooltip with fade & shadow effect
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        backgroundColor: "rgba(20,20,20,0.95)",
        padding: "12px 16px",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(100,100,255,0.5)",
        color: "#fff",
        fontWeight: "600",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minWidth: 170,
        transition: "all 0.3s ease",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        <strong>{new Date(label).toLocaleDateString()}</strong>
      </div>
      {payload.map(({ name, value, color }) => (
        <div key={name} style={{ color, fontSize: 13, marginBottom: 4 }}>
          {name === "heartRate"
            ? `💓 Heart Rate: ${value} bpm`
            : name === "systolic"
            ? `⬆️ Systolic: ${value} mmHg`
            : `⬇️ Diastolic: ${value} mmHg`}
        </div>
      ))}
    </div>
  );
};

export default function PatientRecords() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPatientVitals()
      .then(setPatients)
      .finally(() => setLoading(false));
  }, []);

  // Memoize patients so chart won't re-render unnecessarily
  const memoizedPatients = useMemo(() => patients, [patients]);

  if (loading)
    return (
      <p
        style={{
          color: "#aaa",
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center",
          marginTop: 60,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Loading patient vitals data...
      </p>
    );

  return (
    <div
      style={{
        padding: "0 2rem 3rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {memoizedPatients.map(({ id, name, vitals }) => (
        <section
          key={id}
          style={{
            marginBottom: 48,
            backgroundColor: "#1b1b2f",
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 0 15px rgba(111, 66, 193, 0.5)",
            color: "#eee",
          }}
        >
          <h3
            style={{
              marginBottom: 16,
              fontWeight: "700",
              fontSize: 24,
              letterSpacing: "0.04em",
              color: colors.heartRate,
              textShadow: "0 0 10px #6f42c1",
              userSelect: "none",
            }}
          >
            {name}'s Vitals Over Last 30 Days
          </h3>

          <ResponsiveContainer width="100%" height={360}>
            <LineChart
              data={vitals}
              margin={{ top: 20, right: 50, left: 20, bottom: 60 }}
            >
              <defs>
                <linearGradient
                  id={`gradientHeartRate-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={colors.heartRate} stopOpacity={0.7} />
                  <stop offset="95%" stopColor={colors.heartRate} stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id={`gradientSystolic-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={colors.systolic} stopOpacity={0.7} />
                  <stop offset="95%" stopColor={colors.systolic} stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id={`gradientDiastolic-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={colors.diastolic} stopOpacity={0.7} />
                  <stop offset="95%" stopColor={colors.diastolic} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#2e2e4d"
                strokeDasharray="5 5"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                angle={-45}
                textAnchor="end"
                interval={4}
                height={60}
                tick={{ fill: "#bbb", fontWeight: "600", fontSize: 13 }}
                tickLine={false}
                axisLine={{ stroke: "#444" }}
              />
              <YAxis
                yAxisId="left"
                domain={[50, 100]}
                tick={{ fill: colors.heartRate, fontWeight: "600" }}
                tickLine={false}
                axisLine={{ stroke: colors.heartRate }}
                label={{
                  value: "HR (bpm)",
                  angle: -90,
                  position: "insideLeft",
                  fill: colors.heartRate,
                  fontWeight: "700",
                  fontSize: 14,
                  offset: 8,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[60, 160]}
                tick={{ fill: colors.systolic, fontWeight: "600" }}
                tickLine={false}
                axisLine={{ stroke: colors.systolic }}
                label={{
                  value: "BP (mmHg)",
                  angle: 90,
                  position: "insideRight",
                  fill: colors.systolic,
                  fontWeight: "700",
                  fontSize: 14,
                  offset: 8,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#444", strokeWidth: 2 }}
              />

              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#ccc", fontWeight: "600" }}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="heartRate"
                stroke={colors.heartRate}
                strokeWidth={3}
                dot={{ r: 3, fill: colors.heartRate, stroke: "#333", strokeWidth: 1 }}
                activeDot={{ r: 7, fill: colors.heartRate, stroke: "#fff", strokeWidth: 2 }}
                fillOpacity={0.8}
                fill={`url(#gradientHeartRate-${id})`}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="systolic"
                stroke={colors.systolic}
                strokeWidth={3}
                dot={false}
                fill={`url(#gradientSystolic-${id})`}
                isAnimationActive={true}
                animationDuration={1300}
                animationEasing="ease-out"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="diastolic"
                stroke={colors.diastolic}
                strokeWidth={3}
                dot={false}
                fill={`url(#gradientDiastolic-${id})`}
                isAnimationActive={true}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      ))}
    </div>
  );
}
