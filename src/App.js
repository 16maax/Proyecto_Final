import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Inicio from './components/inicio'
import CardsPage from './components/CardsPage'
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:3080/verify", {
            method: "POST",
            headers: {
                'jwt-token': user.token
              }
        })
        .then(r => r.json())
        .then(r => {
            setLoggedIn('success' === r.message)
            setEmail(user.email || "")
        })
  }, [])

  //const rutaServidor = "";
  const rutaServidor = "/proyecto-final";

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path={rutaServidor} element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path={rutaServidor + '/inicio'} element={<Inicio />} />
          <Route path={rutaServidor + '/card'} element={<CardsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;