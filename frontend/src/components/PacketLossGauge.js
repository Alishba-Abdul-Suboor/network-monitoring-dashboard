import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

function PacketLossGauge({ packetLoss }) {
  let variant = "success";
  if (packetLoss > 3) variant = "danger";
  else if (packetLoss > 1) variant = "warning";

  const percentage = Math.min(packetLoss * 10, 100); // scale up so small % is visible on the bar

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Packet Loss</Card.Title>
        <h2>{packetLoss}%</h2>
        <ProgressBar now={percentage} variant={variant} />
        <small className="text-muted">
          {variant === "success" && "No noticeable loss"}
          {variant === "warning" && "Minor loss detected"}
          {variant === "danger" && "Significant packet loss"}
        </small>
      </Card.Body>
    </Card>
  );
}

export default PacketLossGauge;
