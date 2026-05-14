import styles from './ContactPage.module.css'

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensaje enviado. Nos pondremos en contacto contigo pronto.')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.intro}>
          ¿Tienes alguna pregunta o comentario? Estaremos encantados de atenderte.
        </p>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <h2 className={styles.subtitle}>Dirección</h2>
              <p>32 Quincy Street</p>
              <p>Cambridge, MA 02138</p>
              <p>Estados Unidos</p>
            </div>
            <div className={styles.infoBlock}>
              <h2 className={styles.subtitle}>Teléfono</h2>
              <p>+1 (617) 495-9400</p>
            </div>
            <div className={styles.infoBlock}>
              <h2 className={styles.subtitle}>Email</h2>
              <p>am_info@harvard.edu</p>
            </div>
            <div className={styles.infoBlock}>
              <h2 className={styles.subtitle}>Horario de atención</h2>
              <p>Martes a domingo</p>
              <p>10:00 — 17:00 h</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
              <label className={styles.label}>Nombre</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} required />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Asunto</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Mensaje</label>
              <textarea className={styles.textarea} rows="5" required />
            </div>
            <button type="submit" className={styles.button}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage