import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useStudentFavourites } from './useStudentFavourites.jsx'
import './App.css'

const students = [
  { id: 'STU-1001', name: 'Aarav Sharma', course: 'Computer Science', year: 'Year 2' },
  { id: 'STU-1002', name: 'Mia Patel', course: 'Information Technology', year: 'Year 1' },
  { id: 'STU-1003', name: 'Noah Williams', course: 'Data Science', year: 'Year 3' },
  { id: 'STU-1004', name: 'Sofia Garcia', course: 'Computer Science', year: 'Year 2' },
  { id: 'STU-1005', name: 'Ethan Chen', course: 'Cybersecurity', year: 'Year 4' },
  { id: 'STU-1006', name: 'Isabella Brown', course: 'Information Technology', year: 'Year 1' },
  { id: 'STU-1007', name: 'Lucas Martin', course: 'Data Science', year: 'Year 3' },
  { id: 'STU-1008', name: 'Amara Okafor', course: 'Computer Science', year: 'Year 2' },
]

function Header({ favouriteCount }) {
  const location = useLocation()

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Campus List home">
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>campus<span className="brand-light">list</span></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/">
          Students
        </Link>
        <Link
          className={location.pathname === '/favourites' ? 'nav-link active' : 'nav-link'}
          to="/favourites"
        >
          Favourites
          <span className="nav-count">{favouriteCount}</span>
        </Link>
      </nav>
    </header>
  )
}

function PageIntro({ eyebrow, title, description, count }) {
  return (
    <div className="page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-description">{description}</p>
      </div>
      <div className="student-count" aria-label={`${count} students`}>
        <span className="count-number">{String(count).padStart(2, '0')}</span>
        <span className="count-label">{count === 1 ? 'student' : 'students'}</span>
      </div>
    </div>
  )
}

function StudentCard({ student, isFavourite, onAdd, onRemove }) {
  const initials = student.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <article className="student-card">
      <div className="card-topline">
        <div className="student-avatar" aria-hidden="true">{initials}</div>
        {isFavourite && <span className="saved-label"><span aria-hidden="true">♥</span> Saved</span>}
      </div>
      <h2>{student.name}</h2>
      <p className="student-course">{student.course}</p>
      <div className="student-meta">
        <span>{student.id}</span>
        <span>{student.year}</span>
      </div>
      {isFavourite ? (
        <button className="action-button remove-button" type="button" onClick={() => onRemove(student.id)}>
          <span aria-hidden="true">−</span> Remove from favourites
        </button>
      ) : (
        <button className="action-button add-button" type="button" onClick={() => onAdd(student)}>
          <span aria-hidden="true">+</span> Add to favourite
        </button>
      )}
    </article>
  )
}

function StudentListPage() {
  const { favourites, addFavourite } = useStudentFavourites()
  const favouriteIds = new Set(favourites.map((student) => student.id))

  return (
    <>
      <PageIntro
        eyebrow="YOUR CAMPUS DIRECTORY"
        title="Meet the students."
        description="Find your classmates and save the people you want to keep close."
        count={students.length}
      />
      <section className="student-grid" aria-label="Student directory">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            isFavourite={favouriteIds.has(student.id)}
            onAdd={addFavourite}
          />
        ))}
      </section>
    </>
  )
}

function FavouritesPage() {
  const { favourites, removeFavourite } = useStudentFavourites()

  return (
    <>
      <PageIntro
        eyebrow="YOUR PERSONAL COLLECTION"
        title="Your favourites."
        description="A little list of the classmates you want to remember."
        count={favourites.length}
      />
      {favourites.length > 0 ? (
        <section className="student-grid" aria-label="Favourite students">
          {favourites.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              isFavourite
              onRemove={removeFavourite}
            />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">♡</span>
          <h2>No favourite students added yet</h2>
          <p>Your saved students will appear here. Start with someone from the directory.</p>
          <Link className="browse-button" to="/">Browse students <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </>
  )
}

function App() {
  const { favourites } = useStudentFavourites()

  return (
    <div className="app-shell">
      <Header favouriteCount={favourites.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StudentListPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>Made for your campus community</span>
        <span>Favourite Student List <span aria-hidden="true">·</span> 2026</span>
      </footer>
    </div>
  )
}

export default App
