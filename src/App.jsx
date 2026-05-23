import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Servicios from "./components/Servicios"
import SobreMi from "./components/SobreMi"
import Beneficios from "./components/Beneficios"
import Testimonios from "./components/Testimonios"
import AgendarCita from "./components/AgendarCita"
import WhatsappFloat from "./components/WhatsappFloat"
import Footer from "./components/Footer"
import AdminLogin from "./admin/AdminLogin"
import AdminDashboard from "./admin/AdminDashboard"
import AdminCitas from "./admin/AdminCitas"
import AdminCalendario from "./admin/AdminCalendario"
import AdminPacientes from "./admin/AdminPacientes"
import AdminConfig from "./admin/AdminConfig"

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true"
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal - sitio público */}
        <Route path="/" element={
          <div className="overflow-hidden bg-white">
            <Navbar />
            <Hero />
            <Servicios />
            <SobreMi />
            <Beneficios />
            <Testimonios />
            <AgendarCita />
            <Footer />
            <WhatsappFloat />
          </div>
        } />

        {/* Rutas de administración */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/citas" element={
          <ProtectedRoute>
            <AdminCitas />
          </ProtectedRoute>
        } />
        <Route path="/admin/calendario" element={
          <ProtectedRoute>
            <AdminCalendario />
          </ProtectedRoute>
        } />
        <Route path="/admin/pacientes" element={
          <ProtectedRoute>
            <AdminPacientes />
          </ProtectedRoute>
        } />
        <Route path="/admin/config" element={
          <ProtectedRoute>
            <AdminConfig />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App