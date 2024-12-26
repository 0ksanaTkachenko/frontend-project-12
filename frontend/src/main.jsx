import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'
import store from './store/store.js';
import './i18n';
import i18nInit from '@src/i18n';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: "c0bc328e8dca445d974c741e40d55e5f", 
  environment: "production",
};

const startApp = async () => {
  await i18nInit();

  createRoot(document.getElementById('root')).render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
        </StrictMode>
        </ErrorBoundary>
    </RollbarProvider>
  );
};

startApp();