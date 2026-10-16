/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { RECIPES, Recipe } from './data/recipes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { ShoppingListModal, ShoppingItem } from './components/ShoppingListModal';
import { MushroomGuideSection } from './components/MushroomGuideSection';
import { FormationSection } from './components/FormationSection';
import { ChefSecretsSection } from './components/ChefSecretsSection';
import { SeasonalCalendar } from './components/SeasonalCalendar';
import { PromoBanner } from './components/PromoBanner';
import { AdBanner } from './components/AdBanner';
import { Footer } from './components/Footer';
import { Filter, SlidersHorizontal, RotateCcw, Bookmark, Sparkles } from 'lucide-react';

const FORMATION_URL = "https://gsnaauva.mychariow.shop/binbotsite";

export default function App() {
  const [recipes] = useState<Recipe[]>(RECIPES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedMushroom, setSelectedMushroom] = useState<string>('Tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Tous');
  const [maxTime, setMaxTime] = useState<number>(0); // 0 = all
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Selected recipe modal
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // Shopping list modal & state
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    try {
      const saved = localStorage.getItem('sous_bois_shopping_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sous_bois_favorites');
      return saved ? JSON.parse(saved) : ['risotto-cepes', 'poelee-girolles'];
    } catch {
      return ['risotto-cepes', 'poelee-girolles'];
    }
  });

  // Persist shopping list
  useEffect(() => {
    try {
      localStorage.setItem('sous_bois_shopping_list', JSON.stringify(shoppingList));
    } catch {
      // storage unavailable
    }
  }, [shoppingList]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('sous_bois_favorites', JSON.stringify(favorites));
    } catch {
      // storage unavailable
    }
  }, [favorites]);

  const toggleFavorite = (recipeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const handleAddToShoppingList = (items: { name: string; amount: string }[]) => {
    setShoppingList((prev) => {
      const newItems = [...prev];
      items.forEach((item) => {
        // avoid duplicates if exact item name exists
        const existing = newItems.find((it) => it.name.toLowerCase() === item.name.toLowerCase());
        if (!existing) {
          newItems.push({
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: item.name,
            amount: item.amount,
            checked: false
          });
        }
      });
      return newItems;
    });
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((it) => it.id !== id));
  };

  const clearAllShoppingItems = () => {
    setShoppingList([]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tous');
    setSelectedMushroom('Tous');
    setSelectedDifficulty('Tous');
    setMaxTime(0);
    setShowOnlyFavorites(false);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(recipe.id)) return false;

      // Category filter
      if (selectedCategory !== 'Tous' && recipe.category !== selectedCategory) return false;

      // Mushroom type filter
      if (selectedMushroom !== 'Tous' && recipe.mushroomType !== selectedMushroom) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'Tous' && recipe.difficulty !== selectedDifficulty) return false;

      // Max time filter
      if (maxTime > 0 && recipe.prepTime + recipe.cookTime > maxTime) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesSubtitle = recipe.subtitle.toLowerCase().includes(q);
        const matchesMushroom = recipe.mushroomType.toLowerCase().includes(q);
        const matchesIngredients = recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesMushroom && !matchesIngredients) {
          return false;
        }
      }

      return true;
    });
  }, [recipes, searchQuery, selectedCategory, selectedMushroom, selectedDifficulty, maxTime, showOnlyFavorites, favorites]);

  const categories = [
    'Tous',
    'Plat principal',
    'Pâtes & Risottos',
    'Poêlées & Accompagnements',
    'Entrée & Velouté'
  ];

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'Tous' ||
    selectedMushroom !== 'Tous' ||
    selectedDifficulty !== 'Tous' ||
    maxTime > 0 ||
    showOnlyFavorites;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans selection:bg-amber-900 selection:text-white">
      
      {/* Top Notification Announcement for Cultivation Training */}
      <PromoBanner formationUrl={FORMATION_URL} />

      {/* Top Bar strictly compliant with 3-zone contract */}
      <Navbar
        favoriteCount={favorites.length}
        shoppingListCount={shoppingList.length}
        onOpenFavorites={() => {
          setShowOnlyFavorites(true);
          scrollToSection('recettes');
        }}
        onOpenShoppingList={() => setIsShoppingListOpen(true)}
        activeSection="recettes"
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedMushroom={selectedMushroom}
        onSelectMushroom={(m) => {
          setSelectedMushroom(m);
          scrollToSection('recettes');
        }}
        onExploreClick={() => scrollToSection('recettes')}
      />

      {/* Main Recipes Section with Interactive Filters */}
      <main id="recettes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-amber-900 mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>La Sélection Gourmande</span>
            </div>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-stone-950">
              Nos Recettes de Champignons
            </h2>
          </div>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-950 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Toolbar */}
        <div className="pt-5 pb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            {/* Filter by Mushroom */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <label htmlFor="select-mushroom" className="text-stone-500 font-medium">Champignon :</label>
              <select
                id="select-mushroom"
                value={selectedMushroom}
                onChange={(e) => setSelectedMushroom(e.target.value)}
                className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="Tous">Tous</option>
                <option value="Cèpes">Cèpes</option>
                <option value="Girolles">Girolles</option>
                <option value="Morilles">Morilles</option>
                <option value="Trompettes">Trompettes</option>
              </select>
            </div>

            {/* Filter by Difficulty */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
              <label htmlFor="select-difficulty" className="text-stone-500 font-medium">Niveau :</label>
              <select
                id="select-difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="Tous">Tous</option>
                <option value="Facile">Facile</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Chef">Chef</option>
              </select>
            </div>

            {/* Filter by Preparation Time */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <label htmlFor="select-time" className="text-stone-500 font-medium">Temps total :</label>
              <select
                id="select-time"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value={0}>Tous les temps</option>
                <option value={25}>≤ 25 min (Rapide)</option>
                <option value={45}>≤ 45 min (Classique)</option>
              </select>
            </div>

            {/* Favorites only filter toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showOnlyFavorites
                  ? 'bg-amber-900 border-amber-900 text-white shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              <span>Favoris uniquement ({favorites.length})</span>
            </button>

          </div>

          {/* Reset Filters CTA if any active */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={toggleFavorite}
                onSelectRecipe={(r) => setActiveRecipe(r)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
            <p className="font-serif-cormorant text-2xl font-bold text-stone-800">
              Aucune recette ne correspond à votre sélection
            </p>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Essayez d'élargir vos critères de recherche ou de retirer certains filtres de temps ou de variété.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Afficher toutes les recettes</span>
            </button>
          </div>
        )}

      </main>

      {/* Emplacement Publicitaire Partenaire */}
      <AdBanner />

      {/* Guide Botanique & Variétés */}
      <MushroomGuideSection
        onSelectMushroom={(m) => {
          setSelectedMushroom(m);
        }}
      />

      {/* Formation Culture Domestique Publicité */}
      <FormationSection formationUrl={FORMATION_URL} />

      {/* Chef's 4 Golden Rules */}
      <ChefSecretsSection />

      {/* 12-Month Seasonal Foraging Calendar */}
      <SeasonalCalendar
        onSelectMushroom={(m) => {
          setSelectedMushroom(m);
        }}
      />

      {/* Quiet Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Modal Recipe Full View */}
      <RecipeModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(null)}
        isFavorite={activeRecipe ? favorites.includes(activeRecipe.id) : false}
        onToggleFavorite={(id) => toggleFavorite(id)}
        onAddToShoppingList={handleAddToShoppingList}
      />

      {/* Modal Shopping List (Panier Marché) */}
      <ShoppingListModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        items={shoppingList}
        onToggleItem={toggleShoppingItem}
        onRemoveItem={removeShoppingItem}
        onClearAll={clearAllShoppingItems}
      />

    </div>
  );
}
