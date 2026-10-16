import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface SeasonalCalendarProps {
  onSelectMushroom: (name: string) => void;
}

interface MushroomSeason {
  name: string;
  seasonMonths: number[]; // 1-12
  peakMonths: number[];
  type: string;
}

export const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({ onSelectMushroom }) => {
  // Current month in local French context (e.g. October = 10)
  const currentMonthIndex = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthIndex);

  const months = [
    { num: 1, label: 'Jan' },
    { num: 2, label: 'Fév' },
    { num: 3, label: 'Mar' },
    { num: 4, label: 'Avr' },
    { num: 5, label: 'Mai' },
    { num: 6, label: 'Juin' },
    { num: 7, label: 'Juil' },
    { num: 8, label: 'Aoû' },
    { num: 9, label: 'Sep' },
    { num: 10, label: 'Oct' },
    { num: 11, label: 'Nov' },
    { num: 12, label: 'Déc' },
  ];

  const species: MushroomSeason[] = [
    {
      name: 'Cèpes',
      seasonMonths: [7, 8, 9, 10, 11],
      peakMonths: [9, 10],
      type: 'Cèpe de Bordeaux & Cèpe d\'été'
    },
    {
      name: 'Girolles',
      seasonMonths: [5, 6, 7, 8, 9, 10, 11],
      peakMonths: [6, 9, 10],
      type: 'Chanterelle commune'
    },
    {
      name: 'Morilles',
      seasonMonths: [3, 4, 5],
      peakMonths: [4],
      type: 'Morille blonde & noire'
    },
    {
      name: 'Trompettes',
      seasonMonths: [9, 10, 11, 12],
      peakMonths: [10, 11],
      type: 'Trompette de la mort'
    },
  ];

  const getStatus = (m: MushroomSeason, monthNum: number) => {
    if (m.peakMonths.includes(monthNum)) return { status: 'Pleine saison', color: 'bg-amber-900 text-white' };
    if (m.seasonMonths.includes(monthNum)) return { status: 'Récolte possible', color: 'bg-amber-100 text-amber-900' };
    return { status: 'Hors saison', color: 'bg-stone-100 text-stone-400' };
  };

  const selectedMonthObj = months.find((m) => m.num === selectedMonth);

  return (
    <section id="calendrier" className="py-16 bg-[#F5F2EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendrier Mycologique de Cueillette</span>
          </div>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-stone-950 mb-3 text-balance">
            Le rythme des sous-bois au fil des 12 mois
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Consulter les périodes d'abondance pour acheter frais au marché ou partir en forêt après les pluies d'orage.
          </p>
        </div>

        {/* 12-Month Interactive Filter Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs mb-8 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-[600px] justify-between">
            {months.map((m) => {
              const isSelected = selectedMonth === m.num;
              const isCurrent = currentMonthIndex === m.num;
              return (
                <button
                  key={m.num}
                  onClick={() => setSelectedMonth(m.num)}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center relative ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span>{m.label}</span>
                  {isCurrent && (
                    <span className="block text-[9px] font-normal opacity-80">
                      actuel
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlight for the chosen month */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center justify-between pb-6 border-b border-stone-100 mb-6">
            <h3 className="font-serif-cormorant text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>Disponibilité en {selectedMonthObj?.label}</span>
              {currentMonthIndex === selectedMonth && (
                <span className="text-xs font-sans font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md">
                  Mois en cours
                </span>
              )}
            </h3>
            <span className="text-xs text-stone-500">
              Cliquez sur un champignon pour filtrer les recettes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {species.map((sp) => {
              const { status, color } = getStatus(sp, selectedMonth);
              const isPeak = status === 'Pleine saison';
              const isAvailable = status !== 'Hors saison';

              return (
                <div
                  key={sp.name}
                  onClick={() => {
                    onSelectMushroom(sp.name);
                    const el = document.getElementById('recettes');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isPeak
                      ? 'border-amber-900/40 bg-amber-50/40 hover:bg-amber-50 shadow-2xs'
                      : isAvailable
                      ? 'border-stone-200 bg-white hover:bg-stone-50'
                      : 'border-stone-100 bg-stone-50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-serif-cormorant text-xl font-bold text-stone-900">
                      {sp.name}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md tabular-nums ${color}`}>
                      {status}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 mb-3">{sp.type}</p>

                  <div className="text-[11px] font-medium text-stone-700 flex items-center gap-1">
                    {isPeak ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-900" />
                    ) : isAvailable ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-500" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-stone-400" />
                    )}
                    <span>
                      {isPeak
                        ? 'Idéal à cuisiner frais'
                        : isAvailable
                        ? 'Disponible selon météo'
                        : 'Privilégier les séchés'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
