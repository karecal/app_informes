import styles from './ContactPage.module.css'

function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.intro}>
          ¿Tienes alguna pregunta o necesitas acceso a la plataforma? Ponte en contacto con nosotros.
        </p>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Responsable del proyecto</h2>
          <p className={styles.name}>Denise Echegaray</p>
          <p className={styles.role}>Conservadora y restauradora de bienes culturales</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Email</h2>
          <a href="mailto:tu@email.com" className={styles.link}>denise.echegaray.de@gmail.com</a>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Ubicación</h2>
          <p>Gran Canaria, Islas Canarias, España</p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage