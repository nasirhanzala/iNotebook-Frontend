import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host= "https://i-notebook-backendrepo.vercel.app/"


  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);



  
// get all Note
const getNote = async () => {
  // API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
        ,
    },
   
  });
  const json = await response.json()
  console.log(json);
  setNotes(json)
  

  
}

// Add Note
const addNote = async (title, description, tag) => {
  // API Call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    },
    body: JSON.stringify({
      title,
      description,
      tag,
    }),
  });

  const json = await response.json();
  console.log(json);

  setNotes(
    notes.concat(json)
  );
};

  // Delete Note
  const deleteNote = async (id) => {

    //api call
    const response = await fetch (`${host}/api/notes/deletenotes/${id}`,{
      method :'DELETE',
      headers:{
        'Content-Type' : 'application/json',
         'auth-token': localStorage.getItem('token')
      }
    })
    const json = response.json();
    console.log(json);
    
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit Note
  const editNote =  async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        "auth-token" :localStorage.getItem('token')
      },
     body: JSON.stringify({
  title,
  description,
  tag,
}),
      

    });
   const json = await response.json();
console.log(json);

       


    //edit for local client
   for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id === id){
      element.title = title;
      element.description = description;
      element.tag = tag
    }
    setNotes([...notes]);
   }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNote
      
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
