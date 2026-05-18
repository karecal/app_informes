import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePatrimonio from '../../hooks/usePatrimonio'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from './InformeEditPage.module.css'
import CustomSelect from '../../components/CustomSelect/CustomSelect'

const materialVacio = { nombre: '', cantidad: '', proveedor: '' }

function InformeEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchInforme } = usePatrimonio()
  const { user, isAdmin } = useAuth()

  const [form, setForm] = useState({
    titulo: '',
    diagnostico: '',
    tratamiento: '',
    procedimientos: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'EN_CURSO'
  })
  const [materiales, setMateriales] = useState([{ ...materialVacio }])
  const [bienId, setBienId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const cargar = async () => {
      const data = await fetchInforme(id)
      if (!data) {
        setError('Informe no encontrado')
        setLoading(false)
        return
      }

      // Verificar permisos: admin ve todo, restaurador solo sus informes
      if (!isAdmin && data.restauradorId !== user?.id) {
        setError('No tienes permisos para editar este informe')
        setLoading(false)
        return
      }

      setBienId(data.bienId)
      setForm({
        titulo: data.titulo || '',
        diagnostico: data.diagnostico || '',
        tratamiento: data.tratamiento || '',
        procedimientos: data.procedimientos || '',
        fechaInicio: data.fechaInicio ? data.fechaInicio.split('T')[0] : '',
        fechaFin: data.fechaFin ? data.fechaFin.split('T')[0] : '',
        estado: data.estado || 'EN_CURSO'
      })
      setMateriales(data.materiales?.length > 0 ? data.materiales : [{ ...materialVacio }])
      setLoading(false)
    }
    cargar()
  }, [id])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleMaterialChange = (index, field, value) => {
    setMateriales(prev => prev.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    ))
  }

  const addMaterial = () => {
    setMateriales(prev => [...prev, { ...materialVacio }])
  }

  const removeMaterial = (index) => {
    setMateriales(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.titulo || !form.diagnostico || !form.tratamiento) {
      setError('Por favor rellena todos los campos obligatorios')
      return
    }

    try {
      setSubmitting(true)
      const token = localStorage.getItem('token')
      const materialesFiltrados = materiales.filter(m => m.nombre.trim() !== '')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/informes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, materiales: materialesFiltrados })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al actualizar')
      }

      navigate(`/bien/${bienId}`, { replace: true })
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
      <h1 className={styles.title}>Editar informe</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.field}>
          <label>Título del informe *</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Fecha de inicio *</label>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Fecha de fin</label>
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Estado</label>
          <CustomSelect
            value={form.estado}
            onChange={(val) => setForm(prev => ({ ...prev, estado: val }))}
            options={[
              { value: 'PENDIENTE', label: 'Pendiente' },
              { value: 'EN_CURSO', label: 'En curso' },
              { value: 'FINALIZADO', label: 'Finalizado' },
            ]}
          />
        </div>

        <div className={styles.field}>
          <label>Diagnóstico *</label>
          <textarea
            name="diagnostico"
            value={form.diagnostico}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Tratamiento propuesto *</label>
          <textarea
            name="tratamiento"
            value={form.tratamiento}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Procedimientos</label>
          <textarea
            name="procedimientos"
            value={form.procedimientos}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className={styles.materialesSection}>
          <div className={styles.materialesHeader}>
            <label>Materiales utilizados</label>
            <button type="button" onClick={addMaterial} className={styles.addBtn}>
              + Añadir material
            </button>
          </div>

          {materiales.map((m, i) => (
            <div key={i} className={styles.materialRow}>
              <input
                type="text"
                placeholder="Nombre"
                value={m.nombre}
                onChange={(e) => handleMaterialChange(i, 'nombre', e.target.value)}
              />
              <input
                type="text"
                placeholder="Cantidad"
                value={m.cantidad}
                onChange={(e) => handleMaterialChange(i, 'cantidad', e.target.value)}
              />
              <input
                type="text"
                placeholder="Proveedor"
                value={m.proveedor}
                onChange={(e) => handleMaterialChange(i, 'proveedor', e.target.value)}
              />
              {materiales.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMaterial(i)}
                  className={styles.removeBtn}
                >✕</button>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}

export default InformeEditPage