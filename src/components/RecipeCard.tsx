import React, { useState } from 'react';
import { Recipe } from '../data/recipes';
import { Bookmark, Clock, ChefHat, ArrowUpRight } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onSelectRecipe(recipe)}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Recipe Image Container with Resilient Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <ChefHat className="w-8 h-8 mb-2 text-stone-300" />
            <span className="text-xs font-serif-cormorant text-stone-500 font-semibold">{recipe.title}</span>
          </div>
        )}

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950'
          }`}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          title={isFavorite ? 'Retirer des favoris' : 'Enregistrer dans mes favoris'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle category caption */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-stone-950/70 backdrop-blur-md text-white text-[11px] font-medium rounded-md tracking-wide">
          {recipe.mushroomType}
        </div>
      </div>

      {/* Card Content & Typographic Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator (Zero-Pill Compliance) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span className="tabular-nums">{recipe.prepTime + recipe.cookTime}</span> min
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5 text-stone-400" />
              <span>{recipe.difficulty}</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{recipe.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif-cormorant text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug mb-2">
            {recipe.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {recipe.subtitle}
          </p>
        </div>

        {/* Card Footer with CTA link */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Saison : <strong className="font-medium text-stone-700">{recipe.season}</strong>
          </span>
          <span className="font-semibold text-stone-900 group-hover:text-amber-900 flex items-center gap-1">
            Voir recette
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
