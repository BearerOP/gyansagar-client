import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider
import { AuthProvider } from './context/AuthContext';

// Create the root element
const root = createRoot(document.getElementById('root'));

// Render the application
root.render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
