function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-cyan-500/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="absolute right-0 top-0 w-60 h-60 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center relative z-10">

        {/* LOGO */}
        <div
          onClick={() =>
            document.getElementById("Inicio")?.scrollIntoView({
              behavior: "smooth"
            })
          }
          className="flex items-center gap-4 cursor-pointer"
        >

          <img
            src="/logo.png"
            alt="Nallely Fisio"
            className="w-32 md:w-36 object-contain drop-shadow-[0_10px_30px_rgba(34,211,238,0.35)] hover:scale-105 transition duration-300"
          />

        </div>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-10 text-gray-300 font-medium">

          <li
            onClick={() =>
              document.getElementById("Inicio")?.scrollIntoView({
                behavior: "smooth"
              })
            }
            className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-105 relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Inicio
          </li>

          <li
            onClick={() =>
              document.getElementById("Servicios")?.scrollIntoView({
                behavior: "smooth"
              })
            }
            className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-105 relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Servicios
          </li>

          <li
            onClick={() =>
              document.getElementById("SobreMi")?.scrollIntoView({
                behavior: "smooth"
              })
            }
            className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-105 relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Sobre mí
          </li>

          <li
            onClick={() =>
              document.getElementById("Testimonios")?.scrollIntoView({
                behavior: "smooth"
              })
            }
            className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-105 relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Testimonios
          </li>

          <li
            onClick={() =>
              document.getElementById("Footer")?.scrollIntoView({
                behavior: "smooth"
              })
            }
            className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-105 relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Contacto
          </li>

        </ul>

        {/* BUTTON */}
        <button
          onClick={() =>
            document.getElementById("agendar-cita")?.scrollIntoView({
              behavior: "smooth"
            })
          }
          className="hidden md:flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 transition-all duration-300 px-7 py-3 rounded-2xl text-white font-semibold shadow-[0_10px_30px_rgba(6,182,212,0.35)] hover:shadow-cyan-500/40"
        >

          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10m-13 9h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v11a2 2 0 002 2z"
            />
          </svg>

          Reservar cita

        </button>

      </div>

    </nav>
  )
}

export default Navbar