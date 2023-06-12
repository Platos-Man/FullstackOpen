import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  )
}

const App = () => {
  const [allNotes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = () => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }
  useEffect(hook, [])

  if (!allNotes) {
    return null
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: allNotes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(allNotes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const note = allNotes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        console.log(returnedNote)
        setNotes(allNotes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(allNotes.filter((n) => n.id !== id))
      })
  }

  const handeNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter((note) => note.important)

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return <div className="error">{message}</div>
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handeNoteChange} />
          <button type="submit">save</button>
        </form>
      </ul>
      <Footer />
    </div>
  )
}

export default App
