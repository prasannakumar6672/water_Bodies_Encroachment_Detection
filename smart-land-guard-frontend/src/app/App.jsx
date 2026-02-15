import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import LoadingAnimation from '../components/common/LoadingAnimation';
import CustomCursor from '../components/common/CustomCursor';
import ParticleSystem from '../components/effects/ParticleSystem';

import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { routes } from './routes';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="relative min-h-screen bg-bg-darker text-text-primary selection:bg-cyan-500/30">
            <ParticleSystem />
            <CustomCursor />
            <Suspense fallback={<LoadingAnimation />}>
              <AppRoutes />
            </Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
