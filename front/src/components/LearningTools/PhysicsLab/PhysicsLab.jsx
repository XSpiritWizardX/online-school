import { useState, useEffect, useRef } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "./PhysicsLab.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PhysicsLab() {
  const defaultSettings = {
    mode: "projectile",
    gravity: 9.8,
    velocity: 20,
    angle: 45,
    pendulumLength: 150,
    springConstant: 1,
    mass: 1,
    initialDisplacement: 50,
  };

  const [mode, setMode] = useState(defaultSettings.mode);
  const [gravity, setGravity] = useState(defaultSettings.gravity);
  const [velocity, setVelocity] = useState(defaultSettings.velocity);
  const [angle, setAngle] = useState(defaultSettings.angle);
  const [pendulumLength, setPendulumLength] = useState(defaultSettings.pendulumLength);
  const [springConstant, setSpringConstant] = useState(defaultSettings.springConstant);
  const [mass, setMass] = useState(defaultSettings.mass);
  const [initialDisplacement, setInitialDisplacement] = useState(defaultSettings.initialDisplacement);

  const canvasRef = useRef(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const [positionData, setPositionData] = useState([]);
  const [velocityData, setVelocityData] = useState([]);
  const [accelerationData, setAccelerationData] = useState([]);
  const maxDataPoints = 100;

  // Reset Function
  const handleReset = () => {
    setMode(defaultSettings.mode);
    setGravity(defaultSettings.gravity);
    setVelocity(defaultSettings.velocity);
    setAngle(defaultSettings.angle);
    setPendulumLength(defaultSettings.pendulumLength);
    setSpringConstant(defaultSettings.springConstant);
    setMass(defaultSettings.mass);
    setInitialDisplacement(defaultSettings.initialDisplacement);
    setTime(0);
    setPositionData([]);
    setVelocityData([]);
    setAccelerationData([]);
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 100); // restart animation cleanly
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (mode === "projectile") drawProjectile(ctx);
    if (mode === "pendulum") drawPendulum(ctx);
    if (mode === "spring") drawSpringMass(ctx);
  }, [mode, gravity, velocity, angle, time, pendulumLength, springConstant, mass, initialDisplacement]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 0.016);
      }, 16);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const updateChartData = (position, velocity, acceleration) => {
    setPositionData(prev => [...prev, position].slice(-maxDataPoints));
    setVelocityData(prev => [...prev, velocity].slice(-maxDataPoints));
    setAccelerationData(prev => [...prev, acceleration].slice(-maxDataPoints));
  };

  const drawProjectile = (ctx) => {
    const rad = (angle * Math.PI) / 180;
    const vx = velocity * Math.cos(rad);
    const vy = velocity * Math.sin(rad);
    const x = vx * time * 50;
    const y = vy * time - 0.5 * gravity * time * time;

    ctx.fillStyle = "#2aaefa";
    ctx.beginPath();
    ctx.arc(50 + x, canvasRef.current.height - (y * 50 + 50), 10, 0, Math.PI * 2);
    ctx.fill();

    updateChartData(y, vy - gravity * time, -gravity);
  };

  const drawPendulum = (ctx) => {
    const angleRad = Math.sin(time * Math.sqrt(gravity / pendulumLength)) * 0.8;
    const originX = canvasRef.current.width / 2;
    const originY = 50;
    const bobX = originX + pendulumLength * Math.sin(angleRad);
    const bobY = originY + pendulumLength * Math.cos(angleRad);

    const angularVelocity = 0.8 * Math.sqrt(gravity / pendulumLength) * Math.cos(time * Math.sqrt(gravity / pendulumLength));
    const angularAcceleration = -0.8 * (gravity / pendulumLength) * Math.sin(time * Math.sqrt(gravity / pendulumLength));

    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    ctx.fillStyle = "#ff4d4d";
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
    ctx.fill();

    updateChartData(angleRad, angularVelocity, angularAcceleration);
  };

  const drawSpringMass = (ctx) => {
    const amplitude = initialDisplacement;
    const angularFrequency = Math.sqrt(springConstant / mass);
    const displacement = amplitude * Math.cos(angularFrequency * time);

    const originX = canvasRef.current.width / 2;
    const originY = canvasRef.current.height / 2;
    const massX = originX + displacement * 5;
    const massY = originY;

    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(massX, massY);
    ctx.stroke();

    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(massX, massY, 20, 0, Math.PI * 2);
    ctx.fill();

    const velocity = -amplitude * angularFrequency * Math.sin(angularFrequency * time);
    const acceleration = -amplitude * angularFrequency * angularFrequency * Math.cos(angularFrequency * time);

    updateChartData(displacement, velocity, acceleration);
  };

  const chartData = (data) => ({
    labels: Array.from({ length: data.length }, (_, i) => i),
    datasets: [
      { label: 'Value', data, borderColor: 'rgb(75, 192, 192)', tension: 0.1 }
    ],
  });

  const chartOptions = {
    scales: { x: { display: false }, y: { beginAtZero: true } },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="physics-lab">
      <div className="lab-controls">
        <h2>Physics Lab</h2>
        <label>
          Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="projectile">Projectile Motion</option>
            <option value="pendulum">Pendulum</option>
            <option value="spring">Spring-Mass System</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>

        {mode === "projectile" && (
          <>
            <label>
              Gravity: {gravity.toFixed(1)} m/s²
              <input type="range" min="1" max="20" step="0.1" value={gravity} onChange={(e) => setGravity(parseFloat(e.target.value))} />
            </label>
            <label>
              Velocity: {velocity.toFixed(1)} m/s
              <input type="range" min="1" max="100" step="0.1" value={velocity} onChange={(e) => setVelocity(parseFloat(e.target.value))} />
            </label>
            <label>
              Angle: {angle.toFixed(1)}°
              <input type="range" min="0" max="90" step="0.1" value={angle} onChange={(e) => setAngle(parseFloat(e.target.value))} />
            </label>
          </>
        )}

        {mode === "pendulum" && (
          <label>
            Length: {pendulumLength.toFixed(1)} px
            <input type="range" min="50" max="300" step="1" value={pendulumLength} onChange={(e) => setPendulumLength(parseFloat(e.target.value))} />
          </label>
        )}

        {mode === "spring" && (
          <>
            <label>
              Spring Constant (k): {springConstant.toFixed(1)} N/m
              <input type="range" min="0.1" max="5" step="0.1" value={springConstant} onChange={(e) => setSpringConstant(parseFloat(e.target.value))} />
            </label>
            <label>
              Mass: {mass.toFixed(1)} kg
              <input type="range" min="0.1" max="5" step="0.1" value={mass} onChange={(e) => setMass(parseFloat(e.target.value))} />
            </label>
            <label>
              Initial Displacement: {initialDisplacement.toFixed(1)} px
              <input type="range" min="-100" max="100" step="1" value={initialDisplacement} onChange={(e) => setInitialDisplacement(parseFloat(e.target.value))} />
            </label>
          </>
        )}
      </div>

      <div className="lab-canvas">
        <canvas ref={canvasRef} width={900} height={600}></canvas>
      </div>

      <div className="lab-charts">
        <h3>Position</h3>
        <Line data={chartData(positionData)} options={chartOptions} />
        <h3>Velocity</h3>
        <Line data={chartData(velocityData)} options={chartOptions} />
        <h3>Acceleration</h3>
        <Line data={chartData(accelerationData)} options={chartOptions} />
      </div>
    </div>
  );
}
