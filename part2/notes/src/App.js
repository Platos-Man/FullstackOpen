import { useState } from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  const [allNotes, setNotes] = useState(notes);
  const [newNote, setNewNote] = useState('note')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
        <form onSubmit={addNote}>
          <input value={newNote} />
          <button type="submit">save</button>
        </form>
      </ul>
    </div>
  )
}

export default App;
