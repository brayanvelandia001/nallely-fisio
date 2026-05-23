import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaArrowLeft, 
  FaChevronLeft, 
  FaChevronRight,
  FaPlus,
  FaMinus
} from "react-icons/fa"

function AdminCalendario() {
  const navigate = useNavigate()
  const [mesActual, setMesActual] = useState(new Date())
  
  // Horarios disponibles por defecto
  const [horariosDisponibles, setHorariosDisponibles] = useState([
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ])

  // Generar días del mes
  const generarDiasMes = () => {
    const dias = []
    const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1)
    const ultimoDia = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0)
    
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), i)
      dias.push({
        dia: i,
        fecha: fecha.toISOString().split('T')[0],
        diaSemana: fecha.toLocaleDateString('es-ES', { weekday: 'short' }),
        disponible: i >= new Date().getDate() && mesActual.getMonth() >= new Date().getMonth()
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
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8 mb-8"
        >
          <div className="grid grid-cols-7 gap-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia, index) => (
              <div key={index} className="text-center text-gray-400 font-medium mb-4">
                {dia}
              </div>
            ))}
            
            {diasMes.map((dia, index) => (
              <motion.div
                key={dia.fecha}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className={`p-4 rounded-2xl text-center transition-all ${
                  dia.disponible
                    ? 'bg-cyan-500/20 text-white hover:bg-cyan-500/30 cursor-pointer'
                    : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="text-lg font-bold">{dia.dia}</div>
                <div className="text-sm">{dia.diaSemana}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HORARIOS DISPONIBLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8"
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
          
          <div className="flex flex-wrap gap-3">
            {horariosDisponibles.map((horario, index) => (
              <motion.div
                key={horario}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl flex items-center gap-3"
              >
                <span className="text-white font-medium">{horario}</span>
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

      </div>
    </div>
  )
}

export default AdminCalendario
