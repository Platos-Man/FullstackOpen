import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [allNotes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  const hook = () => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: allNotes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then((response) => {
      setNotes(allNotes.concat(response.data))
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const note = allNotes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then((response) => {
      setNotes(allNotes.map(note.id !== id ? note : response.data))
    })
  }

  const handeNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App
