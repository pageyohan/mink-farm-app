// src/services/RaceApi.js
import { API_URL, makeRequest } from "./apiUtils";

const RaceApi = {
  getAll: async () => {
    try {
      const response = await makeRequest(`${API_URL}/races`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/races/${id}`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};

export default RaceApi;