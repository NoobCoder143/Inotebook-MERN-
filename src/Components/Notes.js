import React, { useContext, useEffect, useState, useRef } from "react";
import { NoteContext } from "../Context/notes/noteState";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const [viewNote, setviewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  //getting array of notes from context
  const { notes, getnotes, editnote } = context;

 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
    } else {
      navigate("/Login");
    }
  }, []);

  const [note, setnote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
  });

  const updatenote = (note) => {
    setnote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modal.show();
  };
  const handleClick = (e) => {
    e.preventDefault();
    editnote(note.id, note.title, note.description, note.tag);
  };
  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  
  const handleModal = (note) => {
    setviewNote({
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    const modal = new window.bootstrap.Modal(document.getElementById("exampleModal2"));
    modal.show();
  };


  return (
    <>
    <h1 style={{textAlign: "center"}}>Inotebook</h1>
      <Search />
      <Addnote />
      {/*  Veiw Modal */}
      <div
        className="modal fade "
        id="exampleModal2"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {viewNote.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="edescription"
                    rows="10"
                    name="description"
                    value={viewNote.description}
                    ></textarea>
                </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
      
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    rows="4"
                    name="description"
                    value={note.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="row mx-1">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {Array.isArray(notes) &&
          notes.map((note) => {
            // using the map function to give note item the id and the note of each note
            return (
              <Noteitem
                key={note._id}
                note={note}
                
                updatenote={updatenote}
                 handleModal={handleModal}
              />
            );
          })}
      </div>
   
    </>
  );
};

export default Notes;