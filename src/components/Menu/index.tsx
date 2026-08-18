import { HouseIcon, HistoryIcon, SettingsIcon, SunIcon, MoonIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

type AvailableThemes = 'dark' | 'light'

function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme = (localStorage.getItem('theme') as AvailableThemes) || 'dark'
    return savedTheme
  })

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  function handleToggleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      return newTheme
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className={styles.menu}>
      <Link to='/' className={styles.menuLink} aria-label='Ir para Home' title='Home'>
        <HouseIcon />
      </Link>
      <Link
        to='/history/'
        className={styles.menuLink}
        aria-label='Ir para Histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </Link>
      <Link
        to='/settings/'
        className={styles.menuLink}
        aria-label='Ir para Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </Link>
      <Link
        to='#'
        className={styles.menuLink}
        id='theme-toggle'
        aria-label='Mudar Tema'
        title='Tema'
        onClick={handleToggleTheme}
      >
        {nextThemeIcon[theme]}
      </Link>
    </div>
  )
}

export { Menu }
