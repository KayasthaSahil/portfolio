import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Portfolio API service
export const portfolioService = {
  // Get portfolio data
  getPortfolioData: async () => {
    try {
      const response = await axios.get(`${API}/portfolio`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  },

  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await axios.post(`${API}/contact`, formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Get contact submissions (admin)
  getContactSubmissions: async (status = null) => {
    try {
      const params = status ? { status } : {};
      const response = await axios.get(`${API}/contact`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      throw error;
    }
  },

  // Update portfolio data (admin)
  updatePortfolioData: async (updateData) => {
    try {
      const response = await axios.put(`${API}/portfolio`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating portfolio data:', error);
      throw error;
    }
  },

  // Update contact submission status (admin)
  updateContactStatus: async (submissionId, status) => {
    try {
      const response = await axios.put(`${API}/contact/${submissionId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API}/`);
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};