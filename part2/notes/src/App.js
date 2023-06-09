import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [allNotes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('note')
  const [showAll, setShowAll] = useState(false)

  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: allNotes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    }
    setNotes(allNotes.concat(noteObject))
    setNewNote('')
    console.log(allNotes)
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
          <Note key={note.id} note={note} />
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
