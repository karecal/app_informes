/*import { useState } from 'react'
import styles from './SearchBar.module.css'


function SearchBar({ filters, onFilterChange, onReset, classifications, cultures, departments }) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchRow}>
  <input
    type="text"
    placeholder="Buscar por título o autor..."
    value={filters.query}
    onChange={e => onFilterChange('query', e.target.value)}
    className={styles.input}
  />
  <button
    className={styles.filtersBtn}
    onClick={() => setFiltersOpen(!filtersOpen)}
  >
    Filtros {filtersOpen ? '▲' : '▼'}
  </button>
  <button
    className={styles.resetBtn}
    onClick={onReset}
    title="Resetear búsqueda"
  >
      ↺
  </button>
</div>

      {filtersOpen && (
        <div className={styles.panel}>
          <div className={styles.panelGrid}>

            <div className={styles.group}>
              <label className={styles.label}>Clasificación</label>
              <select
                value={filters.classification}
                onChange={e => onFilterChange('classification', e.target.value)}
                className={styles.select}
              >
                <option value="">Todas</option>
                {classifications.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Cultura</label>
              <select
                value={filters.culture}
                onChange={e => onFilterChange('culture', e.target.value)}
                className={styles.select}
              >
                <option value="">Todas</option>
                {cultures.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Departamento</label>
              <select
                value={filters.department}
                onChange={e => onFilterChange('department', e.target.value)}
                className={styles.select}
              >
                <option value="">Todos</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Ordenar por fecha</label>
              <select
                value={filters.sort}
                onChange={e => onFilterChange('sort', e.target.value)}
                className={styles.select}
              >
                <option value="">Sin orden</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Rango de años</label>
              <div className={styles.yearRange}>
                <input
                  type="number"
                  placeholder="Desde..."
                  value={filters.yearFrom}
                  onChange={e => onFilterChange('yearFrom', e.target.value)}
                  className={styles.yearInput}
                />
                <span className={styles.separator}>—</span>
                <input
                  type="number"
                  placeholder="Hasta..."
                  value={filters.yearTo}
                  onChange={e => onFilterChange('yearTo', e.target.value)}
                  className={styles.yearInput}
                />
              </div>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Con imagen</label>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  {filters.hasImage ? 'Solo con foto' : 'Todas las obras'}
                </span>
                <div
                  className={`${styles.toggle} ${filters.hasImage ? styles.toggleOn : ''}`}
                  onClick={() => onFilterChange('hasImage', !filters.hasImage)}
                >
                  <div className={styles.toggleThumb}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar */

import { useContext, useState } from 'react'
import { ArtContext } from '../../context/ArtContext'
import styles from './SearchBar.module.css'

function SearchBar({
  filters,
  onFilterChange,
  onReset,
  classifications,
  cultures,
  departments
}) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { setSubmittedQuery } = useContext(ArtContext)

  return (
    <div className={styles.wrapper}>

      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={filters.query}
          onChange={e => onFilterChange('query', e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setSubmittedQuery(filters.query)
            }
          }}
          className={styles.input}
        />

        <button
          className={styles.filtersBtn}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          Filtros {filtersOpen ? '▲' : '▼'}
        </button>

        <button
          className={styles.resetBtn}
          onClick={onReset}
          title="Resetear búsqueda"
        >
          ↺
        </button>
      </div>

      {filtersOpen && (
        <div className={styles.panel}>
          <div className={styles.panelGrid}>

            <div className={styles.group}>
              <label className={styles.label}>Clasificación</label>
              <select
                value={filters.classification}
                onChange={e => onFilterChange('classification', e.target.value)}
                className={styles.select}
              >
                <option value="">Todas</option>
                {classifications.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Cultura</label>
              <select
                value={filters.culture}
                onChange={e => onFilterChange('culture', e.target.value)}
                className={styles.select}
              >
                <option value="">Todas</option>
                {cultures.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Departamento</label>
              <select
                value={filters.department}
                onChange={e => onFilterChange('department', e.target.value)}
                className={styles.select}
              >
                <option value="">Todos</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Ordenar por fecha</label>
              <select
                value={filters.sort}
                onChange={e => onFilterChange('sort', e.target.value)}
                className={styles.select}
              >
                <option value="">Sin orden</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Rango de años</label>
              <div className={styles.yearRange}>
                <input
                  type="number"
                  placeholder="Desde..."
                  value={filters.yearFrom}
                  onChange={e => onFilterChange('yearFrom', e.target.value)}
                  className={styles.yearInput}
                />
                <span className={styles.separator}>—</span>
                <input
                  type="number"
                  placeholder="Hasta..."
                  value={filters.yearTo}
                  onChange={e => onFilterChange('yearTo', e.target.value)}
                  className={styles.yearInput}
                />
              </div>
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Con imagen</label>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  {filters.hasImage ? 'Solo con foto' : 'Todas las obras'}
                </span>
                <div
                  className={`${styles.toggle} ${filters.hasImage ? styles.toggleOn : ''}`}
                  onClick={() => onFilterChange('hasImage', !filters.hasImage)}
                >
                  <div className={styles.toggleThumb}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar