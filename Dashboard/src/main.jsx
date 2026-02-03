import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // false ki jge null kra hai 
  const [doctorLength, setDoctorLength] = useState(null); // false ki jge null kra hai 
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser , doctor , setDoctor }}>
      <App />
    </Context.Provider>
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
