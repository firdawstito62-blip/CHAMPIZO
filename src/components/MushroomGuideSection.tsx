import React from 'react';
import { MUSHROOM_GUIDES } from '../data/recipes';
import { Sparkles, Calendar, Utensils, Compass, ArrowRight } from 'lucide-react';

interface MushroomGuideSectionProps {
  onSelectMushroom: (name: string) => void;
}

export const MushroomGuideSection: React.FC<MushroomGuideSectionProps> = ({
  onSelectMushroom
}) => {
  return (
    <section id="varietes" className="py-16 bg-[#F5F2EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Encyclopédie Botanique & Gourmande</span>
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-stone-950 mb-3 text-balance">
            Les quatre joyaux de nos forêts
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Chaque variété possède sa propre chimie aromatique, son niveau d'humidité et ses exigences thermiques. Maîtrisez leurs spécificités pour ne plus jamais rater une cuisson.
          </p>
        </div>

        {/* 4 Mushroom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MUSHROOM_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-2xs space-y-5 flex flex-col justify-between"
            >
              <div>
                {/* Title & Latin binomial name */}
                <div className="flex items-baseline justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
                  <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900">
                    {guide.name}
                  </h3>
                  <span className="text-xs italic text-stone-500 font-serif-cormorant shrink-0">
                    {guide.latinName}
                  </span>
                </div>

                {/* Season & Foraging */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 text-stone-700">
                    <Calendar className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-stone-900">Période optimale : </strong>
                      <span>{guide.season}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-stone-700">
                    <Compass className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-stone-900">Habitat & Cueillette : </strong>
                      <span>{guide.foragingTip}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-stone-700">
                    <Utensils className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-stone-900">Règle de cuisson : </strong>
                      <span>{guide.culinaryRule}</span>
                    </div>
                  </div>
                </div>

                {/* Flavor Profile */}
                <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700">
                  <strong className="block text-stone-900 font-semibold mb-0.5">Profil aromatique :</strong>
                  <span className="italic">{guide.flavorProfile}</span>
                </div>
              </div>

              {/* Pairings & Filter button */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-stone-500">
                  <strong className="text-stone-700">Accords favoris :</strong>{' '}
                  {guide.pairsWith.slice(0, 3).join(', ')}
                </div>

                <button
                  onClick={() => {
                    // Match variety name
                    const simpleName = guide.id === 'cepes' ? 'Cèpes' :
                                      guide.id === 'girolles' ? 'Girolles' :
                                      guide.id === 'morilles' ? 'Morilles' : 'Trompettes';
                    onSelectMushroom(simpleName);
                    const el = document.getElementById('recettes');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-amber-950 hover:text-amber-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>Recettes aux {guide.id === 'morilles' ? 'morilles' : guide.id === 'cepes' ? 'cèpes' : guide.id}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
