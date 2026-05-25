import { motion } from "framer-motion"
import { FaQuoteLeft } from "react-icons/fa"

function Testimonios() {
  return (
    <section 
    id="Testimonios"
    className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-hidden">

      {/* GLOW */}
      <div className="absolute w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full top-10 left-10" />
      <div className="absolute w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full bottom-10 right-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center"
        >
          Testimonios de{" "}
          <span className="text-cyan-400">pacientes</span>
        </motion.h1>

        <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto">
          Personas reales que han mejorado su calidad de vida con nuestros tratamientos.
        </p>

        {/* GRID VIDEOS */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {/* TESTIMONIO 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition"
          >

            {/* quote icon */}
            <FaQuoteLeft className="text-cyan-400 text-2xl mb-4" />

            {/* VIDEO */}
            <div className="rounded-xl overflow-hidden border border-white/10">
              <video
                controls
                className="w-full h-[320px] object-cover"
              >
                <source src="/testimonio1.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
            </div>

            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              “Llegué con mucho dolor lumbar y en pocas sesiones ya tenía una gran mejoría.
              Excelente atención y profesionalismo.”
            </p>

            <p className="text-cyan-400 font-semibold mt-2 text-sm">
              — Paciente 1
            </p>

          </motion.div>

          {/* TESTIMONIO 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition"
          >

            <FaQuoteLeft className="text-cyan-400 text-2xl mb-4" />

            <div className="rounded-xl overflow-hidden border border-white/10">
              <video
                controls
                className="w-full h-[320px] object-cover"
              >
                <source src="/testimonio2.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
            </div>

            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              “Muy buena fisioterapeuta, explica todo y el trato es excelente.
              100% recomendada.”
            </p>

            <p className="text-cyan-400 font-semibold mt-2 text-sm">
              — Paciente 2
            </p>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default Testimonios