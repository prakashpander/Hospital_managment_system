import React, { createContext, useState, StrictMode } from 'react';
import App from './App.jsx';
import { createRoot } from "react-dom/client";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({})
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </Context.Provider>
  )
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < AppWrapper />
  </StrictMode>,
)
