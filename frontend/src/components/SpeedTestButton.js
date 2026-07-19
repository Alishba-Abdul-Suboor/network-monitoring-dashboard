import React, { useState } from "react";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { runSpeedTest } from "../services/networkService";

function SpeedTestButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    const response = await runSpeedTest();
    setResult(response.data);
    setLoading(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Speed Test</Card.Title>
        <Button onClick={handleTest} disabled={loading} variant="primary">
          {loading ? (
            <>
              <Spinner size="sm" animation="border" /> Testing...
            </>
          ) : (
            "Run Speed Test"
          )}
        </Button>

        {result && (
          <Row className="mt-3">
            <Col>
              <strong>Download:</strong> {result.download} Mbps
            </Col>
            <Col>
              <strong>Upload:</strong> {result.upload} Mbps
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default SpeedTestButton;
