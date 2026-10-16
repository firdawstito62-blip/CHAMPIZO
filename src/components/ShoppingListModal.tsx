import React, { useState } from 'react';
import { X, Trash2, Check, Copy, ShoppingBag } from 'lucide-react';

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  checked: boolean;
}

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  items,
  onToggleItem,
  onRemoveItem,
  onClearAll
}) => {
  const [copiedToast, setCopiedToast] = useState(false);

  if (!isOpen) return null;

  const handleCopyList = () => {
    if (items.length === 0) return;
    const text = "🛒 Ma Liste de Courses — Ferme Agricole Madre Agatha Carelli :\n\n" +
      items.map(it => `${it.checked ? '✓' : '☐'} ${it.amount} ${it.name}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2200);
  };

  const completedCount = items.filter(it => it.checked).length;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-900" />
            <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900">
              Panier du Marché
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-900 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-semibold text-stone-800 text-sm">Votre panier est vide</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Ajoutez les ingrédients de vos recettes favorites en un clic pour préparer votre passage au marché.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                <span>{completedCount} sur {items.length} articles cochés</span>
                <button
                  onClick={onClearAll}
                  className="text-stone-400 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Tout effacer
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      item.checked
                        ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                        : 'bg-white border-stone-200/80 hover:border-stone-300 text-stone-800 shadow-2xs'
                    }`}
                  >
                    <label
                      onClick={() => onToggleItem(item.id)}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        item.checked
                          ? 'bg-amber-900 border-amber-900 text-white'
                          : 'border-stone-300 bg-white'
                      }`}>
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-3" />}
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold tabular-nums mr-1.5">{item.amount}</span>
                        <span>{item.name}</span>
                      </div>
                    </label>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-stone-300 hover:text-red-600 transition-colors ml-2"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              {items.length} ingrédients à acheter
            </span>
            <button
              onClick={handleCopyList}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copier pour mes notes</span>
            </button>
          </div>
        )}

        {/* Toast */}
        {copiedToast && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Liste de courses copiée !</span>
          </div>
        )}
      </div>
    </div>
  );
};
