import React from 'react';
import { ExternalLink, CheckCircle2, Sprout, Home, ShieldCheck } from 'lucide-react';

interface FormationSectionProps {
  formationUrl: string;
}

export const FormationSection: React.FC<FormationSectionProps> = ({ formationUrl }) => {
  const points = [
    {
      title: 'Techniques faciles pour la maison',
      desc: 'Cultivez en intérieur, sur un balcon ou dans un coin de cuisine avec des substrats simples (marc de café, paille, sciure).'
    },
    {
      title: 'Espèces savoureuses et faciles à réussir',
      desc: 'Pleurotes variés (gris, jaunes, roses), shiitakés et champignons de Paris : les variétés les plus gratifiantes et rapides.'
    },
    {
      title: 'Du mycélium aux premières récoltes',
      desc: 'Comprendre les phases clés : humidité, aération, température et déclenchement de la fructification abondante.'
    },
    {
      title: 'Champignons 100% frais et biologiques',
      desc: 'Cuisinez vos propres récoltes directement cueillies pour vos poêlées, risottos et recettes gourmandes.'
    }
  ];

  return (
    <section id="formation" className="py-16 bg-[#F3EFE6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Visual Photography Left */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[500px] overflow-hidden bg-stone-900">
              <img
                src="/src/assets/images/formation_culture_champignons_1792185842055.jpg"
                alt="Culture de pleurotes maison sur bloc de mycélium"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-900/90 backdrop-blur-md rounded-md text-[11px] font-semibold text-amber-100 self-start mb-2">
                  <Sprout className="w-3.5 h-3.5" />
                  Culture Maison Accessible
                </div>
                <p className="font-serif-cormorant text-2xl font-bold leading-snug">
                  Récoltez vos premiers champignons frais en quelques semaines
                </p>
              </div>
            </div>

            {/* Content & Offer Details Right */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-900 mb-3">
                  <Home className="w-3.5 h-3.5" />
                  <span>Programme & Méthode Pratique</span>
                </div>

                <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-stone-950 leading-tight mb-4 text-balance">
                  Formation Complète : La Culture Domestique du Champignon Comestible
                </h2>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
                  Vous aimez cuisiner les champignons ? Apprenez dès aujourd'hui à les produire vous-même chez vous ! Cette formation pas-à-pas vous guide pour réussir la culture de pleurotes, de shiitakés et d'autres délices sans investir dans du matériel professionnel.
                </p>

                {/* 4 Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs font-semibold text-stone-900 block mb-0.5">
                          {pt.title}
                        </strong>
                        <span className="text-[11px] text-stone-500 leading-relaxed block">
                          {pt.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to action bar */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Accès en ligne immédiat · Méthode pas-à-pas</span>
                </div>

                <a
                  href={formationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-amber-950 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
                >
                  <span>Rejoindre la formation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
