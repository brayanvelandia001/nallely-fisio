import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaShieldAlt
} from "react-icons/fa"

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

      // VALIDACIÓN CAMPOS
      if (!formData.usuario || !formData.password) {

        setError("⚠️ Todos los campos son obligatorios")
        setLoading(false)

        return
      }

      // VALIDACIÓN LOGIN
      if (
        formData.usuario.toLowerCase() === decryptedUser.toLowerCase() &&
        formData.password.toLowerCase() === decryptedPassword.toLowerCase()
      ) {

        setSuccess("✔ Acceso correcto")

        localStorage.setItem("adminAuth", "true")

        setTimeout(() => {
          navigate("/admin")
        }, 800)

      } else {

        setError("❌ Usuario o contraseña incorrectos")
      }

      setLoading(false)

    }, 900)
  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (

    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 relative overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 opacity-[0.06]">

        <img
          src="/fisio-bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />

      </div>

      {/* BLURS */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[120px]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-slate-900/70 backdrop-blur-2xl border border-cyan-500/10 rounded-[34px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
      >

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 left-5 flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition duration-300"
        >

          <FaArrowLeft />

          Volver

        </button>

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">

          <div className="relative flex items-center justify-center mb-2">

            {/* Glow suave */}
            <div className="absolute w-28 h-28 bg-cyan-400/15 blur-2xl rounded-full" />

            {/* Fondo elegante */}
            <div className="relative w-32 h-32 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

              <img
                src="/logo.png"
                alt="logo"
                className="w-24 h-24 object-contain drop-shadow-[0_6px_18px_rgba(255,255,255,0.15)]"
              />

            </div>

          </div>

          <div className="flex items-center gap-2 mt-4 mb-2">

            <FaShieldAlt className="text-cyan-400" />

            <span className="text-cyan-300 text-sm font-medium tracking-[3px]">
              ACCESO PRIVADO
            </span>

          </div>

          <h1 className="text-3xl font-black text-white text-center">
            Panel Administrativo
          </h1>

          <p className="text-gray-400 text-sm mt-2 text-center leading-relaxed">
            Inicia sesión para administrar el sistema de Fisio Nallely
          </p>

        </div>

        {/* MENSAJES */}
        {error && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm text-center"
          >
            {error}
          </motion.div>

        )}

        {success && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm text-center"
          >
            {success}
          </motion.div>

        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* USER */}
          <div>

            <label className="text-sm text-gray-300 mb-2 block font-medium">
              Usuario
            </label>

            <div className="relative group">

              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition" />

              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-300"
                placeholder="Ingresa tu usuario"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm text-gray-300 mb-2 block font-medium">
              Contraseña
            </label>

            <div className="relative group">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-300"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
              >

                {showPassword ? <FaEyeSlash /> : <FaEye />}

              </button>

            </div>

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_10px_40px_rgba(6,182,212,0.35)] hover:shadow-cyan-500/40 transition-all duration-300"
          >

            {loading ? "Ingresando..." : "Iniciar Sesión"}

          </motion.button>

        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">

          <p className="text-xs text-gray-500">
            Acceso exclusivo para personal autorizado
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">

            <span>
              Desarrollado por
            </span>

            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold tracking-wide">
              Velandia Soft
            </span>

          </div>

        </div>

      </motion.div>

    </div>
  )
}

export default AdminLogin