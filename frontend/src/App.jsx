import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PatrimonioProvider } from './context/PatrimonioContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

// Páginas
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import AboutPage from './pages/AboutPage/AboutPage'
import TeamPage from './pages/TeamPage/TeamPage'
import FaqPage from './pages/FaqPage/FaqPage'
import ContactPage from './pages/ContactPage/ContactPage'
import NewsletterPage from './pages/NewsletterPage/NewsletterPage'
import BienDetailPage from './pages/BienDetailPage/BienDetailPage'
import InformeFormPage from './pages/InformeFormPage/InformeFormPage'


function App() {
  return (
    <AuthProvider>
      <PatrimonioProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/bien/:id" element={<BienDetailPage />} />
          <Route path="/informe/nuevo" element={<InformeFormPage />} />

          
          {/* Protegidas - próximamente */}
          {/* <Route path="/bien/:id" element={<ProtectedRoute><BienDetailPage /></ProtectedRoute>} /> */}
          {/* <Route path="/informe/new" element={<ProtectedRoute><InformeFormPage /></ProtectedRoute>} /> */}
          {/* <Route path="/dashboard" element={<ProtectedRoute requiredRole="admin"><DashboardPage /></ProtectedRoute>} /> */}

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </PatrimonioProvider>
    </AuthProvider>
  )
}

export default App