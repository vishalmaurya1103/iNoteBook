import NoteContext from './NoteContext'
import { useState} from 'react';

const NoteState = (props) =>{
    const host = "http://localhost:50000"
    const notesInitial = [ ]
    const [notes , setNotes] = useState(notesInitial)

    const getNotes = async()=> {
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method:"get",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
        });
       const json = await response.json()
       console.log(json) 
       setNotes(json)
    }

    const addNote = async( title , Description , tag )=> {
        const response = await fetch(`${host}/api/notes/addnote`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body : JSON.stringify({title , Description , tag})
        });
         const note = await response.json()
         setNotes(notes.concat(note))    
    }

    const deleteNote = async(id)=> {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json)

        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);  
    }

    const editNote = async(id,title,Description,tag)=> {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body : JSON.stringify({title , Description , tag})
        });
        const json = await response.json()
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title
                newNotes[index].Description = Description
                newNotes[index].tag= tag
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes , addNote , deleteNote , editNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;