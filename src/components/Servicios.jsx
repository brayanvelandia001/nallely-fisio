import { useState } from "react"

import {
  FaHeartbeat,
  FaWater,
  FaBaby,
  FaRunning,
  FaWheelchair,
  FaUserNurse,
  FaDumbbell,
  FaWalking,
  FaHandsHelping,
  FaWhatsapp,
  FaTimes,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa"

const servicios = [
  {
    icon: <FaHeartbeat size={30} />,
    title: "Terapia Física Integral",
    category: "Área Clínica",
    tag: "Especializado",
    text: "Tratamientos personalizados para recuperar movilidad y bienestar.",
    description:
      "Diseñamos programas terapéuticos enfocados en disminuir dolor, mejorar movilidad y acelerar procesos de recuperación física.",
    benefits: [
      "Disminución del dolor",
      "Mejora de movilidad",
      "Recuperación funcional"
    ],
    duration: "60 min"
  },

  {
    icon: <FaWater size={30} />,
    title: "Terapia Acuática",
    category: "Terapias Especializadas",
    tag: "Alta demanda",
    text: "Rehabilitación terapéutica en medio acuático.",
    description:
      "Procesos terapéuticos en agua que reducen impacto articular y favorecen una recuperación más segura.",
    benefits: [
      "Menor impacto físico",
      "Relajación muscular",
      "Fortalecimiento progresivo"
    ],
    duration: "60 min"
  },

  {
    icon: <FaBaby size={30} />,
    title: "Estimulación Adecuada",
    category: "Área Infantil",
    tag: "Infantil",
    text: "Fortalecimiento del desarrollo infantil.",
    description:
      "Programas especializados enfocados en potenciar habilidades motoras y cognitivas en niños.",
    benefits: [
      "Desarrollo motor",
      "Estimulación cognitiva",
      "Mejor coordinación"
    ],
    duration: "60 min"
  },

  {
    icon: <FaRunning size={30} />,
    title: "Rehabilitación Deportiva",
    category: "Área Deportiva",
    tag: "Rendimiento",
    text: "Prevención y recuperación de lesiones deportivas.",
    description:
      "Tratamientos especializados para deportistas y personas físicamente activas.",
    benefits: [
      "Prevención de lesiones",
      "Recuperación rápida",
      "Mayor rendimiento"
    ],
    duration: "60 min"
  },

  {
    icon: <FaHandsHelping size={30} />,
    title: "Rehabilitación Post Quirúrgica",
    category: "Área Clínica",
    tag: "Recuperación",
    text: "Recuperación especializada después de cirugía.",
    description:
      "Acompañamiento terapéutico profesional para acelerar procesos post operatorios.",
    benefits: [
      "Disminución inflamatoria",
      "Recuperación muscular",
      "Mejor movilidad"
    ],
    duration: "60 min"
  },

  {
    icon: <FaWheelchair size={30} />,
    title: "Fisioterapia Neurológica",
    category: "Área Clínica",
    tag: "Especializado",
    text: "Tratamientos enfocados en sistema neurológico.",
    description:
      "Terapias enfocadas en mejorar equilibrio, coordinación y funciones motoras.",
    benefits: [
      "Mejor equilibrio",
      "Coordinación motora",
      "Mayor independencia"
    ],
    duration: "60 min"
  },

  {
    icon: <FaUserNurse size={30} />,
    title: "Fisioterapia Geriátrica",
    category: "Área Clínica",
    tag: "Adulto Mayor",
    text: "Atención integral para adultos mayores.",
    description:
      "Programas terapéuticos enfocados en movilidad, equilibrio y autonomía.",
    benefits: [
      "Prevención de caídas",
      "Mayor movilidad",
      "Bienestar físico"
    ],
    duration: "60 min"
  },

  {
    icon: <FaDumbbell size={30} />,
    title: "Entrenamiento Funcional",
    category: "Área Deportiva",
    tag: "Fitness",
    text: "Fortalecimiento y acondicionamiento físico.",
    description:
      "Rutinas adaptadas para mejorar resistencia, fuerza y estabilidad corporal.",
    benefits: [
      "Mayor resistencia",
      "Fortalecimiento muscular",
      "Mejor postura"
    ],
    duration: "60 min"
  },

  {
    icon: <FaWalking size={30} />,
    title: "Rehabilitación para Personas con Amputación",
    category: "Área Clínica",
    tag: "Especializado",
    text: "Adaptación y recuperación funcional.",
    description:
      "Tratamientos orientados a mejorar independencia, adaptación física y calidad de vida en personas con amputación.",
    benefits: [
      "Mayor independencia",
      "Adaptación funcional",
      "Mejor movilidad"
    ],
    duration: "60 min"
  }
]

function Servicios() {

  const [selectedService, setSelectedService] = useState(null)

  return (

    <section
      id="Servicios"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white"
    >

      {/* BLURS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 blur-[120px] rounded-full opacity-60" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[120px] rounded-full opacity-60" />

      {/* GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24">

          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-semibold text-sm mb-6 backdrop-blur-xl">
            Atención especializada
          </span>

          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Nuestros
            <span className="text-cyan-400"> Servicios</span>
          </h2>

          <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">
            Tratamientos enfocados en recuperación física,
            bienestar integral y mejora de la calidad de vida.
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {servicios.map((servicio, index) => (

            <div
              key={index}
              onClick={() => setSelectedService(servicio)}
              className="group relative cursor-pointer rounded-[32px] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-cyan-500/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500"
            >

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-white/5" />

              <div className="relative p-8 z-10">

                {/* CATEGORY + TAG */}
                <div className="flex items-center justify-between gap-3 mb-6">

                  <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold tracking-wide backdrop-blur-xl">
                    {servicio.category}
                  </span>

                  <span className="text-xs font-bold text-cyan-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {servicio.tag}
                  </span>

                </div>

                {/* ICON */}
                <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/30 mb-7 group-hover:scale-110 group-hover:rotate-3 transition duration-500">

                  {servicio.icon}

                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-black text-white mb-4 leading-snug">
                  {servicio.title}
                </h3>

                {/* TEXT */}
                <p className="text-gray-400 leading-relaxed text-[15px] mb-8">
                  {servicio.text}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between">

                  <span className="text-sm font-semibold text-gray-500">
                    {servicio.duration}
                  </span>

                  <div className="flex items-center gap-2 text-cyan-400 font-bold group-hover:translate-x-1 transition duration-300">

                    Ver más

                    <FaArrowRight />

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL */}
      {selectedService && (

        <div
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border border-white/10 max-w-2xl w-full rounded-[40px] overflow-hidden shadow-2xl animate-[fadeIn_.35s_ease]"
          >

            {/* TOP */}
            <div className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 p-10 text-white">

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 hover:bg-red-500 transition duration-300 flex items-center justify-center"
              >

                <FaTimes />

              </button>

              {/* ICON */}
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8">

                {selectedService.icon}

              </div>

              {/* CATEGORY */}
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-sm font-semibold mb-5">
                {selectedService.category}
              </span>

              {/* TITLE */}
              <h2 className="text-4xl font-black leading-tight">
                {selectedService.title}
              </h2>

              {/* SUBTEXT */}
              <div className="flex items-center gap-3 mt-4">

                <div className="w-2 h-2 rounded-full bg-white" />

                <span className="text-white/90 font-medium">
                  Sesión personalizada de 60 minutos
                </span>

              </div>

            </div>

            {/* CONTENT */}
            <div className="p-10">

              {/* DESCRIPTION */}
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                {selectedService.description}
              </p>

              {/* BENEFITS */}
              <div className="grid gap-4 mb-10">

                {selectedService.benefits.map((benefit, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                  >

                    <FaCheckCircle className="text-cyan-400 text-xl" />

                    <span className="font-medium text-gray-200">
                      {benefit}
                    </span>

                  </div>

                ))}

              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/573164334985?text=${encodeURIComponent(
                  `Hola Fisio Nallely, espero te encuentres muy bien. Estoy interesado(a) en agendar una valoración para el servicio de ${selectedService.title}. Quedo atento(a) a la información.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 hover:scale-[1.02] transition-all duration-300 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/20"
              >

                <FaWhatsapp size={24} />

                Agendar valoración

              </a>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}

export default Servicios