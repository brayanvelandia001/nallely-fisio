
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* LOGO */}
       <div className="flex items-center gap-4 cursor-pointer">

            <img
            src="/logo.png"
            alt="Nallely Fisio"
            className="w-32 md:w-36 object-contain drop-shadow-2xl hover:scale-105 transition duration-300"
            />


            </div>

        {/* MENU */}
        <ul className="hidden md:flex gap-10 text-gray-200 font-medium">

          <li className="hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-105">
            Inicio
          </li>

          <li className="hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-105">
            Servicios
          </li>

          <li className="hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-105">
            Sobre mí
          </li>

          <li className="hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-105">
            Testimonios
          </li>

          <li className="hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-105">
            Contacto
          </li>

        </ul>

        {/* BOTON */}
        <button 
          onClick={() => document.getElementById('agendar-cita').scrollIntoView({ behavior: 'smooth' })}
          className="hidden md:block bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 hover:shadow-cyan-500/30 transition duration-300 px-6 py-3 rounded-2xl text-white font-semibold shadow-2xl"
        >
          Reservar cita
        </button>

      </div>

    </nav>
  )
}

export default Navbar