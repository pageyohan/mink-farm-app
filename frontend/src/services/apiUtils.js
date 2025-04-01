// src/services/apiUtils.js
const API_URL = "http://localhost:8000/api";

export const makeRequest = async (url, options = {}, retryCount = 0) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/ld+json",
  };
  
  // Ajouter le token JWT s'il existe
  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const finalOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
    
    // Supprimer le Content-Type si c'est un FormData
    if (finalOptions.body instanceof FormData) {
      delete finalOptions.headers["Content-Type"];
    }
    
    const response = await fetch(url, finalOptions);
    
    let data;
    try {
      // Si le corps est vide (par exemple pour DELETE), on renvoie un objet vide
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Erreur parsing JSON:", e);
      data = {};
    }

    if (!response.ok) {
      // Si on a une erreur 401, c'est que le token est expiré
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = "/admin/login";
        throw new Error("Session expirée");
      }
      throw new Error(`Erreur ${response.status}: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export { API_URL };