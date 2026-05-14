import styles from './LoadingSpinner.module.css'

function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Cargando obras...</p>
    </div>
  )
}

export default LoadingSpinner