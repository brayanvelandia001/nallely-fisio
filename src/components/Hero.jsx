import { motion } from "framer-motion"
import { FaWhatsapp, FaHeartbeat, FaArrowRight } from "react-icons/fa"
import { MdOutlineHealthAndSafety } from "react-icons/md"

function Hero() {

  const whatsappMessage = encodeURIComponent(
    "Hola Fisio Nallely 👋 Estoy interesado(a) en agendar una valoración fisioterapéutica. ¿Podrías brindarme más información?"
  )

  return (

    <section
      id="Inicio"
      className="relative min-h-screen pt-36 md:pt-40 lg:pt-44 pb-28 overflow-visible bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white flex items-center px-6"
    >

      {/* BACKGROUND BLURS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full opacity-60" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full opacity-60" />

      {/* GRID EFFECT */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-20 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          {/* BADGE */}
          <div className="flex items-center gap-3 mb-6">

            <span className="bg-cyan-500/15 border border-cyan-400/20 px-5 py-2 rounded-full text-sm text-cyan-300 flex items-center gap-2 backdrop-blur-md shadow-lg">

              <MdOutlineHealthAndSafety />

              Fisioterapia Profesional

            </span>

          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-7xl font-black leading-[0.95]">

            Recupera tu
            <br />

            <span className="text-cyan-400">
              movilidad
            </span>

            {" "}sin
            <br />

            dolor

          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-lg mt-8 leading-relaxed max-w-2xl">

            Atención fisioterapéutica personalizada enfocada en rehabilitación,
            recuperación muscular y bienestar integral para ayudarte a volver
            a sentirte bien y moverte con confianza.

          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-5 mt-12">

            {/* BUTTON PRIMARY */}
            <button
              onClick={() =>
                document
                  .getElementById("agendar-cita")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 flex items-center gap-3"
            >

              Reservar cita

              <FaArrowRight className="group-hover:translate-x-1 transition duration-300" />

            </button>

            {/* BUTTON WHATSAPP */}
            <a
              href={`https://wa.me/573164334985?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="border border-white/15 bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-300 px-8 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-md hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/10"
            >

              <FaWhatsapp
                className="text-green-400 animate-pulse"
                size={22}
              />

              Hablar por WhatsApp

            </a>

          </div>

          {/* INFO */}
          <div className="flex flex-wrap items-center gap-8 mt-8">

            <div className="flex items-center gap-2 text-cyan-300 text-sm">

              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              Citas disponibles hoy y mañana

            </div>

            <div className="flex items-center gap-2 text-gray-300 text-sm">

              <div className="w-2 h-2 rounded-full bg-green-400" />

              Atención en Bucaramanga

            </div>

          </div>

          {/* STATS */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-10 md:gap-14 mt-16">

            <div>

              <h2 className="text-4xl font-black text-cyan-400">
                +100
              </h2>

              <p className="text-gray-400 mt-1 whitespace-nowrap">
                Pacientes atendidos
              </p>

            </div>

            <div className="hidden md:block w-px h-14 bg-white/10" />

            <div>

              <h2 className="text-4xl font-black text-cyan-400">
                95%
              </h2>

              <p className="text-gray-400 mt-1 whitespace-nowrap">
                Satisfacción
              </p>

            </div>

            <div className="hidden md:block w-px h-14 bg-white/10" />

            <div>

              <h2 className="text-4xl font-black text-cyan-400">
                +5
              </h2>

              <p className="text-gray-400 mt-1 whitespace-nowrap">
                Especialidades
              </p>

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

          {/* WHATSAPP FLOAT */}
          <div className="absolute -top-6 -right-6 z-30 hidden lg:flex bg-slate-900/90 border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 items-center gap-3 shadow-2xl">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <div>

              <p className="text-sm font-semibold">
                WhatsApp activo
              </p>

              <span className="text-xs text-gray-400">
                Respuesta inmediata
              </span>

            </div>

          </div>

          {/* MAIN CARD */}
          <div className="relative bg-white/[0.07] border border-white/10 backdrop-blur-2xl rounded-[40px] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />

            {/* IMAGE */}
            <img
              src="/fisio.png"
              alt="Fisioterapeuta"
              className="rounded-[30px] object-cover object-top w-full h-[620px] md:h-[700px] hover:scale-[1.02] transition duration-700"
            />

            {/* OVERLAY */}
            <div className="absolute inset-5 rounded-[30px] bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

          </div>

          {/* FLOAT CARD */}
          <div className="absolute left-1/2 -bottom-5 -translate-x-1/2 bg-slate-900/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl w-[250px] hover:scale-105 transition duration-500 z-20">

            <div className="flex items-center gap-4">

              <div className="bg-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">

                <FaHeartbeat size={20} />

              </div>

              <div className="leading-tight">

                <h3 className="font-semibold text-sm">
                  Terapia personalizada
                </h3>

                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  Evaluación individual
                  en cada sesión
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  )
}

export default Hero