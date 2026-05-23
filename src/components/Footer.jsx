import { useNavigate } from "react-router-dom"

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="py-10 text-center">
      FisioCare
      {/* Botón oculto para acceso al panel admin */}
      <button
        onClick={() => navigate("/admin/login")}
        className="fixed bottom-4 right-4 bg-cyan-500/20 hover:bg-cyan-500/40 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-30 hover:opacity-100 z-50"
        title="Acceso al panel de administración"
      >
        Admin
      </button>
    </footer>
  )
}

export default Footer