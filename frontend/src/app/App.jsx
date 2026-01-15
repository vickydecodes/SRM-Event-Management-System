// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Toaster } from '@/components/ui/sonner';
import AppRoutes from '@/core/router/app.routes.index.jsx';
import { AuthProvider } from '@/core/contexts/auth.context';
import { UIProvider } from '@/core/contexts/ui.context';
import { ApiProvider } from '@/core/contexts/api.context';
import { TooltipProvider } from '@/components/ui/tooltip';
function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <ApiProvider>
            <TooltipProvider>
              <Toaster />
              <AppRoutes />
            </TooltipProvider>
          </ApiProvider>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
