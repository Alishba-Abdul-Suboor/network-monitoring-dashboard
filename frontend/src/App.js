import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Form, Button } from "react-bootstrap";
import BandwidthChart from "./components/BandwidthChart";
import LatencyGauge from "./components/LatencyGauge";
import PacketLossGauge from "./components/PacketLossGauge";
import ConnectionStatus from "./components/ConnectionStatus";
import SpeedTestButton from "./components/SpeedTestButton";
import {
  getCurrentData,
  getHistory,
  getServers,
} from "./services/networkService";

const PACKET_LOSS_THRESHOLD = 3;

function App() {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [current, setCurrent] = useState({
    bandwidth: 0,
    latency: 0,
    packetLoss: 0,
    isConnected: true,
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getServers().then((res) => {
      setServers(res.data);
      setSelectedServer(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedServer) return;

    getHistory(selectedServer).then((res) => setHistory(res.data));

    const interval = setInterval(() => {
      getCurrentData(selectedServer).then((res) => {
        setCurrent(res.data);
        setHistory((prevHistory) => {
          const updated = [...prevHistory, res.data];
          return updated.slice(-60);
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedServer]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container className="py-4" data-bs-theme={darkMode ? "dark" : "light"}>
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className={darkMode ? "text-light" : "text-dark"}>
              Network Monitoring Dashboard
            </h1>
          </Col>
          <Col xs="auto" className="d-flex align-items-center gap-3">
            <ConnectionStatus isConnected={current.isConnected} />
            <Button
              variant={darkMode ? "outline-light" : "outline-dark"}
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Select
              value={selectedServer || ""}
              onChange={(e) => setSelectedServer(e.target.value)}
            >
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {current.packetLoss > PACKET_LOSS_THRESHOLD && (
          <Alert variant="danger">
            ⚠️ High packet loss detected: {current.packetLoss}% — your
            connection may be unstable.
          </Alert>
        )}

        <Row>
          <Col md={8}>
            <BandwidthChart history={history} />
          </Col>
          <Col md={4}>
            <LatencyGauge latency={current.latency} />
            <PacketLossGauge packetLoss={current.packetLoss} />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <SpeedTestButton />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
