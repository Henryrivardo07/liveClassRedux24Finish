import '@/scss/globals.scss'; // Import global styles
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './Redux/store'; // Import the Redux store
import { Dialog } from './Components/Dialog.tsx';
import { Toast } from './Components/Toast.tsx';

// Make sure you're safely accessing the 'root' element
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        {' '}
        {/* Wrap your app with Redux Provider */}
        <Toast />
        <Dialog />
        <App /> {/* Your main App component */}
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
