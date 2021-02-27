import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  // Cuando la aplicación arranca, estoy cargando al user
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log('Login error:', err);
      });
  }

  function logout() {
    setUser(null);
  }

  function getProfile() {
    axios
      .get(`${API_URL}/auth/profile`)
      .then((res) => {
        console.log(' El profile: ', res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log('Error retrieving profile:', err);
      })
      .finally(() => {
        // Cuando la aplicación ha cargado ya sea bien o con error los datos del user, loading es false
        setLoading(false);
      });
  }

  useEffect(() => {
    getProfile();
  }, []);

  // Añadir aquí la lógica de gestión de auth y user. (register, logout...)

  return {
    user,
    login,
    logout,
    loading,
  };
}
