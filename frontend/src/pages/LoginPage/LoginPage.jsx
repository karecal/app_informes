import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.css'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {isLogin ? 'Iniciar sesión' : 'Crear Cuenta'}
        </h2>
        {!isLogin && (
  <p className={styles.subtitle}>Guarde sus colecciones y más</p>
)}
      

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre"
              className={styles.input}
              required
            />
            
          )}

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            required
          />
          {isLogin && (
  <p className={styles.forgot}>
    <span className={styles.forgotLink}>¿Olvidaste tu contraseña?</span>
  </p>
)}
          <button type="submit" className={styles.button}>
            {isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        <p className={styles.toggle}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <span
            className={styles.toggleLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage