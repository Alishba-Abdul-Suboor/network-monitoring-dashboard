const mongoose = require("mongoose");

const NetworkLogSchema = new mongoose.Schema({
  serverId: { type: String, required: true },
  bandwidth: { type: Number, required: true },
  latency: { type: Number, required: true },
  packetLoss: { type: Number, required: true },
  isConnected: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NetworkLog", NetworkLogSchema);
