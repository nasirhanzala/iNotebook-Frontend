import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";


const Notes = (props) => {


  const context = useContext(noteContext);
   const navigate = useNavigate();
 const { notes, deleteNote, getNote, editNote, addNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
    getNote();
  }else{
    navigate("/login")
  }
  }, []);

  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };
  const handleDelete = async (id) => {
  await deleteNote(id);
  props.showAlert("Note Deleted Successfully", "success");
};

 const handleClick = async (e) => {
  e.preventDefault();

  await editNote(
    note.id,
    note.title,
    note.description,
    note.tag
  );

  closeRef.current.click();

  props.showAlert("Note Updated Successfully", "success");
};

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
     <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
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
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
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
                    onChange={onChange}
                    placeholder="Enter note title"
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
                    rows="3"
                    value={note.description}
                    onChange={onChange}
                    placeholder="Write your note..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                    placeholder="Personal / Study / Work"
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

              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>

              {/* hidden button — handleClick isay trigger karta hai taake update ke baad modal khud band ho jaye */}
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <h2 className="mb-4">Your Notes</h2>

        <div className="row">
          {notes.length === 0 && (
            <h5 className="text-muted">No notes to display</h5>
          )}

          {notes.map((item) => {
            return (
              <NoteItem
                key={item._id}
                note={item}
                deleteNote={handleDelete}
                updateNote={updateNote}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;