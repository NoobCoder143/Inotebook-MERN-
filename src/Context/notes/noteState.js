
import { createContext, useState } from "react";
import {  useNavigate } from 'react-router-dom';
const NoteContext = createContext();
const NoteState = (props) => {
  let navigate=useNavigate;

  const host = "http://localhost:5000";
  const [notes, setnotes] = useState([]);
 
  //Get notes
  const getnotes = async ( ) => {
    //api call
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
      
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token') 
       },
      }
    
    );
    const json = await response.json()
    console.log(json)

    setnotes(Array.isArray(json) ? json : []);
    
    if (json.status === 401) {
      console.error("Unauthorized: Invalid token");
      navigate('/Login'); // Redirect to login if unauthorized
  } else if (!json.ok) {
      console.error("Failed to fetch note:", json.statusText);
  }
   
   

   
  };

  //addnote
  const addnote = async (title, description, tag) => {
    //api call
    const response = await fetch(
      `${host}/api/notes/addnotes`,
      {
        method: "POST",
        body: JSON.stringify({ title, description, tag }),
        headers: {
          "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')         },
      }
    );
    const json= await response.json()
    //logic for adding
    const newnote = {
      user:json.user,
      _id: json._id,
      title: json.title,
      description: json.description,
      tag: json.tag
 };
    setnotes(notes.concat(newnote));
  };


  //deletenote
  const  deletenote = async(id) => {
    //api call
  const response = await fetch(
    `${host}/api/notes/deletenotes/${id}`,
    {
      method: "DELETE",
    
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')     },
    }
  
  );
  const json = await response.json()
let newnotes=notes.filter((note)=>{
  return note._id!==id;
})
setnotes(newnotes )
}



  //updatenote
  const editnote = async (id,title, description, tag) => {
    try{
    //api call
    const response = await fetch(
      `${host}/api/notes/updatenotes/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, description, tag }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')        },
      }
    );
    const json= await response.json()
const updatedNotes=notes.map((note)=>{
  return note._id ===id
  ? { ...note, title: title, description:description, tag: tag }
  : note;

})

    setnotes(updatedNotes);
    console.log(updatedNotes);
}catch (error) {
  console.error("Failed to update note:", error);
}
  };

  //search note
  const searchNote= async (query)=>{
  try{
    let endpoint=''
    if (query==='') {
      return getnotes(); // Fetch all notes
    }
    if(query.startsWith("#")){
      query=query.substring(1);
      endpoint=`${host}/api/notes/findTag?query=${query}`
    }
    else{
      endpoint=`${host}/api/notes/findNote?query=${query}`
    }
    const response= await fetch(
      endpoint,
      {
        method :"GET",
        headers:{
          "Content-Type": "application/json",
           "auth-token": localStorage.getItem('token')   
        }
      }
    )
      const json=await response.json()
      setnotes(json)
    
  }catch(error){
    console.error("Error in searchnotes",error)
  }

  }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote ,getnotes,editnote ,searchNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
export { NoteContext };
