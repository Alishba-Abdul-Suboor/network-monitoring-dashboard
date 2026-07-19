const express = require("express");
const router = express.Router();
const generateNetworkData = require("../utils/dataGenerator");
const servers = require("../utils/servers");
const NetworkLog = require("../models/NetworkLog");

// Instead of one history array, we keep one PER server, using an object as a lookup table.
// Example: { server1: [...], server2: [...], server3: [...] }
let historyByServer = {};
servers.forEach((server) => {
  historyByServer[server.id] = [];
});

// GET /api/network/logs/:serverId — gives saved historical logs for one server
router.get("/logs/:serverId", async (req, res) => {
  const { serverId } = req.params;
  try {
    const logs = await NetworkLog.find({ serverId }).sort({ timestamp: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
});

// GET /api/network/servers — gives the list of available servers (for the dropdown)
router.get("/servers", (req, res) => {
  res.json(servers);
});

// GET /api/network/current/:serverId — gives the latest reading for ONE specific server
router.get("/current/:serverId", (req, res) => {
  const { serverId } = req.params;
  const data = generateNetworkData();

  if (!historyByServer[serverId]) {
    return res.status(404).json({ message: "Server not found" });
  }

  historyByServer[serverId].push(data);
  if (historyByServer[serverId].length > 60) {
    historyByServer[serverId].shift();
  }

  res.json(data);
});

// GET /api/network/history/:serverId — gives recent readings for ONE specific server
router.get("/history/:serverId", (req, res) => {
  const { serverId } = req.params;

  if (!historyByServer[serverId]) {
    return res.status(404).json({ message: "Server not found" });
  }

  res.json(historyByServer[serverId]);
});

// POST /api/network/speedtest — unchanged, doesn't need to know which server
router.post("/speedtest", (req, res) => {
  setTimeout(() => {
    const download = (Math.random() * 80 + 20).toFixed(1);
    const upload = (Math.random() * 30 + 5).toFixed(1);
    res.json({ download, upload });
  }, 1500);
});

module.exports = router;
