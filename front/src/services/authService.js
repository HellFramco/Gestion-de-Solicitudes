import axios from 'axios';

//const API_URL = 'http://backend:5000/api/auth/login';
const API_URL = 'http://localhost:5000/api/auth/login';

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      }
    );
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error al iniciar sesión');
    return 'Error al iniciar sesión';
  }
};

export const register = async (email, password) => {
  await axios.post('/api/register', { email, password });
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      throw new Error(errorData.message || 'Failed to send recovery email');
    }

    if (responseText) {
      JSON.parse(responseText);
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};
