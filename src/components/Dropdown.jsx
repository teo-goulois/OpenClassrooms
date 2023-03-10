import React from 'react'
import '../styles/dropdown.scss'

// Components
import { Chevron } from '../components/Chevron'

const Dropdown = ({ title, body }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="dropdown">
      <div className="dropdown_header">
        <p>{title}</p>

        <button
          onClick={handleClick}
          className={isOpen ? 'open' : ''}
          type="button"
        >
          <Chevron />
        </button>
      </div>
      <div className={isOpen ? 'dropdown_body open' : 'dropdown_body'}>
        <p>{body}</p>
      </div>
    </div>
  )
}

export default Dropdown
