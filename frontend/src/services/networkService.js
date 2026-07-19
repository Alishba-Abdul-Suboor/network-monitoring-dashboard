import axios from "axios";

const API_URL = "http://localhost:5001/api/network";

export const getServers = () => axios.get(`${API_URL}/servers`);
export const getCurrentData = (serverId) =>
  axios.get(`${API_URL}/current/${serverId}`);
export const getHistory = (serverId) =>
  axios.get(`${API_URL}/history/${serverId}`);
export const runSpeedTest = () => axios.post(`${API_URL}/speedtest`);
