import React from 'react';
import { Search, Sparkles, Clock, Flame, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedMushroom: string;
  onSelectMushroom: (m: string) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedMushroom,
  onSelectMushroom,
  onExploreClick
}) => {
  const varieties = [
    { label: 'Tous', value: 'Tous' },
    { label: 'Cèpes', value: 'Cèpes' },
    { label: 'Girolles', value: 'Girolles' },
    { label: 'Morilles', value: 'Morilles' },
    { label: 'Trompettes', value: 'Trompettes' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Editorial Headline & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="text-xs uppercase tracking-widest font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gastronomie Forestière & Mycologie Culinaire</span>
            </div>

            <h1 className="font-serif-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.08] mb-5 text-balance">
              L'art de sublimer les champignons de nos sous-bois
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mb-8 font-normal">
              Découvrez des recettes de chefs pensées pour exalter chaque arôme : du fondant des cèpes bouchons au parfum envoûtant des morilles au vin jaune, accompagnées de dosages précis et de minuteurs pas-à-pas.
            </p>

            {/* Functional Search Bar */}
            <div className="relative max-w-xl mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher un plat, un cèpe, risotto, crème..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 px-2 py-1"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Quick Variety Interactive Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-semibold text-stone-500 mr-1">Variétés :</span>
              {varieties.map((v) => (
                <button
                  key={v.value}
                  onClick={() => onSelectMushroom(v.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedMushroom === v.value
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Subtle editorial trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 max-w-lg">
              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-sm mb-0.5">
                  <UtensilsCrossed className="w-4 h-4 text-amber-800" />
                  <span className="tabular-nums">6</span> Recettes
                </div>
                <p className="text-xs text-stone-500">Créées pour sublimer l'umami</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-sm mb-0.5">
                  <Flame className="w-4 h-4 text-amber-800" />
                  <span>Savoir-faire</span>
                </div>
                <p className="text-xs text-stone-500">Technique de saisie à sec</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-sm mb-0.5">
                  <Clock className="w-4 h-4 text-amber-800" />
                  <span>Minuteurs</span>
                </div>
                <p className="text-xs text-stone-500">Chrono sonore intégré</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] lg:min-h-[480px] rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 relative group">
              <img
                src="/src/assets/images/hero_mushroom_gastronomy_1792183941391.jpg"
                alt="Poêlée de champignons sauvages au beurre et thym dans une poêle en fonte"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-medium mb-1">
                  Technique du chef
                </span>
                <p className="font-serif-cormorant text-xl sm:text-2xl font-bold leading-tight mb-2">
                  La poêlée forestière au beurre moussant
                </p>
                <p className="text-xs text-stone-300 line-clamp-2 mb-4">
                  Saisir à feu vif sans sel pour éviter l'eau de végétation, puis arroser d'un beurre noisette persillé.
                </p>
                <button
                  onClick={onExploreClick}
                  className="self-start text-xs font-semibold px-4 py-2 bg-white/95 text-stone-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                  Découvrir les recettes
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
