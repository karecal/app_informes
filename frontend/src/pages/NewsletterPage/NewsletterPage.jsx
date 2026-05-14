import { useState } from 'react'
import styles from './NewsletterPage.module.css'

const interests = [
  'Arte Europeo',
  'Arte Asiático',
  'Arte Contemporáneo',
  'Arte Islámico',
  'Fotografía',
  'Escultura',
  'Grabado',
  'Exposiciones temporales',
  'Eventos y conferencias',
  'Publicaciones'
]

function NewsletterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selected, setSelected] = useState([])

  const handleToggle = (interest) => {
    setSelected(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <h1 className={styles.title}>¡Gracias por suscribirte!</h1>
          <p className={styles.intro}>
            Recibirás nuestras novedades en tu correo electrónico.
            Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Newsletter</h1>
        <p className={styles.intro}>
          Suscríbete a nuestra newsletter y recibe las últimas noticias 
          sobre exposiciones, eventos y adquisiciones del Harvard Art Museums.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.group}>
              <label className={styles.label}>Nombre</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Apellidos</label>
              <input type="text" className={styles.input} required />
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} required />
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Frecuencia</label>
            <select className={styles.select}>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
            </select>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Mis intereses</label>
            <div className={styles.interests}>
              {interests.map(interest => (
                <button
                  key={interest}
                  type="button"
                  className={`${styles.tag} ${selected.includes(interest) ? styles.tagSelected : ''}`}
                  onClick={() => handleToggle(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Suscribirme
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsletterPage