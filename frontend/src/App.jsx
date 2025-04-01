// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-stone-100">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Vos routes iront ici */}
            <Route path="/" element={<div className="p-10 text-center">Page d'accueil</div>} />
            <Route path="/animaux" element={<div className="p-10 text-center">Liste des animaux</div>} />
            <Route path="/admin/login" element={<div className="p-10 text-center">Page de connexion</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;