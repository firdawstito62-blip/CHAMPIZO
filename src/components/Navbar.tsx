import React from 'react';
import { Bookmark, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  shoppingListCount: number;
  onOpenFavorites: () => void;
  onOpenShoppingList: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  shoppingListCount,
  onOpenFavorites,
  onOpenShoppingList,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'recettes', label: 'Recettes' },
    { id: 'varietes', label: 'Variétés' },
    { id: 'formation', label: 'Formation Culture' },
    { id: 'secrets', label: 'Secrets du Chef' },
    { id: 'calendrier', label: 'Calendrier' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif-cormorant text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            Ferme Agricole Madre Agatha Carelli
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                  activeSection === link.id
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                    : 'hover:text-stone-950 text-stone-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={onOpenShoppingList}
              className="flex items-center gap-1.5 whitespace-nowrap shrink-0 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-stone-500" />
              <span>Panier Marché</span>
              {shoppingListCount > 0 && (
                <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.2 rounded-full tabular-nums">
                  {shoppingListCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenFavorites}
              className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
              title="Voir mes recettes enregistrées"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Mes Favoris</span>
              {favoriteCount > 0 && (
                <span className="bg-stone-700 text-stone-100 text-[11px] px-1.5 py-0.5 rounded tabular-nums">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-2 text-base font-medium text-stone-800 hover:text-stone-950"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenShoppingList();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-base font-medium text-stone-800 hover:text-stone-950"
          >
            <ShoppingBag className="w-5 h-5 text-stone-600" />
            <span>Panier Marché ({shoppingListCount})</span>
          </button>
        </div>
      )}
    </header>
  );
};
