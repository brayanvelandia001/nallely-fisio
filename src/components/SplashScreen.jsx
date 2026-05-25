import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 5000) // ⏱️ 5 segundos

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* GLOW BACKGROUND */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

        {/* CONTENIDO */}
        <div className="relative flex flex-col items-center">

          {/* LOGO GRANDE PRO */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-56 h-56 flex items-center justify-center"
          >

            {/* ANILLO PRINCIPAL */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear"
              }}
            />

            {/* ANILLO INTERNO */}
            <motion.div
              className="absolute inset-6 rounded-full border border-blue-400/20"
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "linear"
              }}
            />

            {/* GLOW CENTRAL MÁS FUERTE */}
            <div className="absolute w-40 h-40 rounded-full bg-cyan-400/15 blur-3xl" />

            {/* LOGO GRANDE */}
            <motion.img
              src="/logo.png"
              alt="Logo"
              className="w-32 h-32 object-contain z-10 drop-shadow-[0_0_35px_rgba(34,211,238,0.6)]"
              animate={{
                scale: [1, 1.06, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* TEXTO */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-2xl tracking-[0.3em] text-cyan-300 font-semibold"
          >
            VELANDIA SOFT
          </motion.h1>

          <p className="text-gray-400 text-sm mt-2">
            Preparando experiencia premium...
          </p>

          {/* LOADER MEJORADO */}
          <div className="mt-10 w-80 h-[6px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3.8, ease: "easeInOut" }}
            />
          </div>

          {/* PUNTOS */}
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2.5 h-2.5 bg-cyan-400 rounded-full"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen