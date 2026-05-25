import { useNavigate } from "react-router-dom"

import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaSignInAlt
} from "react-icons/fa"

function Footer() {

  const navigate = useNavigate()

  return (

    <footer 
    id="Footer"
    className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white pt-24 pb-10 px-6">

      {/* BACKGROUND BLURS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full opacity-60" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full opacity-60" />

      {/* GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP */}
        <div className="grid md:grid-cols-3 gap-16 border-b border-white/10 pb-16">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-5 mb-7">

              {/* LOGO */}
              <div className="w-24 h-24 rounded-[28px] bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden p-3">

                <img
                  src="/logo.png"
                  alt="Fisio Nallely"
                  className="w-full h-full object-contain scale-110"
                />

              </div>

              {/* TEXT */}
              <div>

                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  Fisio Nallely
                </h2>

                <p className="text-cyan-400 font-medium text-sm mt-1">
                  Fisioterapia & Bienestar
                </p>

              </div>

            </div>

            <p className="text-gray-300 leading-relaxed max-w-sm text-[15px]">
              Atención profesional enfocada en recuperación física,
              rehabilitación y bienestar integral para mejorar tu calidad de vida.
            </p>

          </div>

          {/* LINKS */}
          <div>

            <h3 className="text-xl font-bold mb-7 text-white">
              Navegación
            </h3>

            <div className="flex flex-col gap-5 text-gray-400">

              <button
                onClick={() => document.getElementById("Inicio")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-cyan-400 transition duration-300 hover:translate-x-1"
              >
                Inicio
              </button>

              <button
                onClick={() => document.getElementById("Servicios")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-cyan-400 transition duration-300 hover:translate-x-1"
              >
                Servicios
              </button>

              <button
                onClick={() => document.getElementById("SobreMi")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-cyan-400 transition duration-300 hover:translate-x-1"
              >
                Nosotros
              </button>

              <button
                onClick={() => document.getElementById("Footer")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-cyan-400 transition duration-300 hover:translate-x-1"
              >
                Contacto
              </button>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-bold mb-7 text-white">
              Contacto
            </h3>

            <div className="flex flex-col gap-6">

              {/* WHATSAPP */}
              <a
                href="https://wa.me/573164334985"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 text-gray-400 hover:text-cyan-400 transition duration-300"
              >

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition duration-300">

                  <FaWhatsapp className="text-xl" />

                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    WhatsApp
                  </p>

                  <span className="font-medium">
                    +57 316 433 4985
                  </span>
                </div>

              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/fisio.nalle/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 text-gray-400 hover:text-pink-400 transition duration-300"
              >

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pink-500/20 transition duration-300">

                  <FaInstagram className="text-xl" />

                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Instagram
                  </p>

                  <span className="font-medium">
                    @fisio.nalle
                  </span>
                </div>

              </a>

              {/* LOCATION */}
              <a
                href="https://www.google.com/maps/place/Bucaramanga,+Santander"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 text-gray-400 hover:text-cyan-400 transition duration-300"
              >

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition duration-300">

                  <FaMapMarkerAlt className="text-xl" />

                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Ubicación
                  </p>

                  <span className="font-medium">
                    Bucaramanga, Santander
                  </span>
                </div>

              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Fisio Nallely. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500">

            <span>
              Diseñado y desarrollado por
            </span>

            <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent font-bold tracking-wide">
              Velandia Soft
            </span>

          </div>

        </div>

      </div>

      {/* ADMIN LOGIN BUTTON */}
      <button
        onClick={() => navigate("/admin/login")}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-2xl bg-white/10 hover:bg-cyan-500/20 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-cyan-300 hover:text-white flex items-center justify-center shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-110 z-50"
        title="Iniciar sesión"
      >

        <FaSignInAlt className="text-xl" />

      </button>

    </footer>

  )
}

export default Footer