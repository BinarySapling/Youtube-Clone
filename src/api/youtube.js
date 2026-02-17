import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchTrendingVideos = async () => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,statistics",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 12,
      key: API_KEY,
    },
  });
  return response.data.items;
};

export const fetchVideoDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,statistics",
      id: id,
      key: API_KEY,
    },
  });
  return response.data.items[0];
};
