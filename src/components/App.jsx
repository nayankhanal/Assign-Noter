import React, { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import styles from "../cssStyle/Keeper.module.css";
import "../cssStyle/KeeperGlobal.css";

function App(props) {
  const [notes, setNotes] = useState([]);
  const [note1, setNote1] = useState([]);
  const [note2, setNote2] = useState({
    title: "",
    content: "",
    owner: ""
  });


  function addNote(newNote) {
    setNote2(() => {
      return({
        title: newNote.title,
        content: newNote.content,
        owner: newNote.owner
      } );
    })
  }

  function deleteNote(id) {
      axios.delete(`http://localhost:8080/msg/${id}`);
  }
  
  const [line, setLine] = useState("");
    

    useEffect(() => {
      axios.post("http://localhost:8080/msg",{

      body: note2

    })
    },[note2])

    useEffect(() => {
      const asfun = async() => {
        const dats = await axios.get("http://localhost:8080/msg/"+props.user._id);
        // console.log(dats.data);
        setNote1(dats.data);
      }
      asfun();
    },[note1]); 
    
  return (
    <div className="keeper">
      <Header checkAccount={props.checkAccount} />
      <CreateArea onAdd={addNote} user={props.user} />
      {note1.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}


export default App;
