import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;


export const fetchTrendingVideos = async () => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,statistics",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 10,
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

export const searchVideos = async (query) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      q: query,
      maxResults: 12,
      type: "video",
      key: API_KEY,
    },
  });

  return response.data.items;
};

export const fetchChannelDetails = async (channelId) => {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: {
      part: "snippet",
      id: channelId,
      key: API_KEY,
    },
  });

  return response.data.items[0];
};
