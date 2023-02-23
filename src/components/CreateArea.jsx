import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
// import Fab from "@mui/material/Fab";

function CreateArea(props) {
  const [expand, newExpand] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expanding() {
    newExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {expand && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onChange={handleChange}
          onClick={expanding}
          value={note.content}
          placeholder="Take a note..."
          rows={expand ? 3 : 1}
        />
        {expand && (
          <button onClick={submitNote}>
            <AddIcon/>
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
