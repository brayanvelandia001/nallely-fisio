import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa"

// Credenciales encriptadas (base64)
const ENCRYPTED_USER = "bmFsbGU="
const ENCRYPTED_PASSWORD = "aXJpc2JvbGl0YQ=="

function AdminLogin() {
  const [formData, setFormData] = useState({
    usuario: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // 👇 NUEVO
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    setTimeout(() => {
      const decryptedUser = atob(ENCRYPTED_USER)
      const decryptedPassword = atob(ENCRYPTED_PASSWORD)

      // ⚠️ VALIDACIÓN CAMPOS VACÍOS
      if (!formData.usuario || !formData.password) {
        setError("⚠️ Todos los campos son obligatorios")
        setLoading(false)
        return
      }

      // 🔐 VALIDACIÓN LOGIN
      if (
        formData.usuario.toLowerCase() === decryptedUser.toLowerCase() &&
        formData.password.toLowerCase() === decryptedPassword.toLowerCase()
      ) {
        setSuccess("✔ Acceso correcto")
        localStorage.setItem("adminAuth", "true")

        setTimeout(() => {
          navigate("/admin")
        }, 700)

      } else {
        setError("❌ Usuario o contraseña incorrectos")
      }

      setLoading(false)
    }, 700)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 relative overflow-hidden">

      {/* fondo glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.png"
            alt="logo"
            className="w-40 h-40 object-contain mb-3 drop-shadow-xl"
          />

          <h1 className="text-3xl font-bold text-white">
            Panel Admin
          </h1>

          <p className="text-gray-300 text-sm">
            Nallely Fisioterapia
          </p>
        </div>

        {/* MENSAJES */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USUARIO */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Usuario
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="Ingresa tu usuario"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Contraseña
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
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
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/30 transition"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-5">
          Acceso solo para personal autorizado
        </p>
      </motion.div>
    </div>
  )
}

export default AdminLogin