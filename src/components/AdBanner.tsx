import React, { useEffect } from 'react';

export const AdBanner: React.FC = () => {
  useEffect(() => {
    const scriptId = 'ad-script-a09631dc9ecd84fadec2956c987ca4a2';
    // Check if script is already in the document
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://bicea.org/21/a09631dc9ecd84fadec2956c987ca4a2';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <aside aria-label="Espace Publicitaire" className="w-full py-6 bg-stone-100/60 border-y border-stone-200/80 my-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase tracking-wider text-stone-400 mb-2 font-medium">
          Publicité Partenaire
        </span>
        <div
          id="container-a09631dc9ecd84fadec2956c987ca4a2"
          className="w-full flex items-center justify-center min-h-[90px] overflow-hidden text-center"
        ></div>
      </div>
    </aside>
  );
};
