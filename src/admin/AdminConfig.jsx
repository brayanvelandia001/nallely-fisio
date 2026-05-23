import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaArrowLeft, 
  FaSave,
  FaClock,
  FaStethoscope,
  FaWhatsapp,
  FaPhone
} from "react-icons/fa"
import { FiPhone } from "react-icons/fi"

function AdminConfig() {
  const navigate = useNavigate()
  
  const [config, setConfig] = useState({
    nombreNegocio: "Nallely Fisioterapia",
    telefono: "+57 300 123 4567",
    whatsapp: "+57 300 123 4567",
    email: "contacto@nallelyfisio.com",
    horarioInicio: "09:00",
    horarioFin: "18:00",
    diasLaborales: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    servicios: [
      "Rehabilitación",
      "Fisioterapia deportiva",
      "Movilidad",
      "Masoterapia"
    ],
    intervaloCitas: 60 // minutos
  })

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value
    })
  }

  const handleServicioChange = (index, value) => {
    const nuevosServicios = [...config.servicios]
    nuevosServicios[index] = value
    setConfig({ ...config, servicios: nuevosServicios })
  }

  const agregarServicio = () => {
    setConfig({ ...config, servicios: [...config.servicios, ""] })
  }

  const eliminarServicio = (index) => {
    const nuevosServicios = config.servicios.filter((_, i) => i !== index)
    setConfig({ ...config, servicios: nuevosServicios })
  }

  const handleGuardar = () => {
    console.log("Configuración guardada:", config)
    alert("Configuración guardada exitosamente")
    // Aquí se guardaría en Firebase
  }

  const toggleDia = (dia) => {
    const nuevosDias = config.diasLaborales.includes(dia)
      ? config.diasLaborales.filter(d => d !== dia)
      : [...config.diasLaborales, dia]
    setConfig({ ...config, diasLaborales: nuevosDias })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
      {/* HEADER */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/admin")}
            className="text-white hover:text-cyan-400 transition"
          >
            <FaArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Configuración
            </h1>
            <p className="text-gray-300">
              Ajusta horarios, servicios y contacto
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={(e) => { e.preventDefault(); handleGuardar(); }} className="space-y-8">
          
          {/* INFO GENERAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaStethoscope />
              Información del Negocio
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  name="nombreNegocio"
                  value={config.nombreNegocio}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  name="email"
                  value={config.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                />
              </div>
            </div>
          </motion.div>

          {/* HORARIOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaClock />
              Horarios de Atención
            </h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    name="horarioInicio"
                    value={config.horarioInicio}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Hora Fin
                  </label>
                  <input
                    type="time"
                    name="horarioFin"
                    value={config.horarioFin}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Días Laborales
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
                    <motion.button
                      key={dia}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleDia(dia)}
                      className={`px-6 py-3 rounded-2xl transition ${
                        config.diasLaborales.includes(dia)
                          ? "bg-cyan-500 text-white"
                          : "bg-white/10 text-gray-400 hover:bg-white/20"
                      }`}
                    >
                      {dia}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Intervalo entre Citas (minutos)
                </label>
                <input
                  type="number"
                  name="intervaloCitas"
                  value={config.intervaloCitas}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                />
              </div>
            </div>
          </motion.div>

          {/* SERVICIOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaStethoscope />
                Servicios Ofrecidos
              </h3>
              <button
                type="button"
                onClick={agregarServicio}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl transition"
              >
                + Agregar
              </button>
            </div>
            
            <div className="space-y-4">
              {config.servicios.map((servicio, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={servicio}
                    onChange={(e) => handleServicioChange(index, e.target.value)}
                    className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                  />
                  {config.servicios.length > 1 && (
                    <button
                      type="button"
                      onClick={() => eliminarServicio(index)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl transition"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CONTACTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaWhatsapp />
              Contacto y Notificaciones
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="telefono"
                    value={config.telefono}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  WhatsApp (para notificaciones)
                </label>
                <div className="relative">
                  <FaWhatsapp className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={config.whatsapp}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* BOTÓN GUARDAR */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-5 rounded-2xl shadow-xl hover:shadow-cyan-500/30 transition duration-300 text-lg flex items-center justify-center gap-3"
          >
            <FaSave />
            Guardar Configuración
          </motion.button>

        </form>
      </div>
    </div>
  )
}

export default AdminConfig
