import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import usePatrimonio from '../../hooks/usePatrimonio'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from './BienDetailPage.module.css'



function BienDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchInformesPorBien } = usePatrimonio()
  const [bien, setBien] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return <LoadingSpinner />
  if (error) return <p style={{ color: '#fff', padding: '2rem' }}>{error}</p>

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>

      <div className={styles.content}>
        {/* Icono según tipo */}
        <div className={styles.iconBox}>
          <span className={styles.icon}>
            {bien.tipo === 'MUEBLE' ? '🏺' : '🏛️'}
          </span>
        </div>

        <div className={styles.info}>
          <span className={styles.tipoBadge}>{bien.tipo}</span>
          <h1 className={styles.title}>{bien.nombre}</h1>
          <p className={styles.field}><span>Ubicación:</span> {bien.ubicacion || '—'}</p>
          <p className={styles.field}><span>Fecha de ingreso:</span> {new Date(bien.fechaIngreso).toLocaleDateString('es-ES')}</p>
          {bien.descripcion && (
            <p className={styles.description}>{bien.descripcion}</p>
          )}
        </div>
      </div>

      {/* Informes asociados */}
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
                  <span className={`${styles.estadoBadge} ${styles[informe.estado.toLowerCase()]}`}>
                    {informe.estado.replace('_', ' ')}
                  </span>
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

                    <button
                    className={styles.newInformeBtn}
                    onClick={() => navigate(`/informe/nuevo?bienId=${bien.id}`)}
                    >
                   + Nuevo informe
                    </button>
                
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default BienDetailPage