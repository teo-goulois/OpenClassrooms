import React from 'react'
import APARTMENTS from '../lib/apartments.json'

const useApartment = (id) => {
  const [apartment, setApartment] = React.useState(null)

  React.useEffect(() => {
    setApartment('loading')
    const newApartment = APARTMENTS.find((item) => item.id === id)
    if (!newApartment) {
      setApartment(null)
      return
    }
    setApartment(newApartment)
  }, [id])

  return apartment
}

export { useApartment }
