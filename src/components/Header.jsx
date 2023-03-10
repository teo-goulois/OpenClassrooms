import React from 'react'
import '../styles/header.scss'

// Components
import { Logo } from './Logo'
import MaxContainer from './MaxContainer'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <MaxContainer>
        <div className="header">
          <div className="logo">
            <Logo />
          </div>
          <nav>
            <ul>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </MaxContainer>
    </header>
  )
}

export default Header
