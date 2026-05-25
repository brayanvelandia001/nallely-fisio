import { motion } from "framer-motion"
import { FaSpa, FaHeartbeat, FaRunning, FaHandsHelping } from "react-icons/fa"
import { MdOutlineHealthAndSafety } from "react-icons/md"

const beneficios = [
  {
    icon: <FaSpa />,
    title: "Relajación profunda",
    desc: "Reduce tensión muscular y estrés acumulado.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Mejora circulación",
    desc: "Activa el flujo sanguíneo y acelera la recuperación.",
  },
  {
    icon: <FaRunning />,
    title: "Rehabilitación funcional",
    desc: "Recupera movilidad, fuerza y confianza al moverte.",
  },
  {
    icon: <MdOutlineHealthAndSafety />,
    title: "Prevención de lesiones",
    desc: "Fortalece tu cuerpo y evita recaídas o molestias.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Atención personalizada",
    desc: "Cada sesión se adapta completamente a ti.",
  },
]

function Beneficios() {
  return (
    <section 
    id = "beneficios"
    className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-hidden">

      {/* GLOW igual al Hero */}
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
          Beneficios de la{" "}
          <span className="text-cyan-400">Fisioterapia</span>
        </motion.h1>

        <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto">
          Tratamientos diseñados para mejorar tu movilidad, aliviar el dolor y devolverte bienestar.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

          {beneficios.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all hover:shadow-cyan-500/10"
            >

              {/* ICON */}
              <div className="text-3xl text-cyan-400 mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* small glow line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-400/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition" />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Beneficios