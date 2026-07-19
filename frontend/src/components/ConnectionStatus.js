import React from "react";
import { Badge } from "react-bootstrap";

function ConnectionStatus({ isConnected }) {
  return (
    <Badge
      bg={isConnected ? "success" : "danger"}
      style={{ fontSize: "1rem", padding: "10px 15px" }}
    >
      {isConnected ? "Connected" : "Disconnected"}
    </Badge>
  );
}

export default ConnectionStatus;
