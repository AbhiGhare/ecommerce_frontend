// services/api.js
import axios from 'axios';

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;  // You may want to handle errors differently depending on your needs
  }
};
