import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaArrowLeft, 
  FaCheck, 
  FaTimes, 
  FaCalendarAlt,
  FaClock,
  FaWhatsapp,
  FaPhone
} from "react-icons/fa"
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

function AdminCitas() {
  const navigate = useNavigate()
  
  // Leer citas de Firestore en tiempo real
  const [citas, setCitas] = useState([])

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

  const handleAprobar = async (id) => {
    try {
      const citaRef = doc(db, "citas", id)
      await updateDoc(citaRef, { estado: "aprobada" })
      console.log("Cita aprobada:", id)
    } catch (error) {
      console.error("Error al aprobar cita:", error)
      alert("Hubo un error al aprobar la cita.")
    }
  }

  const handleRechazar = async (id) => {
    try {
      const citaRef = doc(db, "citas", id)
      await updateDoc(citaRef, { estado: "rechazada" })
      console.log("Cita rechazada:", id)
    } catch (error) {
      console.error("Error al rechazar cita:", error)
      alert("Hubo un error al rechazar la cita.")
    }
  }

  const enviarWhatsApp = (telefono, nombre, fecha, hora) => {
    const mensaje = `Hola ${nombre}, tu cita para el ${fecha} a las ${hora} ha sido confirmada. Te esperamos en Nallely Fisioterapia.`
    // Limpiar el número: eliminar +, espacios y caracteres especiales
    const telefonoLimpio = telefono.replace(/[\s\+\-\(\)]/g, '')
    const url = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const getEstadoColor = (estado) => {
    switch(estado) {
      case "aprobada": return "bg-green-500/20 text-green-300 border-green-500/30"
      case "rechazada": return "bg-red-500/20 text-red-300 border-red-500/30"
      default: return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    }
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
              Gestión de Citas
            </h1>
            <p className="text-gray-300">
              Administra las solicitudes de citas
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {citas.map((cita, index) => (
            <motion.div
              key={cita.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* INFO PACIENTE */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      {cita.nombre}
                    </h3>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium border ${getEstadoColor(cita.estado)}`}>
                      {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <FaPhone size={16} />
                      <span>{cita.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt size={16} />
                      <span>{cita.fecha}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock size={16} />
                      <span>{cita.hora}</span>
                    </div>
                    <div>
                      <span className="font-medium text-cyan-400">{cita.servicio}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-400 italic">
                    "{cita.problema}"
                  </p>
                </div>

                {/* ACCIONES */}
                <div className="flex gap-3">
                  {cita.estado === "pendiente" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAprobar(cita.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
                      >
                        <FaCheck />
                        Aprobar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRechazar(cita.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
                      >
                        <FaTimes />
                        Rechazar
                      </motion.button>
                    </>
                  )}
                  
                  {cita.estado === "aprobada" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => enviarWhatsApp(cita.telefono, cita.nombre, cita.fecha, cita.hora)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
                    >
                      <FaWhatsapp />
                      Notificar
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminCitas
