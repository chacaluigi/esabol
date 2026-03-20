import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

//cuando termine el renderizado se elimina el loader del DOM
const loader = document.getElementById('loader-container');
if (loader) {
  loader.remove();
}
