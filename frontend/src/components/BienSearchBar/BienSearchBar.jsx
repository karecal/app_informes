import styles from './BienSearchBar.module.css'
import CustomSelect from '../CustomSelect/CustomSelect'

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

const TIPOS_BIEN = [
  { value: '', label: 'Todos' },
  { value: 'MUEBLE', label: 'Mueble' },
  { value: 'INMUEBLE', label: 'Inmueble' },
  { value: 'INMATERIAL', label: 'Inmaterial' },
]

const MUNICIPIOS_OPTS = [
  { value: '', label: 'Todos' },
  ...MUNICIPIOS.map(m => ({ value: m, label: m }))
]

const TIPOS_PATRIMONIO_OPTS = [
  { value: '', label: 'Todos' },
  ...TIPOS_PATRIMONIO
]

const ESTILOS_OPTS = [
  { value: '', label: 'Todos' },
  ...ESTILOS
]

function BienSearchBar({ filters, onFilterChange, onReset }) {
  return (
    <div className={styles.container}>
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Buscar por nombre o descripción del bien..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className={styles.searchInput}
        />
        <button onClick={onReset} className={styles.resetBtn}>
          Limpiar filtros
        </button>
      </div>

      <div className={styles.filtersGrid}>
        <div className={styles.filterGroup}>
          <label>Tipo de bien</label>
          <CustomSelect
            value={filters.tipo}
            onChange={(val) => onFilterChange({ tipo: val })}
            options={TIPOS_BIEN}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Municipio</label>
          <CustomSelect
            value={filters.municipio}
            onChange={(val) => onFilterChange({ municipio: val })}
            options={MUNICIPIOS_OPTS}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Tipo de patrimonio</label>
          <CustomSelect
            value={filters.tipoPatrimonio}
            onChange={(val) => onFilterChange({ tipoPatrimonio: val })}
            options={TIPOS_PATRIMONIO_OPTS}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Estilo</label>
          <CustomSelect
            value={filters.estilo}
            onChange={(val) => onFilterChange({ estilo: val })}
            options={ESTILOS_OPTS}
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Informes desde</label>
          <input
            type="number"
            min="1900"
            max="2100"
            placeholder="Ej: 2020"
            value={filters.anioDesde}
            onChange={(e) => onFilterChange({ anioDesde: e.target.value })}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Informes hasta</label>
          <input
            type="number"
            min="1900"
            max="2100"
            placeholder="Ej: 2024"
            value={filters.anioHasta}
            onChange={(e) => onFilterChange({ anioHasta: e.target.value })}
            className={styles.dateInput}
          />
        </div>
      </div>
    </div>
  )
}

export default BienSearchBar