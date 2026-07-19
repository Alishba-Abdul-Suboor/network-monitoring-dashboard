const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const networkRoutes = require("./routes/networkRoutes");
const startLogging = require("./utils/logScheduler");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/network", networkRoutes);

startLogging(); // begin saving one snapshot per server every minute

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Network monitoring backend running on port ${PORT}`),
);
