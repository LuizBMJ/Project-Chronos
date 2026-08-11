import { Link } from 'react-router'
import styles from './styles.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to='/about-pomodoro'>Entenda como funciona a técnica pomodoro 🍒</Link>
      <Link
        to='https://github.com/LuizBMJ/Project-Chronos'
        target='_blank'
        rel='noopener noreferrer'
      >
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤️
      </Link>
    </footer>
  )
}

export { Footer }
