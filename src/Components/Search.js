import React, { useState,useContext } from 'react'
import { NoteContext } from "../Context/notes/noteState";


const Search = () => {
     const context = useContext(NoteContext)
     const{searchNote,getnotes}=context;
    const [Query, setQuery] = useState('')
    const handleSubmit=(e)=>{
      e.preventDefault();
       searchNote(Query);
    }
    
  return (
    <div className='my-3'>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search your Notes"
    aria-label="Search"
    value={Query}
    
    onChange={(e)=>{setQuery(e.target.value);if(e.target.value===''){getnotes()}}}//if query is empty show all the notes
  />
  <button className="btn btn-outline-success" type="submit" >
    Search
  </button>
</form>

    </div>
  )
}

export default Search