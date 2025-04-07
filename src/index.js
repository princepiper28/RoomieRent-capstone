import React from 'react';
import { HashRouter } from "react-router-dom";  // ✅ Use HashRouter for GitHub Pages
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';   
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthContext";  // ✅ Import AuthProvider
import { FavoritesProvider } from "./context/FavoritesContext";  // ✅ Import FavoritesProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>  
      <AuthProvider>  {/* ✅ Wrap inside AuthProvider */}
        <FavoritesProvider>  {/* ✅ Wrap inside FavoritesProvider */}
          <App />
        </FavoritesProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
