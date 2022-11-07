import React, { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  // const [notes, setNotes] = useState([]);

  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  const [line, setLine] = useState("");

  useEffect(() => {
    axios.get("/msg")
    .then(res => { console.log(res.message)})
    // .then(data => { setLine(data?.message)})
    .catch((error) => {console.log(error)})
  },[]);

  
  return (
    <div>
      {/* <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer /> */}
      <h1> 
        {line}
      </h1>
    </div>
  );
}

export default App;
