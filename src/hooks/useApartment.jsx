import React from 'react'
import APARTMENTS from '../lib/apartments.json'

const useApartment = (id) => {
  const [apartment, setApartment] = React.useState(null)

  React.useEffect(() => {
    const newApartment = APARTMENTS.find((item) => item.id === id)
    setApartment(newApartment)
  }, [id])

  return apartment
}

export { useApartment }
