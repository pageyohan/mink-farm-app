// src/services/AnimalApi.js
import { API_URL, makeRequest } from "./apiUtils";

const AnimalApi = {
  getAll: async (filters = {}) => {
    try {
      // Construire les paramètres de requête
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      
      const url = `${API_URL}/animals${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await makeRequest(url);
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/animals/${id}`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  create: async (data) => {
    const animalData = { ...data };
    
    // Convertir race en IRI
    if (typeof animalData.race === 'number' || typeof animalData.race === 'string') {
      animalData.race = `/api/races/${animalData.race}`;
    }
    
    try {
      const response = await makeRequest(`${API_URL}/animals`, {
        method: "POST",
        body: JSON.stringify(animalData)
      });
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  update: async (id, data) => {
    const animalData = { ...data };
    
    // Convertir race en IRI
    if (typeof animalData.race === 'number' || typeof animalData.race === 'string') {
      animalData.race = `/api/races/${animalData.race}`;
    }
    
    // Supprimer les photos pour éviter les erreurs
    delete animalData.photos;
    
    try {
      const response = await makeRequest(`${API_URL}/animals/${id}`, {
        method: "PATCH",
        body: JSON.stringify(animalData)
      });
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await makeRequest(`${API_URL}/animals/${id}`, {
        method: "DELETE"
      });
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  getAnimalsForSale: async () => {
    try {
      const response = await makeRequest(`${API_URL}/animals?aVendre=true`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  
  uploadPhoto: async (animalId, photoData) => {
    const formData = new FormData();
    formData.append('photo', photoData.file);
    formData.append('description', photoData.description || '');
    formData.append('principale', photoData.principale);
    
    try {
      const response = await makeRequest(`${API_URL}/animals/${animalId}/photos`, {
        method: "POST",
        headers: {
          "Content-Type": undefined
        },
        body: formData
      });
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};

export default AnimalApi;