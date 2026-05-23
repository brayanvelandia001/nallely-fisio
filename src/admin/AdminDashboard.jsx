import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaCalendarCheck, 
  FaUsers, 
  FaClock, 
  FaCog, 
  FaSignOutAlt,
  FaWhatsapp 
} from "react-icons/fa"

function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    navigate("/admin/login")
  }

  const menuItems = [
    {
      title: "Gestión de Citas",
      description: "Ver, aprobar y gestionar citas",
      icon: <FaCalendarCheck size={32} />,
      route: "/admin/citas",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Calendario",
      description: "Ver disponibilidad y agenda",
      icon: <FaClock size={32} />,
      route: "/admin/calendario",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Pacientes",
      description: "Historial y seguimiento",
      icon: <FaUsers size={32} />,
      route: "/admin/pacientes",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Configuración",
      description: "Horarios, servicios y más",
      icon: <FaCog size={32} />,
      route: "/admin/config",
      color: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
      {/* HEADER */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Panel de Administración
            </h1>
            <p className="text-gray-300">
              Nallely Fisioterapia
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-6 py-3 rounded-2xl transition"
          >
            <FaSignOutAlt />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.route)}
              className={`bg-gradient-to-br ${item.color} p-8 rounded-[30px] text-left shadow-2xl hover:shadow-xl transition-all duration-300`}
            >
              <div className="text-white mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/80">
                {item.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* WHATSAPP INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-6 flex items-center gap-4"
        >
          <div className="bg-green-500 p-4 rounded-2xl">
            <FaWhatsapp size={32} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Notificaciones WhatsApp Activas
            </h3>
            <p className="text-gray-300">
              Los pacientes recibirán confirmaciones automáticas por WhatsApp
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
