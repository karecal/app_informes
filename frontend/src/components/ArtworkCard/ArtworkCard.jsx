import { useNavigate } from 'react-router-dom'
import styles from './ArtworkCard.module.css'

function ArtworkCard({ artwork }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/artwork/${artwork.id}`)
  }

  const imageUrl = artwork.primaryimageurl

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ border: '1px solid #222' }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={artwork.title} className={styles.image} />
      ) : (
        <div className={styles.noImage}>Sin imagen</div>
      )}
      <div className={styles.info}>
        <h3 className={styles.title}>{artwork.title}</h3>
        <p className={styles.culture}>{artwork.culture || 'Cultura desconocida'}</p>
        <p className={styles.date}>{artwork.dated || 'Fecha desconocida'}</p>
      </div>
    </div>
  )
}

export default ArtworkCard