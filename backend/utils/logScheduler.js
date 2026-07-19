const generateNetworkData = require("./dataGenerator");
const NetworkLog = require("../models/NetworkLog");
const servers = require("./servers");

function startLogging() {
  // Runs immediately once, then every 60,000ms (1 minute) after that
  setInterval(async () => {
    for (const server of servers) {
      const data = generateNetworkData();
      try {
        await NetworkLog.create({
          serverId: server.id,
          bandwidth: data.bandwidth,
          latency: data.latency,
          packetLoss: data.packetLoss,
          isConnected: data.isConnected,
        });
      } catch (err) {
        console.error("Failed to log data for", server.id, err.message);
      }
    }
    console.log("Logged network snapshot for all servers");
  }, 60000); // 60000ms = 1 minute
}

module.exports = startLogging;
