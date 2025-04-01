// src/services/AuthApi.js
import { API_URL, makeRequest } from "./apiUtils";

export const AuthApi = {
  login: async (credentials) => {
    try {
      localStorage.removeItem('token');
      
      const response = await makeRequest(`${API_URL}/auth`, {
        method: "POST",
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    console.log("Token in localStorage:", token); // Déboguer
    
    if (!token) return false;
    
    try {
      // Décode le token pour vérifier son expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isValid = payload.exp > (Date.now() / 1000);
      console.log("Token expiration:", new Date(payload.exp * 1000), "Is valid:", isValid);
      return isValid;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }
};

export default AuthApi;