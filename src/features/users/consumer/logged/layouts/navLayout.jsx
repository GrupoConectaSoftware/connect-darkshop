import { useEffect, useRef, useState } from 'react'
import MainNavLayout from '../../homepages/layouts/navLayout'
import NavegationComponent from '../components/navegationComponent'
import UserMenuTrigger from '../components/UserMenuTrigger'

export default function NavLayout() {
  const [isOpen, setIsOpen] = useState(false)
  const closeTimer = useRef(null)

  const openMenu = () => {
    window.clearTimeout(closeTimer.current)
    setIsOpen(true)
  }
  const closeMenu = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setIsOpen(false), 150)
  }
  const closeImmediately = () => {
    window.clearTimeout(closeTimer.current)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleEscape = (event) => { if (event.key === 'Escape') closeImmediately() }
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.clearTimeout(closeTimer.current)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return <>
    <MainNavLayout
      loggedVariant
      loggedUserControl={<UserMenuTrigger isOpen={isOpen} onMouseEnter={openMenu} onMouseLeave={closeMenu} onClick={() => (isOpen ? closeImmediately() : openMenu())} />}
    />
    <NavegationComponent isOpen={isOpen} onMouseEnter={openMenu} onMouseLeave={closeMenu} onClose={closeImmediately} />
  </>
}
