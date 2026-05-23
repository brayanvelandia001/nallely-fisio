import {
  FaHeartbeat,
  FaDumbbell,
  FaRunning,
  FaSpa
} from "react-icons/fa"

const servicios = [
  {
    icon: <FaHeartbeat size={35} />,
    title: "Rehabilitación",
    text: "Tratamientos personalizados para recuperación física."
  },

  {
    icon: <FaDumbbell size={35} />,
    title: "Fisioterapia deportiva",
    text: "Prevención y recuperación de lesiones deportivas."
  },

  {
    icon: <FaRunning size={35} />,
    title: "Movilidad",
    text: "Mejora de postura, flexibilidad y movimiento."
  },

  {
    icon: <FaSpa size={35} />,
    title: "Masoterapia",
    text: "Relajación muscular y alivio del dolor."
  }
]

function Servicios() {
  return (
    <section className="py-28 px-6 bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-bold text-gray-800">
            Servicios
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            Atención integral enfocada en tu bienestar físico.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {servicios.map((servicio, index) => (

            <div
              key={index}
              className="bg-gradient-to-b from-white to-emerald-50 p-10 rounded-[30px] shadow-lg hover:-translate-y-3 transition duration-500"
            >

              <div className="text-emerald-500 mb-6">
                {servicio.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {servicio.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {servicio.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Servicios