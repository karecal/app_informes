import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePatrimonio from '../../hooks/usePatrimonio'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from '../InformeFormPage/InformeFormPage.module.css'
import CustomSelect from '../../components/CustomSelect/CustomSelect'

const MUNICIPIOS = [
  'Agaete', 'Agüimes', 'Artenara', 'Arucas', 'Firgas', 'Gáldar',
  'Ingenio', 'La Aldea de San Nicolás', 'Las Palmas de Gran Canaria',
  'Mogán', 'Moya', 'San Bartolomé de Tirajana', 'Santa Brígida',
  'Santa Lucía de Tirajana', 'Santa María de Guía', 'Tejeda', 'Telde',
  'Teror', 'Valleseco', 'Valsequillo de Gran Canaria', 'Vega de San Mateo'
]

const TIPOS_PATRIMONIO = [
  { value: 'ARQUEOLOGICO', label: 'Arqueológico' },
  { value: 'ARQUITECTONICO', label: 'Arquitectónico' },
  { value: 'ARTISTICO', label: 'Artístico' },
  { value: 'DOCUMENTAL', label: 'Documental' },
  { value: 'ETNOGRAFICO', label: 'Etnográfico' },
  { value: 'INDUSTRIAL', label: 'Industrial' },
  { value: 'MUSICAL', label: 'Musical' }
]

const ESTILOS = [
  { value: 'ACADEMICISMO', label: 'Academicismo' },
  { value: 'BARROCO', label: 'Barroco' },
  { value: 'CLASICISMO', label: 'Clasicismo' },
  { value: 'ECLECTICISMO', label: 'Eclecticismo' },
  { value: 'FLAMENCO', label: 'Flamenco' },
  { value: 'GOTICO', label: 'Gótico' },
  { value: 'INDIGENISMO', label: 'Indigenismo' },
  { value: 'MODERNISMO', label: 'Modernismo' },
  { value: 'MUDEJAR', label: 'Mudéjar' },
  { value: 'NEOCANARIO', label: 'Neocanario' },
  { value: 'NEOCLASICO', label: 'Neoclásico' },
  { value: 'NEOGÓTICO', label: 'Neogótico' },
  { value: 'RACIONALISMO', label: 'Racionalismo' },
  { value: 'RENACIMIENTO', label: 'Renacimiento' },
  { value: 'ROMANTICISMO', label: 'Romanticismo' },
  { value: 'TRADICIONAL_POPULAR', label: 'Tradicional o popular' }
]

function BienEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchInformesPorBien, refetchBienes } = usePatrimonio()

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    municipio: '',
    tipoPatrimonio: '',
    estilo: '',
    ubicacion: '',
    descripcion: '',
    imagen: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const cargar = async () => {
      const data = await fetchInformesPorBien(id)
      if (!data) {
        setError('Bien no encontrado')
        setLoading(false)
        return
      }
      setForm({
        nombre: data.nombre || '',
        tipo: data.tipo || '',
        municipio: data.municipio || '',
        tipoPatrimonio: data.tipoPatrimonio || '',
        estilo: data.estilo || '',
        ubicacion: data.ubicacion || '',
        descripcion: data.descripcion || '',
        imagen: data.imagen || ''
      })
      setLoading(false)
    }
    cargar()
  }, [id])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.nombre || !form.tipo || !form.ubicacion) {
      setError('Nombre, tipo y ubicación son obligatorios')
      return
    }

    try {
      setSubmitting(true)
      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/bienes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al actualizar el bien')
      }

      refetchBienes()
      navigate(`/bien/${id}`, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p style={{ color: '#111', padding: '2rem' }}>{error}</p>

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>
      <h1 className={styles.title}>Editar bien patrimonial</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.field}>
          <label>Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de bien *</label>
          <CustomSelect
            value={form.tipo}
            onChange={(val) => setForm(prev => ({ ...prev, tipo: val }))}
            options={[
              { value: '', label: 'Selecciona un tipo' },
              { value: 'MUEBLE', label: 'Mueble' },
              { value: 'INMUEBLE', label: 'Inmueble' },
              { value: 'INMATERIAL', label: 'Inmaterial' },
            ]}
          />
        </div>

        <div className={styles.field}>
          <label>Municipio</label>
          <CustomSelect
            value={form.municipio}
            onChange={(val) => setForm(prev => ({ ...prev, municipio: val }))}
            options={[
              { value: '', label: 'Selecciona un municipio' },
              ...MUNICIPIOS.map(m => ({ value: m, label: m }))
            ]}
          />
        </div>

        <div className={styles.field}>
          <label>Tipo de patrimonio</label>
          <CustomSelect
            value={form.tipoPatrimonio}
            onChange={(val) => setForm(prev => ({ ...prev, tipoPatrimonio: val }))}
            options={[
              { value: '', label: 'Selecciona un tipo' },
              ...TIPOS_PATRIMONIO
            ]}
          />
        </div>

        <div className={styles.field}>
          <label>Estilo</label>
          <CustomSelect
            value={form.estilo}
            onChange={(val) => setForm(prev => ({ ...prev, estilo: val }))}
            options={[
              { value: '', label: 'Selecciona un estilo' },
              ...ESTILOS
            ]}
          />
        </div>

        <div className={styles.field}>
          <label>Ubicación *</label>
          <input
            type="text"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>URL de imagen</label>
          <input
            type="url"
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {form.imagen && (
            <img
              src={form.imagen}
              alt="Preview"
              style={{ marginTop: '0.5rem', width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px' }}
            />
          )}
        </div>

        <div className={styles.field}>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}

export default BienEditPage