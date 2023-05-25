import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'

// Components
import { Logo } from './Logo'
import MaxContainer from './MaxContainer'

const Header = () => {
  return (
    <header>
      <MaxContainer>
        <div className="header">
          <Link to="/" className="logo">
            <Logo />
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </MaxContainer>
    </header>
  )
}

export default Header
