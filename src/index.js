import React from 'react';
import { HashRouter } from "react-router-dom";  // ✅ Use HashRouter for GitHub Pages
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';   
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>  {/* ✅ Wrapped App inside HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
