import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa"

// Credenciales encriptadas (base64)
// Usuario: nalle
// Password: irisbolita
const ENCRYPTED_USER = "bmFsbGU="
const ENCRYPTED_PASSWORD = "aXJpc2JvbGl0YQ=="

function AdminLogin() {
  const [formData, setFormData] = useState({
    usuario: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Desencriptar y verificar credenciales (case-insensitive)
    const decryptedUser = atob(ENCRYPTED_USER)
    const decryptedPassword = atob(ENCRYPTED_PASSWORD)
    
    if (formData.usuario.toLowerCase() === decryptedUser.toLowerCase() && 
        formData.password.toLowerCase() === decryptedPassword.toLowerCase()) {
      localStorage.setItem("adminAuth", "true")
      navigate("/admin")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 md:p-12 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Panel Admin
          </h1>
          <p className="text-gray-300">
            Nallely Fisioterapia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* USUARIO */}
          <div>
            <label className="block text-white font-medium mb-2">
              Usuario
            </label>
            <div className="relative">
              <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="usuario"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-white font-medium mb-2">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* BOTÓN */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-2xl shadow-xl hover:shadow-cyan-500/30 transition duration-300"
          >
            Iniciar Sesión
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Solo personal autorizado
        </p>
      </motion.div>
    </div>
  )
}

export default AdminLogin
