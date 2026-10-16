import React from 'react';
import { CHEF_SECRETS } from '../data/recipes';
import { Award } from 'lucide-react';

export const ChefSecretsSection: React.FC = () => {
  return (
    <section id="secrets" className="py-16 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            <span>Savoir-Faire Fondamental</span>
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-stone-950 mb-3 text-balance">
            Les quatre règles d'or de la cuisson
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Pourquoi tant de poêlées finissent en bouillie aqueuse ? Découvrez les principes physiques et gastronomiques appliqués dans les plus grandes tables de bistronomie.
          </p>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHEF_SECRETS.map((secret, index) => (
            <div
              key={index}
              className="p-7 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-400 mb-2">
                  <span className="font-serif-cormorant text-base text-amber-900 font-bold">
                    0{index + 1}. {secret.badge}
                  </span>
                </div>

                <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900 mb-1">
                  {secret.title}
                </h3>
                
                <h4 className="text-xs font-medium text-stone-500 mb-3">
                  {secret.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {secret.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
