import styles from './Pagination.module.css'

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Anterior
      </button>

      <span className={styles.info}>
        Página {page} de {totalPages}
      </span>

      <button
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente →
      </button>
    </div>
  )
}

export default Pagination