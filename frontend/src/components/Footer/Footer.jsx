import { Link, useLocation } from 'react-router-dom'
import styles from './Footer.module.css'
import Pagination from '../Pagination/Pagination'
import usePatrimonio from '../../hooks/usePatrimonio'

function Footer() {
  const location = useLocation()
  const { page, totalPages, setPage } = usePatrimonio()

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      {location.pathname === '/' && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      <div className={styles.map}>
        <iframe
          title="Gran Canaria"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190954.87!2d-15.5!3d27.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40a00e9339b3ed%3A0x10dc47668c9abb80!2sGran%20Canaria!5e0!3m2!1ses!2ses!4v1"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      <div className={styles.links}>
        <div className={styles.columnCentered}>
          <h4 className={styles.columnTitle}>Patrimonio Info</h4>
          <Link to="/about" className={styles.link}>Sobre el proyecto</Link>
          <Link to="/faq" className={styles.link}>Preguntas frecuentes</Link>
          <Link to="/contact" className={styles.link}>Contacto</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Patrimonio Info — Gestión del patrimonio cultural de Gran Canaria</p>
      </div>
    </footer>
  )
}

export default Footer