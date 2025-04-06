// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AnimalListPage from './pages/AnimalListPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminAnimalEditPage from './pages/AdminAnimalEditPage';
import './App.css';

// Composant pour afficher conditionnelement le footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Vérifier si l'URL actuelle est une route d'administration
  const isAdminRoute = location.pathname.startsWith('/admin') && 
                       location.pathname !== '/admin/login';
  
  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/animaux" element={<AnimalListPage />} />
          <Route path="/animaux/:id" element={<AnimalDetailPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          {/* Routes protégées */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/animal/:id" element={
            <ProtectedRoute>
              <AdminAnimalEditPage />
            </ProtectedRoute>
          } />
                      
          {/* Route par défaut - redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;