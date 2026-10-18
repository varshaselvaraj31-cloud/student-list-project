import { useState } from 'react'
import { StudentContext } from './StudentContext.jsx'

export function StudentProvider({ children }) {
  const [favourites, setFavourites] = useState([])

  function addFavourite(student) {
    setFavourites((currentFavourites) => (
      currentFavourites.some((favourite) => favourite.id === student.id)
        ? currentFavourites
        : [...currentFavourites, student]
    ))
  }

  function removeFavourite(studentId) {
    setFavourites((currentFavourites) => (
      currentFavourites.filter((student) => student.id !== studentId)
    ))
  }

  return (
    <StudentContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </StudentContext.Provider>
  )
}
