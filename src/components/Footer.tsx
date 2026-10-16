import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-white block">
              Ferme Agricole Madre Agatha Carelli
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Gastronomie & mycologie de terroir. Recettes de la ferme, dosages rigoureux et savoir-faire mycologique pour sublimer chaque poêlée.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('recettes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Toutes les Recettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('varietes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Variétés de Champignons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('formation')}
                  className="hover:text-amber-300 font-medium transition-colors cursor-pointer text-amber-200"
                >
                  Formation Culture Domestique
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('secrets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Les 4 Règles d'Or
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendrier')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Calendrier de Cueillette
                </button>
              </li>
            </ul>
          </div>

          {/* Important Mycological Safety Warning */}
          <div className="md:col-span-4 p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Avertissement Mycologique</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              En cas de cueillette en milieu sauvage, ne consommez jamais un champignon sans identification formelle préalable. En cas de doute, consultez un pharmacien mycologue ou une société de mycologie agréée.
            </p>
          </div>

        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Sous-Bois Gastronomie. Tous droits réservés.</p>
          <p className="italic font-serif-cormorant text-stone-400">
            Fait avec passion pour la cuisine française et les saveurs d'humus.
          </p>
        </div>

      </div>
    </footer>
  );
};
