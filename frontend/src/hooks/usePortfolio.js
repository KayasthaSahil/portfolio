import { useState, useEffect } from 'react';
import { portfolioService } from '../services/api';

export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        const portfolioData = await portfolioService.getPortfolioData();
        setData(portfolioData);
      } catch (err) {
        setError(err.message || 'Failed to fetch portfolio data');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const portfolioData = await portfolioService.getPortfolioData();
      setData(portfolioData);
    } catch (err) {
      setError(err.message || 'Failed to fetch portfolio data');
      console.error('Error fetching portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useContactSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitContact = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await portfolioService.submitContactForm(formData);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to submit contact form');
      console.error('Error submitting contact form:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error };
};