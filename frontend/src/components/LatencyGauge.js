import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

function LatencyGauge({ latency }) {
  // Decide color based on how good/bad the latency is
  let variant = "success"; // green = good
  if (latency > 60)
    variant = "danger"; // red = bad
  else if (latency > 30) variant = "warning"; // yellow = medium

  // Convert latency (0-150ms range) into a percentage for the bar
  const percentage = Math.min((latency / 150) * 100, 100);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Latency</Card.Title>
        <h2>{latency} ms</h2>
        <ProgressBar now={percentage} variant={variant} />
        <small className="text-muted">
          {variant === "success" && "Excellent connection"}
          {variant === "warning" && "Moderate delay"}
          {variant === "danger" && "High delay — may cause lag"}
        </small>
      </Card.Body>
    </Card>
  );
}

export default LatencyGauge;
