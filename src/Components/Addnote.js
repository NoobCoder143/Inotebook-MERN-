import React, { useContext ,useState}from 'react'
import { NoteContext } from '../Context/notes/noteState'
const Addnote = () => {
    const context=useContext(NoteContext);
    const {addnote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
      addnote(note.title,note.description,note.tag)
      setnote({title:"",description:"",tag:""})
    }
    const HandleChange=(e)=>{
       setnote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
          <h2>Add a NOTE</h2>
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Title
    </label>
    <input
      type="text"
      className="form-control"
      id="title"
      name='title'
      aria-describedby="emailHelp"
      onChange={HandleChange}
      value={note.title}
    />
   
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">
    Description
  </label>
  <textarea
    className="form-control"
    id="description"
    name="description"
    rows="4" // Number of visible rows
    onChange={HandleChange}
    value={note.description}
  ></textarea>
</div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Tag
    </label>
    <input
      type="text"
      className="form-control"
      id="tag"
      name="tag"
      onChange={HandleChange}
      value={note.tag}
    />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>
   Add note
  </button>
</form>

    </div>
  )
}

export default Addnote