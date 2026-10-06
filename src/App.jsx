import React, { useState, useEffect, useRef } from 'react';

const COURSES = [
  'Administração',
  'Ciências Contábeis',
  'Direito',
  'Enfermagem',
  'Estética e Cosmética',
  'Fisioterapia',
  'Gestão de RH',
  'Logística',
  'Nutrição',
  'Pedagogia',
  'Sistemas de Informação',
  'Terapia Ocupacional'
];

export default function App() {
  const [displayTitle, setDisplayTitle] = useState('?????');
  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  const handleStart = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    let elapsed = 0;
    
    // Troca o curso a cada 80ms
    spinIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * COURSES.length);
      setDisplayTitle(COURSES[randomIndex]);
      elapsed += 80;

      // Para após 2.5 segundos (2500ms)
      if (elapsed >= 2500) {
        clearInterval(spinIntervalRef.current);
        const finalIndex = Math.floor(Math.random() * COURSES.length);
        setDisplayTitle(COURSES[finalIndex]);
        setIsSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#231236] relative flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-[#C042C7] selection:text-white">
      
      {/* Importando fonte condensada para o letreiro caso disponível */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
        .font-condensed {
          font-family: 'Oswald', 'Impact', sans-serif;
          transform: scaleY(1.15); /* Alongando levemente a fonte para ficar mais parecido com o mockup */
          display: inline-block;
        }
        .striped-bar {
          background-image: repeating-linear-gradient(
            45deg,
            #ffffff,
            #ffffff 8px,
            #000000 8px,
            #000000 16px
          );
        }
      `}} />

      {/* Geometria de Fundo (Linhas finas roxas) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" preserveAspectRatio="none">
        {/* Losango principal */}
        <line x1="50%" y1="10%" x2="90%" y2="50%" stroke="#8c44a8" strokeWidth="1.5" />
        <line x1="90%" y1="50%" x2="50%" y2="90%" stroke="#8c44a8" strokeWidth="1.5" />
        <line x1="50%" y1="90%" x2="10%" y2="50%" stroke="#8c44a8" strokeWidth="1.5" />
        <line x1="10%" y1="50%" x2="50%" y2="10%" stroke="#8c44a8" strokeWidth="1.5" />
        {/* Linha central vertical */}
        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#8c44a8" strokeWidth="1" strokeDasharray="5,5" />
      </svg>

      {/* Decoração Superior: Barra listrada */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 striped-bar rounded-b-md z-10 shadow-lg border-x-4 border-b-4 border-[#231236]"></div>

      {}
      <div className="relative z-20 w-11/12 max-w-lg mt-8 mb-20 flex flex-col items-center">
        
        {/* Pílula Superior Branca */}
        <div className="bg-white rounded-xl px-6 py-1.5 md:py-2 z-30 shadow-[0_4px_15px_rgba(0,0,0,0.3)] relative translate-y-1/2 border border-gray-100">
          <h2 className="text-black font-black uppercase text-xl md:text-2xl tracking-tighter m-0 font-condensed">
            QUAL É O CURSO?
          </h2>
        </div>

        {/* Caixa Magenta Principal */}
        <div className="bg-[#C042C7] w-full aspect-video min-h-[220px] md:min-h-[280px] flex items-center justify-center p-6 md:p-10 relative z-20 shadow-[0_10px_30px_rgba(192,66,199,0.4)]">
          
          {/* Texto do Curso */}
          <h1 className={`text-white text-5xl md:text-[5.5rem] font-black uppercase text-center leading-[0.9] tracking-tighter drop-shadow-md font-condensed transition-opacity duration-75 ${isSpinning ? 'opacity-80' : 'opacity-100'}`}>
            {displayTitle}
          </h1>

          {/* Emojis Absolutos */}
          <div className="absolute -top-6 -right-5 md:-top-8 md:-right-8 text-5xl md:text-7xl drop-shadow-xl z-40 hover:scale-110 transition-transform cursor-default">
            🤩
          </div>
          <div className="absolute -bottom-6 -left-5 md:-bottom-8 md:-left-8 text-5xl md:text-7xl drop-shadow-xl z-40 hover:scale-110 transition-transform cursor-default">
            💫
          </div>
        </div>

        {/* Pílula Inferior Branca (Botão) */}
        <button
          onClick={handleStart}
          disabled={isSpinning}
          className="bg-white rounded-xl px-10 py-2.5 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.4)] relative -translate-y-1/2 border border-gray-100 hover:bg-gray-50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed group"
        >
          <span className="text-black font-black uppercase text-2xl md:text-3xl tracking-tighter m-0 font-condensed group-hover:text-[#C042C7] transition-colors">
            {isSpinning ? 'SORTEANDO...' : 'COMEÇAR!'}
          </span>
        </button>

      </div>

      {}
      <footer className="absolute bottom-6 w-full px-6 md:px-12 flex justify-between items-end z-20">
        <img 
          src="/public/img/lumina.png" 
          alt="L.U.M.I.N.A" 
          className="h-6 md:h-8 object-contain drop-shadow-md" 
        />
        <img 
          src="/public/img/cest.png" 
          alt="CEST" 
          className="h-8 md:h-10 object-contain drop-shadow-md" 
        />
      </footer>

    </div>
  );
}