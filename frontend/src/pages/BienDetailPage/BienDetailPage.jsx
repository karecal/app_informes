import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import usePatrimonio from '../../hooks/usePatrimonio'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from './BienDetailPage.module.css'
import { useAuth } from '../../hooks/useAuth'

const TIPO_PATRIMONIO_LABEL = {
  ARQUEOLOGICO: 'Arqueológico', ARQUITECTONICO: 'Arquitectónico', ARTISTICO: 'Artístico',
  DOCUMENTAL: 'Documental', ETNOGRAFICO: 'Etnográfico', INDUSTRIAL: 'Industrial', MUSICAL: 'Musical'
}

const ESTILO_LABEL = {
  ACADEMICISMO: 'Academicismo', BARROCO: 'Barroco', CLASICISMO: 'Clasicismo',
  ECLECTICISMO: 'Eclecticismo', FLAMENCO: 'Flamenco', GOTICO: 'Gótico',
  INDIGENISMO: 'Indigenismo', MODERNISMO: 'Modernismo', MUDEJAR: 'Mudéjar',
  NEOCANARIO: 'Neocanario', NEOCLASICO: 'Neoclásico', NEOGÓTICO: 'Neogótico',
  RACIONALISMO: 'Racionalismo', RENACIMIENTO: 'Renacimiento', ROMANTICISMO: 'Romanticismo',
  TRADICIONAL_POPULAR: 'Tradicional o popular'
}

const TIPO_BIEN_LABEL = { MUEBLE: 'Mueble', INMUEBLE: 'Inmueble', INMATERIAL: 'Inmaterial' }

const toDisplay = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ') : '—'

function BienDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchInformesPorBien, refetchBienes } = usePatrimonio()
  const [bien, setBien] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated, isAdmin, user } = useAuth()


  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      const data = await fetchInformesPorBien(id)
      if (data) setBien(data)
      else setError('Bien no encontrado')
      setLoading(false)
    }
    cargar()
  }, [id])

  const handleDeleteInforme = async (informeId) => {
    if (!window.confirm('¿Seguro que quieres eliminar este informe?')) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/informes/${informeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Error al eliminar')

      const data = await fetchInformesPorBien(id)
      if (data) setBien(data)
    } catch (err) {
      alert('Error al eliminar el informe')
    }
  }
  const handleDeleteBien = async () => {
  if (!window.confirm(`¿Seguro que quieres eliminar "${bien.nombre}"? Se eliminarán también todos sus informes.`)) return

  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${import.meta.env.VITE_API_URL}/bienes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Error al eliminar')
    
    refetchBienes()
    navigate('/')
  } catch (err) {
    alert('Error al eliminar el bien')
  }
}

  if (loading) return <LoadingSpinner />
  if (error) return <p style={{ color: '#111', padding: '2rem' }}>{error}</p>

  return (
    <div className={styles.container}>
      
      <div className={styles.topActions}>
        <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>
        {isAdmin && (
          <div className={styles.adminActions}>
            <button className={styles.editBienBtn} onClick={() => navigate(`/bien/${id}/editar`)}>
              ✏️ Editar bien
            </button>
            <button className={styles.deleteBienBtn} onClick={handleDeleteBien}>
              🗑️ Eliminar bien
            </button>
          </div>
        )}
      </div>
      

      <div className={styles.content}>
        <div className={styles.iconBox}>
          {bien.imagen ? (
            <img src={bien.imagen} alt={bien.nombre} className={styles.bienImage} />
          ) : (
            <span className={styles.icon}>
              {bien.tipo === 'MUEBLE' ? '🏺' : bien.tipo === 'INMUEBLE' ? '🏛️' : '🎭'}
            </span>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{bien.nombre}</h1>
          <p className={styles.field}><span>Ubicación:</span> {bien.ubicacion || '—'}</p>
          <p className={styles.field}><span>Municipio:</span> {bien.municipio || '—'}</p>
          <p className={styles.field}><span>Fecha de ingreso:</span> {new Date(bien.fechaIngreso).toLocaleDateString('es-ES')}</p>
          <p className={styles.field}><span>Tipo de bien:</span> {TIPO_BIEN_LABEL[bien.tipo] || toDisplay(bien.tipo)}</p>
          <p className={styles.field}><span>Tipo de patrimonio:</span> {TIPO_PATRIMONIO_LABEL[bien.tipoPatrimonio] || toDisplay(bien.tipoPatrimonio)}</p>
          <p className={styles.field}><span>Estilo:</span> {ESTILO_LABEL[bien.estilo] || toDisplay(bien.estilo)}</p>
          {bien.descripcion && (
            <p className={styles.field}><span>Descripción:</span> {bien.descripcion}</p>
          )}
        </div>
      </div>

      <section className={styles.informesSection}>
        <h2 className={styles.informesTitle}>Informes de conservación</h2>

        {bien.informes?.length === 0 ? (
          <p className={styles.noInformes}>No hay informes registrados para este bien.</p>
        ) : (
          <div className={styles.informesList}>
            {bien.informes?.map((informe) => (
              <div key={informe.id} className={styles.informeCard}>
                <div className={styles.informeHeader}>
                  <h3 className={styles.informeTitulo}>{informe.titulo}</h3>
                  <div className={styles.informeActions}>
                    <span className={`${styles.estadoBadge} ${styles[informe.estado.toLowerCase()]}`}>
                     {informe.estado.replace('_', ' ')}
                    </span>
                    {(isAdmin || informe.restaurador?.id === user?.id) && (
                     <button
                     className={styles.editBtn}
                      onClick={() => navigate(`/informe/${informe.id}/editar`)}
                          >
                            ✏️
                        </button>
                              )}
                      {(isAdmin || informe.restaurador?.id === user?.id) && (
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteInforme(informe.id)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                </div>
                <p className={styles.informeField}>
                  <span>Restaurador:</span> {informe.restaurador?.nombre || '—'}
                </p>
                <p className={styles.informeField}>
                  <span>Inicio:</span> {new Date(informe.fechaInicio).toLocaleDateString('es-ES')}
                </p>
                {informe.fechaFin && (
                  <p className={styles.informeField}>
                    <span>Fin:</span> {new Date(informe.fechaFin).toLocaleDateString('es-ES')}
                  </p>
                )}
                <p className={styles.informeField}><span>Diagnóstico:</span> {informe.diagnostico}</p>
                <p className={styles.informeField}><span>Tratamiento:</span> {informe.tratamiento}</p>

                {informe.materiales?.length > 0 && (
                  <div className={styles.materiales}>
                    <p className={styles.materialesTitle}>Materiales usados:</p>
                    <ul>
                      {informe.materiales.map((m) => (
                        <li key={m.id}>{m.nombre} — {m.cantidad} {m.proveedor ? `(${m.proveedor})` : ''}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {isAuthenticated && (
        <button
          className={styles.newInformeBtn}
          onClick={() => navigate(`/informe/nuevo?bienId=${bien.id}`)}
        >
          + Nuevo informe
        </button>
      )}
    </div>
  )
}

export default BienDetailPage