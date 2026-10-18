import { useContext } from 'react'
import { StudentContext } from './StudentContext.jsx'

export function useStudentFavourites() {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useStudentFavourites must be used within a StudentProvider')
  }

  return context
}
