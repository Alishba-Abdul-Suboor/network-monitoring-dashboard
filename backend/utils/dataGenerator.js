function generateNetworkData() {
  // Bandwidth: usually between 20-100 Mbps, with occasional dips
  const bandwidth = Math.floor(Math.random() * 80) + 20;

  // Latency: usually between 10-80ms, occasionally spikes higher
  const latency = Math.floor(Math.random() * 70) + 10;

  // Packet loss: usually very low (0-2%), rarely spikes to show a "problem" happening
  const packetLoss =
    Math.random() < 0.1
      ? (Math.random() * 8).toFixed(1) // 10% chance of a "bad" spike
      : (Math.random() * 2).toFixed(1); // normally very low

  // Connection status: almost always connected, rarely disconnects (simulates real-world reliability)
  const isConnected = Math.random() > 0.02; // 98% of the time it's connected

  return {
    timestamp: new Date().toISOString(),
    bandwidth, // in Mbps
    latency, // in milliseconds
    packetLoss: parseFloat(packetLoss), // in percentage
    isConnected,
  };
}

module.exports = generateNetworkData;
