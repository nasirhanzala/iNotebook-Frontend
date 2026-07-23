import React from "react";

const NoteItem = (props) => {
  const { note, deleteNote, updateNote } = props;

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{note.title}</h5>

            <div>
              <i
                className="bi bi-pencil-square text-primary mx-2"
                style={{ cursor: "pointer", fontSize: "20px" }}
                title="Edit"
                onClick={() => updateNote(note)}
              ></i>

              <i
                className="bi bi-trash-fill text-danger"
                style={{ cursor: "pointer", fontSize: "20px" }}
                title="Delete"
                onClick={() => deleteNote(note._id)}
              ></i>
            </div>
          </div>

          <hr />

          <p className="card-text">{note.description}</p>

          <span className="badge bg-success">{note.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;