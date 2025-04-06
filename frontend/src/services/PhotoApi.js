// src/services/PhotoApi.js
import { API_URL, makeRequest } from "./apiUtils";

const PhotoApi = {
  getAll: async () => {
    try {
      const response = await makeRequest(`${API_URL}/photos`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/photos/${id}`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/photos/${id}`, {
        method: "DELETE"
      });
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  setAsMain: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/photos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ principale: true })
      });
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  uploadForAnimal: async (animalId, file, description = '', principale = false) => {
    try {
            
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('description', description || '');
      formData.append('principale', principale.toString());
      
      const response = await makeRequest(`${API_URL}/animals/${animalId}/photos`, {
        method: "POST",
        body: formData
      });
      
      return response;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  },
  
  getForAnimal: async (animalId) => {
    try {
      const response = await makeRequest(`${API_URL}/animals/${animalId}/photos`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};

export default PhotoApi;