
import React, { useContext ,useState}from 'react'
import { NoteContext } from '../Context/notes/noteState'

const Noteitem = (props) => {
    const {note,updatenote ,key,tag,handleModal}=props;
    const context=useContext(NoteContext);
    const {deletenote}=context;
    const handleClick=()=>{
      deletenote(note._id);
    }
   
  return (
    <>
  
  {/* card */}
  <div className='col-md-3'>
  <div 
    className="card my-3 clickable-card" 
    style={{ cursor: "pointer" }} 
     onClick={(e)=>{e.stopPropagation();
       handleModal(note)}} 
  >
    <div className="card-body">
      <div className="d-flex">
        <h5 className="card-title">{note.title}</h5>
        <div className="icon-container position-absolute top-0 end-0">
          <i 
            className="fa-solid fa-pen mx-2" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card's click event
              updatenote(note);
            }}
          ></i>
          <i 
            className="fa-solid fa-trash mx-2" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card's click event
              handleClick();
            }}
          ></i>
        </div>
      </div>
      <p className="card-text">
       {note.description.length > 20 ? note.description.slice(0, 20) + '...' : note.description}

      </p>  
      <span  className="badge bg-primary me-1">
        { `#${tag}`}
        </span>
    </div>
  </div>
</div>

    </>
  )
}

export default Noteitem