import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaArrowLeft, 
  FaChevronLeft, 
  FaChevronRight,
  FaPlus,
  FaMinus,
  FaCalendarCheck,
  FaBan
} from "react-icons/fa"
import { collection, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/config"

function AdminCalendario() {
  const navigate = useNavigate()
  const [mesActual, setMesActual] = useState(new Date())
  const [citas, setCitas] = useState([])
  const [diasNoDisponibles, setDiasNoDisponibles] = useState([])
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)
  
  // Horarios disponibles por defecto
  const [horariosDisponibles, setHorariosDisponibles] = useState([
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ])

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

  // Generar días del mes
  const generarDiasMes = () => {
    const dias = []
    const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1)
    const ultimoDia = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0)
    
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), i)
      const fechaStr = fecha.toISOString().split('T')[0]
      
      // Obtener citas para este día
      const citasDelDia = citas.filter(cita => cita.fecha === fechaStr)
      
      // Verificar si el día está marcado como no disponible
      const esNoDisponible = diasNoDisponibles.includes(fechaStr)
      
      dias.push({
        dia: i,
        fecha: fechaStr,
        diaSemana: fecha.toLocaleDateString('es-ES', { weekday: 'short' }),
        disponible: i >= new Date().getDate() && mesActual.getMonth() >= new Date().getMonth() && !esNoDisponible,
        esNoDisponible,
        citas: citasDelDia
      })
    }
    return dias
  }

  const diasMes = generarDiasMes()
  const nombreMes = mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  const mesAnterior = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1))
  }

  const mesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1))
  }

  const agregarHorario = () => {
    const ultimoHorario = horariosDisponibles[horariosDisponibles.length - 1]
    const [hora, minutos] = ultimoHorario.split(':')
    const nuevaHora = parseInt(hora) + 1
    if (nuevaHora <= 20) {
      setHorariosDisponibles([...horariosDisponibles, `${nuevaHora.toString().padStart(2, '0')}:${minutos}`])
    }
  }

  const eliminarHorario = (horario) => {
    setHorariosDisponibles(horariosDisponibles.filter(h => h !== horario))
  }

  const marcarDiaNoDisponible = async (fecha) => {
    try {
      if (diasNoDisponibles.includes(fecha)) {
        // Desmarcar como no disponible
        const docRef = doc(db, "diasNoDisponibles", fecha)
        await deleteDoc(docRef)
      } else {
        // Marcar como no disponible
        await setDoc(doc(db, "diasNoDisponibles", fecha), { fecha })
      }
    } catch (error) {
      console.error("Error al marcar día:", error)
      alert("Hubo un error al marcar el día.")
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
              Calendario de Disponibilidad
            </h1>
            <p className="text-gray-300">
              Gestiona tus horarios disponibles
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* NAVEGACIÓN MES */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={mesAnterior}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
          >
            <FaChevronLeft />
            Anterior
          </button>
          
          <h2 className="text-3xl font-bold text-white capitalize">
            {nombreMes}
          </h2>
          
          <button
            onClick={mesSiguiente}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
          >
            Siguiente
            <FaChevronRight />
          </button>
        </motion.div>

        {/* CALENDARIO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-4 md:p-8 mb-8"
        >
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia, index) => (
              <div key={index} className="text-center text-gray-400 font-medium mb-2 md:mb-4 text-xs md:text-sm">
                {dia}
              </div>
            ))}
            
            {diasMes.map((dia, index) => (
              <motion.div
                key={dia.fecha}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => marcarDiaNoDisponible(dia.fecha)}
                className={`p-2 md:p-4 rounded-xl md:rounded-2xl text-center transition-all cursor-pointer relative ${
                  dia.esNoDisponible
                    ? 'bg-red-500/30 text-white border-2 border-red-500'
                    : dia.citas.length > 0
                    ? 'bg-green-500/30 text-white border-2 border-green-500'
                    : dia.disponible
                    ? 'bg-cyan-500/20 text-white hover:bg-cyan-500/30'
                    : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-sm md:text-lg font-bold">{dia.dia}</div>
                <div className="text-xs md:text-sm">{dia.diaSemana}</div>
                {dia.citas.length > 0 && (
                  <div className="absolute top-1 right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {dia.citas.length}
                  </div>
                )}
                {dia.esNoDisponible && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full">
                    <FaBan size={12} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* LEYENDA */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500/20 rounded"></div>
              <span className="text-white text-sm">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/30 border-2 border-green-500 rounded"></div>
              <span className="text-white text-sm">Con citas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/30 border-2 border-red-500 rounded"></div>
              <span className="text-white text-sm">No disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500/20 rounded"></div>
              <span className="text-gray-400 text-sm">Pasado</span>
            </div>
          </div>
        </motion.div>

        {/* HORARIOS DISPONIBLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-4 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">
              Horarios Disponibles
            </h3>
            <button
              onClick={agregarHorario}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              <FaPlus />
              Agregar
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            {horariosDisponibles.map((horario, index) => (
              <motion.div
                key={horario}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/10 border border-white/20 px-3 md:px-4 py-2 rounded-xl flex items-center gap-2 md:gap-3"
              >
                <span className="text-white font-medium text-sm md:text-base">{horario}</span>
                <button
                  onClick={() => eliminarHorario(horario)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FaMinus size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CITAS DEL MES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-4 md:p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Citas del Mes
          </h3>
          {citas.filter(cita => {
            const citaFecha = new Date(cita.fecha)
            return citaFecha.getMonth() === mesActual.getMonth() && 
                   citaFecha.getFullYear() === mesActual.getFullYear()
          }).length === 0 ? (
            <p className="text-gray-400 text-center py-8">No hay citas para este mes</p>
          ) : (
            <div className="space-y-3">
              {citas
                .filter(cita => {
                  const citaFecha = new Date(cita.fecha)
                  return citaFecha.getMonth() === mesActual.getMonth() && 
                         citaFecha.getFullYear() === mesActual.getFullYear()
                })
                .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                .map((cita) => (
                  <div key={cita.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-white font-medium">{cita.nombre}</div>
                      <div className="text-gray-400 text-sm">{cita.fecha} - {cita.hora}</div>
                      <div className="text-gray-400 text-sm">{cita.servicio}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cita.estado === 'aprobada' ? 'bg-green-500/20 text-green-400' :
                      cita.estado === 'rechazada' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {cita.estado}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  )
}

export default AdminCalendario
