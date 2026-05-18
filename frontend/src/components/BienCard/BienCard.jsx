import { useNavigate } from 'react-router-dom'
import styles from './BienCard.module.css'

function BienCard({ bien }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/bien/${bien.id}`)
  }

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ border: '1px solid #222' }}
    >
      {bien.imagen ? (
        <img src={bien.imagen} alt={bien.nombre} className={styles.image} />
      ) : (
        <div className={styles.noImage}>
          <span className={styles.tipoIcon}>
            {bien.tipo === 'MUEBLE' ? '🏺' : bien.tipo === 'INMUEBLE' ? '🏛️' : '🎭'}
          </span>
        </div>
      )}
      <div className={styles.info}>
        <h3 className={styles.title}>{bien.nombre}</h3>
        <p className={styles.ubicacion}>📍 {bien.ubicacion}</p>
        <p className={styles.informes}>
          {bien._count?.informes ?? 0} informe(s)
        </p>
      </div>
    </div>
  )
}

export default BienCard