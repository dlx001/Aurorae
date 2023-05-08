import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-h5tp7ep4adx64yo4.us.auth0.com"
    clientId="s5OBewMQbXEsCn6DsS9RGqIsvYXSbPBY"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Auth0Provider>
 
);

