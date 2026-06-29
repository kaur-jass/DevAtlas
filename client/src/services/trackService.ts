import axios from "axios";

const API_URL = "http://localhost:5000/api/tracks";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getTracks = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data.tracks;
};

export const createTrack = async (trackData: any) => {
  const response = await axios.post(API_URL, trackData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data.track;
};

export const deleteTrack = async (trackId: string) => {
  await axios.delete(`${API_URL}/${trackId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};