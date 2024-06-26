import React ,{useContext , useState} from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    
    const [note, setNote] = useState({title: "",Description: "",tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title , note.Description , note.tag);
        setNote({title: "",Description: "",tag:""})
        props.showAlert("Added Successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note , [e.target.name]:e.target.value})
    }

  return (
    <div className="container my-3">
    <h1>Add Notes</h1>
    <form className="container my-3">
            <div className="mb-3">
               <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">Description</label>
              <input type="text" className="form-control" id="Description" name='Description' value={note.Description} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />
            </div>
            <button disabled={note.title.length < 5 || note.Description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
  </div>
  )
}

export default AddNote
