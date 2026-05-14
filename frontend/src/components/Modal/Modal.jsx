import styles from './Modal.module.css'

function Modal({ imageUrl, title, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
    </div>
  )
}

export default Modal