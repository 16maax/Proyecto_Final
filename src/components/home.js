import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'; 
import {
  isValidLength,
  hasUpperCase,
  hasLowerCase,
  hasSpecialCharacter,
  hasNoConsecutiveNumbers,
  hasNoConsecutiveLetters,
  validatePassword
} from './passwordValidation';

const Home = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar la contraseña antes de enviarla al backend
    if (!validatePassword(password)) {
      alert('La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un carácter especial, y no debe tener números o letras consecutivos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/register', {
        username,
        email,
        password
      });
      console.log(response.data);
      // Mostrar mensaje de éxito o redirigir a otra página
      // Por ejemplo, podrías redirigir a la página de inicio de sesión
      navigate('/');
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      });
      console.log(response.data);
      // Guardar token JWT en localStorage o en estado de la aplicación
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      // Redirigir a la página de perfil u otra página protegida
      // Por ejemplo, podrías redirigir a la página de perfil
      navigate('/card');
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='login-page'>
      <div className="container">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Iniciar Sesión</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>

        <div className="register">
          <form className="form" onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">Registro</label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
