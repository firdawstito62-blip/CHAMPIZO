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
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-4">
        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
          Publicité Partenaire
        </span>

        {/* 468x60 Format Ad (atOptions key a23efa14117af875672ae40b36fdce93) */}
        <div className="flex justify-center items-center w-full overflow-x-auto py-1">
          <div className="w-[468px] max-w-full h-[60px] flex items-center justify-center overflow-hidden">
            <iframe
              title="Annonce Partenaire 468x60"
              width="468"
              height="60"
              className="border-0 overflow-hidden"
              scrolling="no"
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : 'a23efa14117af875672ae40b36fdce93','format' : 'iframe','height' : 60,'width' : 468,'params' : {}};</script><script type="text/javascript" src="https://bicea.org/22/a23efa14117af875672ae40b36fdce93"></script></body></html>`}
            />
          </div>
        </div>

        {/* Native Container Ad */}
        <div
          id="container-a09631dc9ecd84fadec2956c987ca4a2"
          className="w-full flex items-center justify-center min-h-[50px] overflow-hidden text-center"
        ></div>
      </div>
    </aside>
  );
};
