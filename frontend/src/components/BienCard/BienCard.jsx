import { useNavigate } from 'react-router-dom'
import styles from './BienCard.module.css'

function BienCard({ bien }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/bien/${bien.id}`)
  }

  const tipoBadgeColor = bien.tipo === 'MUEBLE' ? '#4a90d9' : '#7b5ea7'

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ border: '1px solid #222' }}
    >
      <div className={styles.noImage}>
        <span className={styles.tipoIcon}>
          {bien.tipo === 'MUEBLE' ? '🏺' : '🏛️'}
        </span>
      </div>
      <div className={styles.info}>
        <span
          className={styles.tipoBadge}
          style={{ backgroundColor: tipoBadgeColor }}
        >
          {bien.tipo}
        </span>
        <h3 className={styles.title}>{bien.nombre}</h3>
        <p className={styles.ubicacion}>📍 {bien.ubicacion}</p>
        <p className={styles.informes}>
          {bien.informes?.length ?? 0} informe(s)
        </p>
      </div>
    </div>
  )
}

export default BienCard