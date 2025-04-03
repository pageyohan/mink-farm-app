// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-stone-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 mr-2" />
              <h2 className="text-xl font-bold">Élevage Jones</h2>
            </div>
            <p className="text-stone-300 mb-4">
              Élevage professionnel de bovins et ovins de qualité supérieure pour votre exploitation.
            </p>
          </div>
          
          {/* Navigation rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-stone-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/animaux" className="text-stone-300 hover:text-white transition-colors">
                  Nos animaux
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-stone-300 hover:text-white transition-colors">
                  Administration
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-stone-300">05 23 53 14 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:contact@elevage-jones.com" className="text-stone-300 hover:text-white transition-colors">
                  contact@elevage-jones.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-stone-300">1234 Route des Éleveurs, 33000 Bordeaux</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-stone-700 text-center text-stone-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Élevage Jones. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;