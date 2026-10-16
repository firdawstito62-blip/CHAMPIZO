import React, { useState, useEffect } from 'react';
import { Recipe } from '../data/recipes';
import {
  X,
  Clock,
  ChefHat,
  Users,
  Wine,
  Lightbulb,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
  Check,
  Share2,
  Printer,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { playChime } from '../utils/sound';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToShoppingList: (items: { name: string; amount: string }[]) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToShoppingList
}) => {
  if (!recipe) return null;

  const [servings, setServings] = useState(recipe.defaultServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);
  const [addedCartToast, setAddedCartToast] = useState(false);

  // Active kitchen timer state
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const scaleRatio = servings / recipe.defaultServings;

  const formatAmount = (baseAmount: number, unit: string) => {
    const scaled = baseAmount * scaleRatio;
    if (unit === 'g' || unit === 'cl' || unit === 'ml') {
      return `${Math.round(scaled)} ${unit}`;
    }
    if (unit === 'L') {
      const val = Math.round(scaled * 10) / 10;
      return `${val} L`;
    }
    if (unit === 'pièces' || unit === 'gousses' || unit === 'brins' || unit === 'botte') {
      const rounded = Math.round(scaled * 2) / 2;
      return `${rounded} ${unit}`;
    }
    return `${Math.round(scaled * 10) / 10} ${unit}`;
  };

  const toggleIngredientCheck = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleStartTimer = (stepNumber: number, minutes: number) => {
    if (activeTimerStep === stepNumber && isTimerRunning) {
      setIsTimerRunning(false);
    } else if (activeTimerStep === stepNumber && !isTimerRunning && timerSecondsLeft > 0) {
      setIsTimerRunning(true);
    } else {
      setActiveTimerStep(stepNumber);
      setTimerSecondsLeft(minutes * 60);
      setIsTimerRunning(true);
    }
  };

  const handleResetTimer = (minutes: number) => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(minutes * 60);
  };

  const handleAddAllToCart = () => {
    const items = recipe.ingredients.map((ing) => ({
      name: ing.name,
      amount: formatAmount(ing.baseAmount, ing.unit)
    }));
    onAddToShoppingList(items);
    setAddedCartToast(true);
    setTimeout(() => setAddedCartToast(false), 2500);
  };

  const handleCopyRecipe = () => {
    const text = `${recipe.title} (${servings} personnes)\n\nIngrédients:\n` +
      recipe.ingredients.map((ing) => `- ${formatAmount(ing.baseAmount, ing.unit)} ${ing.name}`).join('\n') +
      `\n\nPréparation:\n` +
      recipe.steps.map((st) => `${st.stepNumber}. ${st.title} : ${st.instruction}`).join('\n\n');
    
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Actions */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md">
              {recipe.mushroomType}
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              · {recipe.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Add to shopping list button */}
            <button
              onClick={handleAddAllToCart}
              className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Ajouter au Panier Marché"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'text-amber-900 bg-amber-50 hover:bg-amber-100'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
              title={isFavorite ? 'Retirer des favoris' : 'Enregistrer dans mes favoris'}
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleCopyRecipe}
              className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Copier la recette"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer hidden sm:block"
              title="Imprimer la recette"
            >
              <Printer className="w-5 h-5" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8">
          
          {/* Hero Banner & Title */}
          <div>
            <h2 className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-stone-950 leading-tight mb-2">
              {recipe.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 italic font-serif-cormorant mb-4">
              "{recipe.subtitle}"
            </p>

            {/* Visual Photo Banner */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 border border-stone-200">
              <img
                src={recipe.image}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700">
              <div>
                <span className="text-stone-400 block mb-0.5">Préparation</span>
                <span className="font-semibold text-stone-900 tabular-nums flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  {recipe.prepTime} min
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Cuisson</span>
                <span className="font-semibold text-stone-900 tabular-nums flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  {recipe.cookTime} min
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Difficulté</span>
                <span className="font-semibold text-stone-900 flex items-center gap-1">
                  <ChefHat className="w-3.5 h-3.5 text-stone-500" />
                  {recipe.difficulty}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Énergie</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  ~{recipe.caloriesPerServing} kcal / pers.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Servings Scaler & Ingredients Checklist */}
          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-stone-200/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
              <div>
                <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900">
                  Ingrédients nécessaires
                </h3>
                <p className="text-xs text-stone-500">
                  Cochez les ingrédients préparés ou ajoutez-les à votre liste
                </p>
              </div>

              {/* Servings Scaler Buttons */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-300 self-start sm:self-auto shadow-2xs">
                <span className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  Portions :
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    disabled={servings <= 1}
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-stone-900 w-6 text-center tabular-nums">
                    {servings}
                  </span>
                  <button
                    onClick={() => setServings(Math.min(16, servings + 1))}
                    disabled={servings >= 16}
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients List with Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <label
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-amber-50/60 text-stone-400 line-through'
                        : 'hover:bg-white text-stone-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-amber-900 border-amber-900 text-white'
                        : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                    </div>

                    <div className="text-xs leading-snug">
                      <strong className={`font-semibold tabular-nums ${isChecked ? 'text-stone-400' : 'text-stone-950'}`}>
                        {formatAmount(ing.baseAmount, ing.unit)}
                      </strong>{' '}
                      <span>{ing.name}</span>
                      {ing.note && (
                        <span className="text-[11px] text-stone-500 block italic">
                          ({ing.note})
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Quick action: Add all ingredients to shopping list */}
            <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                {Object.values(checkedIngredients).filter(Boolean).length} / {recipe.ingredients.length} préparés
              </span>
              <button
                onClick={handleAddAllToCart}
                className="text-xs font-semibold text-amber-950 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Ajouter ces {recipe.ingredients.length} ingrédients au Panier
              </button>
            </div>
          </div>

          {/* Step-by-Step Cooking Walkthrough */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900">
                Préparation pas-à-pas
              </h3>
              <span className="text-xs text-stone-500">
                {recipe.steps.length} étapes détaillées
              </span>
            </div>

            <div className="space-y-4">
              {recipe.steps.map((step) => {
                const isThisTimerActive = activeTimerStep === step.stepNumber;
                return (
                  <div
                    key={step.stepNumber}
                    className="p-5 bg-white rounded-xl border border-stone-200/90 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h4 className="font-semibold text-stone-900 text-sm">
                          {step.title}
                        </h4>
                      </div>

                      {/* Built-in step timer button if step has minutes */}
                      {step.timerMinutes && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartTimer(step.stepNumber, step.timerMinutes!)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isThisTimerActive && isTimerRunning
                                ? 'bg-amber-900 text-white animate-pulse'
                                : isThisTimerActive && !isTimerRunning && timerSecondsLeft > 0
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                            }`}
                          >
                            {isThisTimerActive && isTimerRunning ? (
                              <>
                                <Pause className="w-3.5 h-3.5" />
                                <span className="tabular-nums font-mono font-bold">
                                  {formatTimerDisplay(timerSecondsLeft)}
                                </span>
                              </>
                            ) : isThisTimerActive && timerSecondsLeft > 0 ? (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                <span className="tabular-nums font-mono">
                                  {formatTimerDisplay(timerSecondsLeft)}
                                </span>
                              </>
                            ) : (
                              <>
                                <Bell className="w-3.5 h-3.5 text-stone-500" />
                                <span>Chrono {step.timerMinutes} min</span>
                              </>
                            )}
                          </button>

                          {isThisTimerActive && timerSecondsLeft > 0 && (
                            <button
                              onClick={() => handleResetTimer(step.timerMinutes!)}
                              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
                              title="Réinitialiser le minuteur"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-8">
                      {step.instruction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sommelier & Chef Astuce Duo Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Wine Pairing */}
            <div className="p-5 bg-stone-900 text-stone-100 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Wine className="w-4 h-4" />
                <span>L'Accord Parfait du Sommelier</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-cormorant italic">
                "{recipe.winePairing}"
              </p>
            </div>

            {/* Chef Tip */}
            <div className="p-5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-950 text-xs font-semibold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-800" />
                <span>Le Geste Technique du Chef</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {recipe.chefTip}
              </p>
            </div>

          </div>

        </div>

        {/* Floating Toasts */}
        {copiedToast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Recette copiée dans le presse-papier !</span>
          </div>
        )}

        {addedCartToast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-950 text-white text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Ingrédients ajoutés à votre panier du marché !</span>
          </div>
        )}

      </div>
    </div>
  );
};
