// src/services/TypeAnimalApi.js
import { API_URL, makeRequest } from "./apiUtils";

const TypeAnimalApi = {
  getAll: async () => {
    try {
      const response = await makeRequest(`${API_URL}/type_animals`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/type_animals/${id}`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};

export default TypeAnimalApi;