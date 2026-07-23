import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    await addNote(note.title, note.description, note.tag);

props.showAlert("Note Added Successfully", "success");

   

    // Clear form after adding
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title mb-4">
            <i className="bi bi-plus-circle-fill text-primary me-2"></i>
            Add a New Note
          </h3>

          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>

              <input
                type="text"
                className="form-control"
                id="title"
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
          

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
              disabled={note.title.length < 3 || note.description.length < 5}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;