import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function useAuthentication() {
  const [user, setUser] = useState(null);

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

  // Añadir aquí la lógica de gestión de auth y user. (register, logout...)

  return {
    user,
    login,
  };
}
