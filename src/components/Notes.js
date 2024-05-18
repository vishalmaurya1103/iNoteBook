import React , {useContext , useEffect ,useState, useRef} from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const {notes , getNotes , editNote} = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
        //eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id:"" , etitle: "",eDescription: "",etag:""})
    const ref = useRef('null')
    const refClose = useRef('null')

    const updateNote = (currentNote) =>{
        ref.current.click(); 
        setNote({ id:currentNote._id, etitle:currentNote.title , eDescription:currentNote.Description, etag:currentNote.tag});
    }

    const handleClick = (e) =>{
        console.log("updating the note"); 
        editNote(note.id , note.etitle , note.eDescription , note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note , [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className="container my-3">
                        <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="eDescription" name='eDescription' value={note.eDescription} onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length < 5 || note.eDescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary" >Update Notes</button>
                    </div>
                    </div>
                </div>
                </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'No Notes to Display '}
                </div>
                {notes.map((note)=>{
                return <NoteItem  key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
                })}
            </div>
        </>
  )
}

export default Notes
