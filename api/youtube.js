import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.VITE_YOUTUBE_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { endpoint, ...params } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("YouTube API Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: "Internal server error" },
    });
  }
}
