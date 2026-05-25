import { motion } from "framer-motion"
import { FaUserMd, FaHandsHelping, FaHeartbeat } from "react-icons/fa"
import { MdOutlineHealthAndSafety } from "react-icons/md"

function SobreMi() {
  return (
    <section 
    id="SobreMi"
    className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-hidden">

      {/* GLOW BACKGROUND */}
      <div className="absolute w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full top-10 right-10" />
      <div className="absolute w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full bottom-10 left-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center"
        >
          Sobre <span className="text-cyan-400">mí</span>
        </motion.h1>

        <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto">
          Conoce quién soy, mi experiencia y cómo puedo ayudarte a mejorar tu calidad de vida.
        </p>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div className="relative rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">

              <img
                src="/fisio2.png"
                alt="Fisioterapeuta Nallely"
                className="w-full h-[500px] object-cover object-top hover:scale-105 transition duration-700"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h2 className="text-3xl font-bold mb-4">
              Fisioterapeuta especializada en rehabilitación y bienestar
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Soy una profesional enfocada en la recuperación funcional del cuerpo,
              ayudando a personas a aliviar el dolor, mejorar su movilidad y
              recuperar su calidad de vida mediante tratamientos personalizados.
              <br /><br />
              Mi enfoque combina técnicas terapéuticas modernas con un trato humano,
              cercano y profesional para garantizar resultados reales en cada sesión.
            </p>

            {/* FEATURES */}
            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaUserMd className="text-cyan-400 text-xl" />
                <p className="text-gray-300">
                  Formación profesional en fisioterapia
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaHandsHelping className="text-cyan-400 text-xl" />
                <p className="text-gray-300">
                  Atención personalizada por paciente
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaHeartbeat className="text-cyan-400 text-xl" />
                <p className="text-gray-300">
                  Enfoque en rehabilitación y dolor muscular
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdOutlineHealthAndSafety className="text-cyan-400 text-xl" />
                <p className="text-gray-300">
                  Compromiso con tu bienestar y recuperación
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default SobreMi