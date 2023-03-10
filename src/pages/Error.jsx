import React from 'react'
import '../styles/error.scss'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error-container">
      <div className="">
        <h2 className='error-code'>404</h2>
        <p className='error-message'>Oups! La page que vous demandez n'existe pas.</p>
      </div>
      <Link className='error-button' to={'/'}>Retourner sur la page d’accueil</Link>
    </div>
  )
}

export default Error
