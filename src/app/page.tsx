'use client'

import { useState } from 'react'
import { motion, AnimatePresence} from 'framer-motion'

export default function HomePage() {
  const [frase, setFrase] = useState('Haz clic cuando estés listo 🌿');
  const [loading, setLoading] = useState(false);
  const [intensidad, setIntensidad] = useState(200)

  const bgClasses: Record<'50' | '100' | '200' | '300' | '400', string> = {
    50: 'from-rose-50 to-amber-50',
    100: 'from-rose-100 to-amber-100',
    200: 'from-rose-200 to-amber-200',
    300: 'from-rose-300 to-amber-300',
    400: 'from-rose-400 to-amber-400',
  }

  const bg = bgClasses[intensidad.toString() as keyof typeof bgClasses] || bgClasses['200']

  const generarFrase = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/frase');
      const data = await res.json();
      setFrase(data.frase || 'No pudimos generar frase esta vez, y está bien.');
    } catch {
      setFrase('Ocurrió un error al generar la frase, inténtalo más tarde');
    } finally {
      setLoading(false);
    }
  };

  const textColor = intensidad >= 300 ? 'text-white' : 'text-rose'

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br ${bg}`}>
      <div className="mb-6 text-center">
        <label className="text-sm text-rose-900 mb-2 block">Ajustar intensidad del fondo</label>
        <input
          type='range'
          min="50"
          max="400"
          step="50"
          value={intensidad}
          onChange={(e) => setIntensidad(Number(e.target.value))}
          className="w-64"
        />
      </div>
      <div className={`mt-6 w-full max-w-lg text-justify text-rose-700 italic p-8 ${textColor}`}>
        No estás sola. Este espacio es para ti, sin juicios, con calma. Tal vez alguna frase toque tu corazón ❤️
      </div>

      <div className="bg-rose-100 p-8 rounded-2xl shadow-md text-center max-w-lg w-full border border-rose-200">
        <h1 className="text-2xl md:text-3xl font-semibold text-rose-900 mb-6">
          🌿 Un respiro para tu mente
        </h1>

        <AnimatePresence mode="wait">
          <motion.p
            key={frase}
            initial={{ opacity: 0, y: 10}}
            animate={{ opacity:1, y: 0}}
            exit={{ opacity:0, y: -10 }}
            transition={{ duration: 0.5}}
            className="text-rose-800 text-lg italic mb-8 min-h-[80px] transition-all duration-300"
          >
            {frase}
          </motion.p>
        </AnimatePresence>

        <button
          onClick={generarFrase}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Tomando aire...' : 'Generar Frase'}
        </button>
      </div>

      <div className={`mt-6 w-full max-w-lg text-center text-rose-700 text-sm italic ${textColor}`}>
        Estás haciendo lo mejor que puedes. Eso es suficiente. ❤️
      </div>
    </main>
  );
}
