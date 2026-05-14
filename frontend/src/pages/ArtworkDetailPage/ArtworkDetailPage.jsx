import { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArtContext } from '../../context/ArtContext'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Modal from '../../components/Modal/Modal'
import styles from './ArtworkDetailPage.module.css'

function ArtworkDetailPage() {
  const { id } = useParams()
  const { artworks, loading } = useContext(ArtContext)
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  if (loading) return <LoadingSpinner />

  const artwork = artworks.find(a => a.id === parseInt(id))

  if (!artwork) return <p style={{ color: '#fff', padding: '2rem' }}>Obra no encontrada</p>

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>
      <div className={styles.content}>
        {artwork.primaryimageurl && (
          <img
            src={artwork.primaryimageurl}
            alt={artwork.title}
            className={styles.image}
            onClick={() => setModalOpen(true)}
          />
        )}
        <div className={styles.info}>
          <h1 className={styles.title}>{artwork.title}</h1>
          <p className={styles.field}><span>Cultura:</span> {artwork.culture || '—'}</p>
          <p className={styles.field}><span>Fecha:</span> {artwork.dated || '—'}</p>
          <p className={styles.field}><span>Técnica:</span> {artwork.technique || '—'}</p>
          <p className={styles.field}><span>Clasificación:</span> {artwork.classification || '—'}</p>
          <p className={styles.field}><span>Departamento:</span> {artwork.department || '—'}</p>
          {artwork.description && (
            <p className={styles.description}>{artwork.description}</p>
          )}
        </div>
      </div>

      {modalOpen && (
        <Modal
          imageUrl={artwork.primaryimageurl}
          title={artwork.title}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ArtworkDetailPage