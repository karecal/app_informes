import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.map}>
        <iframe
          title="Harvard Art Museums"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.0!2d-71.1143!3d42.3743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3774b6ad0e0ef%3A0xfb2b5f9f4e6b0b0!2sHarvard%20Art%20Museums!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      <div className={styles.links}>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>El Museo</h4>
          <Link to="/about" className={styles.link}>Sobre nosotros</Link>
          <Link to="/team" className={styles.link}>Equipo</Link>
          <Link to="/faq" className={styles.link}>Preguntas frecuentes</Link>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contacto</h4>
          <Link to="/contact" className={styles.link}>Contacto</Link>
          <Link to="/newsletter" className={styles.link}>Newsletter</Link>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Visítanos</h4>
          <p className={styles.text}>32 Quincy St</p>
          <p className={styles.text}>Cambridge, MA 02138</p>
          <p className={styles.text}>Estados Unidos</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 President and Fellows of Harvard College</p>
      </div>
    </footer>
  )
}

export default Footer