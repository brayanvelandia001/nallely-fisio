import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCommentMedical,
  FaBan,
  FaCheckCircle,
  FaWhatsapp
} from "react-icons/fa"

import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore"

import { db } from "../firebase/config"

const servicios = [
  "Terapia Física Integral",
  "Terapia Acuática",
  "Estimulación Adecuada",
  "Rehabilitación Deportiva",
  "Rehabilitación Post Quirúrgica",
  "Fisioterapia Neurológica",
  "Fisioterapia Geriátrica",
  "Entrenamiento Funcional",
  "Rehabilitación para Personas con Amputación"
]

const horarios = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
]

// GENERAR PRÓXIMOS 14 DÍAS
const generarDias = (citas, diasNoDisponibles) => {

  const dias = []

  const hoy = new Date()

  for (let i = 0; i < 14; i++) {

    const fecha = new Date(hoy)

    fecha.setDate(hoy.getDate() + i)

    const fechaStr = fecha.toISOString().split("T")[0]

    const citasDelDia = citas.filter(
      (cita) => cita.fecha === fechaStr
    )

    const esNoDisponible =
      diasNoDisponibles.includes(fechaStr)

    const horasOcupadas = citasDelDia.map(
      (cita) => cita.hora
    )

    dias.push({
      fecha: fechaStr,
      nombre: fecha.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short"
      }),
      completo: fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long"
      }),
      esNoDisponible,
      horasOcupadas
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

  const [diasDisponibles, setDiasDisponibles] =
    useState(generarDias([], []))

  const [citas, setCitas] = useState([])

  const [diasNoDisponibles, setDiasNoDisponibles] =
    useState([])

  const [showSuccess, setShowSuccess] = useState(false)

  // ACTUALIZAR DÍAS
  useEffect(() => {

    setDiasDisponibles(
      generarDias(citas, diasNoDisponibles)
    )

  }, [citas, diasNoDisponibles])

  // CARGAR CITAS
  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "citas"),
      (snapshot) => {

        const citasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setCitas(citasData)
      }
    )

    return () => unsubscribe()

  }, [])

  // CARGAR DÍAS NO DISPONIBLES
  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "diasNoDisponibles"),
      (snapshot) => {

        const diasData = snapshot.docs.map(
          (doc) => doc.data().fecha
        )

        setDiasNoDisponibles(diasData)
      }
    )

    return () => unsubscribe()

  }, [])

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    const telefonoFormateado =
      formData.telefono.startsWith("+")
        ? formData.telefono
        : `+57 ${formData.telefono}`

    try {

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

        setShowSuccess(true)

        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)

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

      console.error(error)

      console.error("Error al agendar:", error)

    }
  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (

    <section
      id="agendar-cita"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950"
    >

      {/* BLURS */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-5xl mx-auto relative z-10">

       {/* ALERTA SUCCESS */}
            {showSuccess && (

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
              >

                {/* FONDO OSCURO */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* CARD */}
                <div className="relative overflow-hidden bg-slate-900/90 border border-cyan-400/20 rounded-[32px] p-8 md:p-10 shadow-[0_20px_80px_rgba(6,182,212,0.35)] max-w-md w-full">

                  {/* GLOW */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 pointer-events-none" />

                  {/* ICONO */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 180
                    }}
                    className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_10px_40px_rgba(6,182,212,0.45)]"
                  >

                    <FaCheckCircle className="text-white text-5xl" />

                  </motion.div>

                  {/* TEXTO */}
                  <div className="relative text-center mt-8">

                    <h3 className="text-3xl font-black text-white">
                      ¡Cita agendada!
                    </h3>

                    <p className="text-gray-300 mt-4 leading-relaxed">
                      Tu solicitud fue enviada correctamente.
                      <br />
                      Te contactaremos pronto para confirmar tu cita.
                    </p>

                  </div>

                  {/* BARRA */}
                  <div className="relative mt-8 h-2 w-full bg-white/10 rounded-full overflow-hidden">

                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />

                  </div>

                </div>

              </motion.div>

            )}
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-6 backdrop-blur-xl">

            <FaCalendarAlt />

            Agenda tu valoración

          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">

            Reserva tu
            <span className="text-cyan-400">
              {" "}cita
            </span>

          </h2>

          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">

            Completa el formulario para agendar tu sesión
            de fisioterapia personalizada.

          </p>

        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden"
        >

          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />

          <form
            onSubmit={handleSubmit}
            className="space-y-10 relative z-10"
          >

            {/* DATOS */}
            <div>

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">

                <FaUser className="text-cyan-400" />

                Datos personales

              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                {/* NOMBRE */}
                <div>

                  <label className="block text-gray-300 mb-3 font-medium">
                    Nombre completo
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                  />

                </div>

                {/* TELÉFONO */}
                <div>

                  <label className="block text-gray-300 mb-3 font-medium">
                    Teléfono
                  </label>

                  <div className="relative">

                    <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="300 123 4567"
                      className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">

                  <label className="block text-gray-300 mb-3 font-medium">
                    Correo electrónico
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="correo@email.com"
                      className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* FECHAS */}
            <div>

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">

                <FaClock className="text-cyan-400" />

                Fecha y hora

              </h3>

              {/* DÍAS */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">

                {diasDisponibles.map((dia) => (

                  <motion.button
                    key={dia.fecha}
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={dia.esNoDisponible}
                    onClick={() =>
                      !dia.esNoDisponible &&
                      setFormData({
                        ...formData,
                        fecha: dia.fecha
                      })
                    }
                    className={`relative p-4 rounded-2xl border transition-all duration-300 ${
                      dia.esNoDisponible
                        ? "bg-red-500/10 border-red-500/20 text-red-300 opacity-60"
                        : formData.fecha === dia.fecha
                        ? "bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400 hover:bg-cyan-500/10"
                    }`}
                  >

                    <div className="text-sm font-semibold">
                      {dia.nombre}
                    </div>

                    {dia.esNoDisponible && (
                      <div className="absolute top-2 right-2">

                        <FaBan size={11} />

                      </div>
                    )}

                  </motion.button>

                ))}

              </div>

              {/* HORAS */}
              {formData.fecha && (

                <div className="mt-8">

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

                    {horarios.map((hora) => {

                      const diaSeleccionado =
                        diasDisponibles.find(
                          (d) =>
                            d.fecha === formData.fecha
                        )

                      const horaOcupada =
                        diaSeleccionado?.horasOcupadas?.includes(
                          hora
                        )

                      return (

                        <motion.button
                          key={hora}
                          type="button"
                          whileHover={{
                            scale: horaOcupada ? 1 : 1.04
                          }}
                          whileTap={{
                            scale: horaOcupada ? 1 : 0.95
                          }}
                          disabled={horaOcupada}
                          onClick={() =>
                            !horaOcupada &&
                            setFormData({
                              ...formData,
                              hora
                            })
                          }
                          className={`p-4 rounded-2xl border transition-all duration-300 ${
                            horaOcupada
                              ? "bg-red-500/10 border-red-500/20 text-red-300 opacity-50"
                              : formData.hora === hora
                              ? "bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                              : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400 hover:bg-cyan-500/10"
                          }`}
                        >

                          <div className="flex items-center justify-center gap-2">

                            <FaClock size={13} />

                            {hora}

                          </div>

                        </motion.button>
                      )
                    })}

                  </div>

                </div>

              )}

            </div>

            {/* SERVICIO */}
            <div>

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">

                <FaCommentMedical className="text-cyan-400" />

                Servicio

              </h3>

              <div className="space-y-6">

                {/* SELECT */}
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition"
                >

                  <option value="">
                    Selecciona un servicio
                  </option>

                  {servicios.map((servicio) => (

                    <option
                      key={servicio}
                      value={servicio}
                      className="bg-slate-900"
                    >
                      {servicio}
                    </option>

                  ))}

                </select>

                {/* TEXTAREA */}
                <textarea
                  name="problema"
                  value={formData.problema}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe tu lesión, dolor o situación..."
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 outline-none transition resize-none"
                />

              </div>

            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-3 gap-4">

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">

                <FaCheckCircle className="text-cyan-400 text-xl" />

                <span className="text-sm text-gray-300">
                  Confirmación rápida
                </span>

              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">

                <FaWhatsapp className="text-green-400 text-xl" />

                <span className="text-sm text-gray-300">
                  Atención vía WhatsApp
                </span>

              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">

                <FaCalendarAlt className="text-cyan-400 text-xl" />

                <span className="text-sm text-gray-300">
                  Agenda flexible
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_10px_40px_rgba(6,182,212,0.35)] hover:shadow-cyan-500/40 transition-all duration-300"
            >

              Agendar cita

            </motion.button>

          </form>

        </motion.div>

      </div>

    </section>
  )
}

export default AgendarCita