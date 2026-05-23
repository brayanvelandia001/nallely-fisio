import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaCommentMedical, FaBan } from "react-icons/fa"
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

const servicios = [
  "Rehabilitación",
  "Fisioterapia deportiva",
  "Movilidad",
  "Masoterapia"
]

const horarios = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00"
]

// Generar próximos 14 días
const generarDias = (citas, diasNoDisponibles) => {
  const dias = []
  const hoy = new Date()
  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy)
    fecha.setDate(hoy.getDate() + i)
    const fechaStr = fecha.toISOString().split('T')[0]
    
    // Obtener citas para este día
    const citasDelDia = citas.filter(cita => cita.fecha === fechaStr)
    
    // Verificar si el día está marcado como no disponible
    const esNoDisponible = diasNoDisponibles.includes(fechaStr)
    
    // Obtener horas ocupadas
    const horasOcupadas = citasDelDia.map(cita => cita.hora)
    
    dias.push({
      fecha: fechaStr,
      nombre: fecha.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
      completo: fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
      esNoDisponible,
      horasOcupadas,
    })
  }
  return dias
}

function AgendarCita() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    servicio: "",
    problema: ""
  })
  const [diasDisponibles, setDiasDisponibles] = useState(generarDias([], []))
  const [citas, setCitas] = useState([])
  const [diasNoDisponibles, setDiasNoDisponibles] = useState([])

  // Actualizar días disponibles cuando cambian las citas o días no disponibles
  useEffect(() => {
    setDiasDisponibles(generarDias(citas, diasNoDisponibles))
  }, [citas, diasNoDisponibles])

  // Cargar citas de Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "citas"), (snapshot) => {
      const citasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setCitas(citasData)
    })
    return () => unsubscribe()
  }, [])

  // Cargar días no disponibles de Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "diasNoDisponibles"), (snapshot) => {
      const diasData = snapshot.docs.map(doc => doc.data().fecha)
      setDiasNoDisponibles(diasData)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Agregar +57 automáticamente si no está presente
    const telefonoFormateado = formData.telefono.startsWith('+') 
      ? formData.telefono 
      : `+57 ${formData.telefono}`
    
    try {
      // Guardar cita en Firestore
      await addDoc(collection(db, "citas"), {
        nombre: formData.nombre,
        telefono: telefonoFormateado,
        email: formData.email,
        fecha: formData.fecha,
        hora: formData.hora,
        servicio: formData.servicio,
        problema: formData.problema,
        estado: "pendiente",
        fechaCreacion: serverTimestamp()
      })
      
      console.log("Cita guardada en Firestore")
      alert("¡Cita agendada con éxito! Te contactaremos pronto para confirmar.")
      
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        servicio: "",
        problema: ""
      })
    } catch (error) {
      console.error("Error al guardar cita:", error)
      alert("Hubo un error al agendar la cita. Por favor intenta nuevamente.")
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="agendar-cita" className="py-28 px-6 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Agenda tu Cita
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Completa el formulario y agenda tu sesión de fisioterapia. Te contactaremos para confirmar.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* DATOS PERSONALES */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaUser className="text-cyan-500" />
                Datos Personales
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* NOMBRE */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* TELÉFONO */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                      placeholder="300 123 4567"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Solo escribe tu número (ej: 300 123 4567)
                  </p>
                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FECHA Y HORA */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaCalendarAlt className="text-cyan-500" />
                Fecha y Hora
              </h3>

              {/* SELECCIÓN DE FECHA */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Selecciona una fecha *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {diasDisponibles.map((dia) => (
                    <motion.button
                      key={dia.fecha}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => !dia.esNoDisponible && setFormData({ ...formData, fecha: dia.fecha })}
                      disabled={dia.esNoDisponible}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 relative ${
                        dia.esNoDisponible
                          ? "bg-red-100 border-red-300 text-red-400 cursor-not-allowed opacity-60"
                          : formData.fecha === dia.fecha
                          ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                          : dia.horasOcupadas.length > 0
                          ? "bg-yellow-100 border-yellow-300 text-yellow-700 hover:border-yellow-400"
                          : "bg-white border-gray-200 hover:border-cyan-300 text-gray-700"
                      }`}
                    >
                      <div className="text-sm font-medium">{dia.nombre}</div>
                      {dia.horasOcupadas.length > 0 && (
                        <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {dia.horasOcupadas.length}
                        </div>
                      )}
                      {dia.esNoDisponible && (
                        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full">
                          <FaBan size={10} />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
                {formData.fecha && (
                  <p className="mt-3 text-cyan-600 font-medium">
                    Seleccionado: {diasDisponibles.find(d => d.fecha === formData.fecha)?.completo}
                  </p>
                )}
                {/* LEYENDA */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                    <span className="text-gray-600">Seleccionado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span className="text-gray-600">Con citas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                    <span className="text-gray-600">No disponible</span>
                  </div>
                </div>
              </div>

              {/* SELECCIÓN DE HORA */}
              {formData.fecha && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-gray-700 font-medium mb-3">
                    Selecciona una hora *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {horarios.map((hora) => {
                      const diaSeleccionado = diasDisponibles.find(d => d.fecha === formData.fecha)
                      const horaOcupada = diaSeleccionado?.horasOcupadas?.includes(hora)
                      
                      return (
                        <motion.button
                          key={hora}
                          type="button"
                          whileHover={{ scale: horaOcupada ? 1 : 1.05 }}
                          whileTap={{ scale: horaOcupada ? 1 : 0.95 }}
                          onClick={() => !horaOcupada && setFormData({ ...formData, hora })}
                          disabled={horaOcupada}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            horaOcupada
                              ? "bg-red-100 border-red-300 text-red-400 cursor-not-allowed opacity-60"
                              : formData.hora === hora
                              ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                              : "bg-white border-gray-200 hover:border-cyan-300 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FaClock size={14} />
                            <span className="font-medium">{hora}</span>
                          </div>
                          {horaOcupada && (
                            <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full">
                              <FaBan size={8} />
                            </div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* SERVICIO */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaCommentMedical className="text-cyan-500" />
                Servicio y Detalles
              </h3>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Tipo de servicio *
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition appearance-none bg-white"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio} value={servicio}>
                      {servicio}
                    </option>
                  ))}
                </select>
              </div>

              {/* DESCRIPCIÓN DEL PROBLEMA */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Describe tu problema o lesión *
                </label>
                <textarea
                  name="problema"
                  value={formData.problema}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition resize-none"
                  placeholder="Describe brevemente tu problema, dolor o lesión. Esto nos ayudará a prepararte mejor para tu sesión..."
                />
              </div>
            </div>

            {/* BOTÓN ENVIAR */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-5 rounded-2xl shadow-xl hover:shadow-cyan-500/30 transition duration-300 text-lg"
            >
              Agendar Cita
            </motion.button>

          </form>
        </motion.div>

      </div>
    </section>
  )
}

export default AgendarCita
