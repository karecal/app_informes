import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import usePatrimonio from '../../hooks/usePatrimonio'
import styles from './InformeFormPage.module.css'

const materialVacio = { nombre: '', cantidad: '', proveedor: '' }

function InformeFormPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { bienes, fetchBienes, createInforme } = usePatrimonio()

  const [form, setForm] = useState({
    titulo: '',
    diagnostico: '',
    tratamiento: '',
    procedimientos: '',
    fechaInicio: '',
    bienId: searchParams.get('bienId') || ''
  })
  const [materiales, setMateriales] = useState([{ ...materialVacio }])
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchBienes()
  }, [])

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

    if (!form.titulo || !form.diagnostico || !form.tratamiento || !form.bienId || !form.fechaInicio) {
      setError('Por favor rellena todos los campos obligatorios')
      return
    }

    try {
      setSubmitting(true)
      const materialesFiltrados = materiales.filter(m => m.nombre.trim() !== '')
      await createInforme({ ...form, bienId: Number(form.bienId), materiales: materialesFiltrados })
      navigate(`/bien/${form.bienId}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>
      <h1 className={styles.title}>Nuevo informe de conservación</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* Bien patrimonial */}
        <div className={styles.field}>
          <label>Bien patrimonial *</label>
          <select name="bienId" value={form.bienId} onChange={handleChange} required>
            <option value="">Selecciona un bien</option>
            {bienes.map(b => (
              <option key={b.id} value={b.id}>{b.nombre}</option>
            ))}
          </select>
        </div>

        {/* Título */}
        <div className={styles.field}>
          <label>Título del informe *</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Ej: Restauración fase 1 — limpieza"
            required
          />
        </div>

        {/* Fecha inicio */}
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

        {/* Diagnóstico */}
        <div className={styles.field}>
          <label>Diagnóstico *</label>
          <textarea
            name="diagnostico"
            value={form.diagnostico}
            onChange={handleChange}
            rows={3}
            placeholder="Describe el estado actual del bien"
            required
          />
        </div>

        {/* Tratamiento */}
        <div className={styles.field}>
          <label>Tratamiento propuesto *</label>
          <textarea
            name="tratamiento"
            value={form.tratamiento}
            onChange={handleChange}
            rows={3}
            placeholder="Describe el tratamiento a realizar"
            required
          />
        </div>

        {/* Procedimientos */}
        <div className={styles.field}>
          <label>Procedimientos</label>
          <textarea
            name="procedimientos"
            value={form.procedimientos}
            onChange={handleChange}
            rows={3}
            placeholder="Pasos específicos del proceso"
          />
        </div>

        {/* Materiales */}
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
          {submitting ? 'Guardando...' : 'Crear informe'}
        </button>
      </form>
    </div>
  )
}

export default InformeFormPage