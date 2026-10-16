import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface PromoBannerProps {
  formationUrl: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ formationUrl }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-stone-900 text-stone-100 text-xs px-4 py-2.5 border-b border-stone-800 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 mx-auto sm:mx-0 truncate">
          <span className="bg-amber-800 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Formation
          </span>
          <span className="text-stone-300 truncate">
            Apprenez à cultiver vos propres champignons comestibles chez vous (pleurotes, shiitakés...)
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={formationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-300 hover:text-white flex items-center gap-1 transition-colors underline decoration-amber-400/50 hover:decoration-white"
          >
            <span>Découvrir la méthode</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer la bannière"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
