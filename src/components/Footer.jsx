import React from 'react'
import '../styles/footer.scss'
import { Logo } from './Logo'

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <Logo />
      </div>
      <span>© 2020 Kasa. All rights reserved</span>
    </footer>
  )
}

export default Footer
