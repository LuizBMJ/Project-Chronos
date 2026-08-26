import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { Home } from '../../pages/Home'
import { AboutPomodoro } from '../../pages/AboutPomodoro'
import { History } from '../../pages/History'
import { NotFound } from '../../pages/NotFound'
import { useEffect } from 'react'
import { Settings } from '../../pages/Settings'

function MainRouterContent() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
      <Route path='/history/' element={<History />} />
      <Route path='/settings/' element={<Settings />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <MainRouterContent />
    </BrowserRouter>
  )
}
