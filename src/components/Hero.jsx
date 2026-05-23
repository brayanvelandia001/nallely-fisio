import { motion } from "framer-motion"
import { FaWhatsapp, FaHeartbeat } from "react-icons/fa"
import { MdOutlineHealthAndSafety } from "react-icons/md"

function Hero() {
  return (
    <section className="relative min-h-screen pt-24 md:pt-28 lg:pt-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white flex items-center px-6">
      {/* BACKGROUND BLURS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full opacity-60"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-24 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          {/* BADGE */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-cyan-500/20 border border-cyan-400/20 px-4 py-2 rounded-full text-sm text-cyan-300 flex items-center gap-2">
              <MdOutlineHealthAndSafety />
              Fisioterapia Profesional
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Recupera tu
            <span className="text-cyan-400"> movilidad </span>
            sin dolor
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-lg mt-8 leading-relaxed max-w-xl">
            Evaluación personalizada, terapia manual y rehabilitación avanzada
            para acelerar tu recuperación y mejorar tu calidad de vida.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-5 mt-12">

            <button 
              onClick={() => document.getElementById('agendar-cita').scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-500 hover:bg-cyan-600 active:scale-95 transition px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/30 hover:scale-105"
            >
              Reservar cita
            </button>

            <button className="border border-white/20 hover:bg-white/10 active:scale-95 transition px-8 py-4 rounded-2xl flex items-center gap-3">
              <FaWhatsapp className="animate-pulse" size={22} />
              Hablar por WhatsApp
            </button>

          </div>

          {/* URGENCY */}
          <p className="text-cyan-300 text-sm mt-6">
            📅 Citas disponibles hoy y mañana
          </p>

          {/* STATS */}
          <div className="flex gap-14 mt-16">

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">+100</h2>
              <p className="text-gray-400">Pacientes en recuperación</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-cyan-400">95%</h2>
              <p className="text-gray-400">Satisfacción de pacientes</p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          <div className="relative bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] p-5 shadow-2xl">

            {/* IMAGE */}
            <img
              src="/fisio.png"
              alt="Fisioterapeuta"
              className="rounded-[30px] object-cover object-top w-full h-[600px] md:h-[650px] hover:scale-[1.02] transition duration-700"
            />

            {/* OVERLAY GRADIENT */}
            <div className="absolute inset-5 rounded-[30px] bg-gradient-to-t from-slate-950/30 to-transparent"></div>

          </div>

          {/* FLOAT CARD (FUERA DE LA IMAGEN) */}           
           <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 bg-slate-900/80 border border-white/10 rounded-xl p-3 backdrop-blur-xl shadow-2xl w-[200px] hover:scale-105 transition duration-500">

                <div className="flex items-center gap-3">

                    <div className="bg-cyan-500 p-2.5 rounded-xl flex items-center justify-center">
                    <FaHeartbeat size={18} />
                    </div>

                    <div className="leading-tight">
                    <h3 className="font-semibold text-sm">Terapia personalizada</h3>
                    <p className="text-gray-400 text-xs">Evaluación en cada sesión</p>
                    </div>

                </div>

                </div>

        </motion.div>

      </div>
    </section>
  )
}

export default Hero