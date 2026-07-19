# Network Monitoring Dashboard

A real-time network monitoring dashboard built with React, Node.js, Express, and MongoDB. Simulates live bandwidth, latency, and packet loss data across multiple servers, with historical logging, alerts, and a dark mode toggle.

## Features

- **Real-time monitoring** — bandwidth, latency, and packet loss update every second via live polling
- **Multi-server support** — switch between multiple simulated servers/connections from a dropdown
- **Live charts & gauges** — bandwidth history graph (Recharts) plus color-coded latency and packet loss gauges
- **Smart alerts** — an automatic warning banner appears when packet loss crosses a set threshold
- **Historical logging** — a background scheduler saves one snapshot per server every minute to MongoDB, so data persists beyond the live view
- **Speed test simulation** — a button that mimics a real download/upload speed test
- **Dark mode** — theme-aware toggle with smooth transitions across the whole dashboard

## Tech Stack

**Frontend:** React, React-Bootstrap, Recharts, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose ODM) — used for historical logging
**Data:** Simulated in real time (no external network APIs required)

## Project Structure

```
network-monitoring-dashboard/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── models/           # NetworkLog schema for historical data
│   ├── routes/           # API routes (current data, history, servers, logs, speed test)
│   ├── utils/            # Data generator, server list, and the logging scheduler
│   └── server.js         # App entry point
└── frontend/
    └── src/
        ├── components/    # BandwidthChart, LatencyGauge, PacketLossGauge, ConnectionStatus, SpeedTestButton
        ├── services/      # Axios API calls
        └── App.js         # Root component — polling logic, alerts, dark mode
```

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB connection (local install or MongoDB Atlas)

### Setup

1. Clone the repository
```bash
git clone https://github.com/Alishba-Abdul-Suboor/network-monitoring-dashboard.git
cd network-monitoring-dashboard
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file inside `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

4. Start the backend
```bash
npm run dev
```

5. In a new terminal, install and start the frontend
```bash
cd frontend
npm install
npm start
```

6. Open `http://localhost:3000` in your browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/network/servers` | Get the list of available servers |
| GET | `/api/network/current/:serverId` | Get the latest live reading for a server |
| GET | `/api/network/history/:serverId` | Get the last 60 live readings for a server |
| GET | `/api/network/logs/:serverId` | Get saved historical logs for a server (from MongoDB) |
| POST | `/api/network/speedtest` | Simulate a download/upload speed test |

## How the Data Works

Since real network APIs generally require special hardware access, permissions, or paid credentials, this project generates realistic simulated data — bandwidth, latency, and packet loss values that mimic real-world fluctuations, including occasional spikes and dips. This keeps the focus on the harder, more valuable skills: real-time data handling, live visualization, and historical data storage. The data generator can be swapped out for a real monitoring API later without changing the rest of the app.

## Author

Alishba Abdul Suboor
