import { Link } from 'react-router-dom'
import logo from '../../assets/patrimonio info.png'
import useClock from '../../hooks/useClock'
import styles from './Navbar.module.css'

function Navbar() {
  const time = useClock()

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Harvard Art Museums" className={styles.logo} />
      </Link>
      <div className={styles.right}>
        <span className={styles.clock}>{time}</span>
        <Link to="/login" className={styles.loginBtn}>Login / Register</Link>
      </div>
    </nav>
  )
}

export default Navbar