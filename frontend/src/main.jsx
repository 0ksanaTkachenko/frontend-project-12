import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import i18nInit from '@src/i18n';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import store from './store/store';

const rollbarConfig = {
  accessToken: 'c0bc328e8dca445d974c741e40d55e5f',
  environment: 'production',
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
    </RollbarProvider>,
  );
};

startApp();
