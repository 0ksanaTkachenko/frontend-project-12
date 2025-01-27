import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import i18nInit from '@src/i18n';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import store from './store/store';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
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
