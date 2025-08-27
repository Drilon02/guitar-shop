import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nProvider } from './i18n/i18n';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ApolloProvider>
  </React.StrictMode>
);
