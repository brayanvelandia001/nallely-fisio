import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaArrowLeft, 
  FaSearch,
  FaFileMedical,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt
} from "react-icons/fa"

function AdminPacientes() {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState("")
  
  // Pacientes - se cargarán desde Firebase
  const [pacientes, setPacientes] = useState([])

  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.telefono.includes(busqueda)
  )

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
              Gestión de Pacientes
            </h1>
            <p className="text-gray-300">
              Historial y seguimiento de pacientes
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* BUSCADOR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, email o teléfono..."
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
            />
          </div>
        </motion.div>

        {/* LISTA DE PACIENTES */}
        <div className="space-y-6">
          {pacientesFiltrados.map((paciente, index) => (
            <motion.div
              key={paciente.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                
                {/* INFO PRINCIPAL */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-cyan-500 p-3 rounded-2xl">
                      <FaFileMedical size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {paciente.nombre}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <FaPhone size={16} />
                      <span>{paciente.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope size={16} />
                      <span>{paciente.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt size={16} />
                      <span>Última cita: {paciente.ultimaCita}</span>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-medium">
                        {paciente.citas} citas totales
                      </span>
                    </div>
                  </div>
                </div>

                {/* NOTAS */}
                <div className="md:w-1/3">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h4 className="text-white font-medium mb-2">Notas</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {paciente.notas}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {pacientesFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-xl">
              No se encontraron pacientes
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPacientes
