import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

function BandwidthChart({ history }) {
  // We reformat the data slightly so the chart can read it
  const chartData = history.map((entry, index) => ({
    time: index,
    bandwidth: entry.bandwidth,
  }));

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Bandwidth (Mbps)</Card.Title>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Seconds ago",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Mbps", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bandwidth"
              stroke="#0d6efd"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default BandwidthChart;
