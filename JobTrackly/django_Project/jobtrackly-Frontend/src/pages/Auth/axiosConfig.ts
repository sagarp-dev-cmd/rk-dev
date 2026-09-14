import axios from 'axios';

export const getCSRFToken = async () => {
    try {
      const response = await axios.get('/user/csrf-token/');
      // console.log("CSRF token fetched:", response.data.csrfToken);
      return response.data.csrfToken;
    } catch (err) {
      console.error("Failed to fetch CSRF token", err);
      return null;
    }
  }; 
