import Image from "next/image";

import React, { useContext, useState, useEffect, useRef } from "react";
import Pin from "../Atoms/Images/pin.svg"; // Correct the import paths for your SVG images
import Reminder from "../Atoms/Images/reminder.svg";
import AddCollab from "../Atoms/Images/person_add.svg";
import Drawing from "../Atoms/Images/drawing.svg";
import Pic from "../Atoms/Images/image.svg";
import Archive from "../Atoms/Images/archive.svg";
import More from "../Atoms/Images/delete.svg";
import Undo from "../Atoms/Images/undo (2).svg";
import Redo from "../Atoms/Images/redo.svg";
import img from "../Atoms/Images/img.svg";
import check from "../Atoms/Images/check.svg";
import brush from "../Atoms/Images/brush.svg";

import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
} from "../../firebase/firebaseInit";

import { auth, query } from "../../firebase/firebaseInit";
import { UserContext } from "../../firebase/userAuthContext";
import { onAuthStateChanged } from "firebase/auth";

import { onSnapshot } from "../../firebase/firebaseInit";

const CreateNode = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [Hover, setHover] = useState("");
  const [ShowContent, setShowContent] = useState(false);
  const [icon, showIcon] = useState(true);
  const [user, setUser] = useState("");
  // const [active, setActive] = useState(false);

  const { currentUser, surname, error, getNotes, value } =
    useContext(UserContext);
  console.log(surname);

  const OpenContent = () => {
    showIcon(!icon);
    setShowContent(!ShowContent);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCloseClick = () => {
    showIcon(!icon);
    setShowContent(!ShowContent);

    if (title || text) {
      // Only add a new note if either the title or text is not empty
      const newNote = { title, text };
      setNotes([...notes, newNote]);

      addDoc(collection(db, "notes"), {
        title,
        text,
        ownerId: user.userId,
      });
      setTitle(""); // Clear the input fields
      setText("");
    }
  };

  const handleDeleteClick = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  function Foam() {
    const [isExpanded, setIsExpanded] = useState(false);
    const foamRef = useRef(null);

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.role, user.email);
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.exists) {
            const data = { ...doc.data(), userId: user.uid };

            setUser(data);
          }
        });
      } else {
        console.log("user logout...");
      }
    });
  }, []);

  return (
    <div className="body-part">
      <div className="take-note">
        <div className="body-innerpart">
          <div className="body-first-input">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              onClick={OpenContent}
            />
            {ShowContent && (
              <Image src={Pin} alt="Pin Icon" width={20} height={20} />
            )}
            <div class="zzz">
              {icon && (
                <>
                  <Image src={check} alt="check Icon" width={20} height={20} />
                  <Image src={brush} alt="brush Icon" width={20} height={20} />
                  <Image src={img} alt="img Icon" width={20} height={20} />
                </>
              )}
            </div>
          </div>

          {ShowContent && (
            <>
              <div className="second-input input">
                <input
                  type="text"
                  placeholder="Take a note"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>

              <div className="Create">
                <Image
                  src={AddCollab}
                  alt="Add Collaborator Icon"
                  width={20}
                  height={20}
                />
                <Image
                  src={Reminder}
                  alt="Reminder Icon"
                  width={20}
                  height={20}
                />
                <Image
                  src={Drawing}
                  alt="Drawing Icon"
                  width={20}
                  height={20}
                />
                <Image src={Pic} alt="Pic Icon" width={20} height={20} />
                <Image
                  src={Archive}
                  alt="Archive Icon"
                  width={20}
                  height={20}
                />
                <Image src={More} alt="More Icon" width={20} height={20} />
                <Image src={Undo} alt="Undo Icon" width={20} height={20} />
                <Image src={Redo} alt="Redo Icon" width={20} height={20} />
                <button onClick={handleCloseClick}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="notes">
        {getNotes.map((note, index) => (
          <div className="note-list" key={index}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <div className="note-pics">
              <Image
                src={AddCollab}
                alt="Add Collaborator Icon"
                width={20}
                height={20}
              />
              <Image
                src={Reminder}
                alt="Reminder Icon"
                width={20}
                height={20}
              />
              <Image src={Drawing} alt="Drawing Icon" width={20} height={20} />
              <Image src={Pic} alt="Pic Icon" width={20} height={20} />
              <Image src={Archive} alt="Archive Icon" width={20} height={20} />

              <div className="Delete" id="list-container">
                <Image
                  src={More}
                  alt="More Icon"
                  width={20}
                  height={20}
                  onClick={(id) => handleDeleteClick(note.id)}
                />
                <div className="centered-list"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateNode;
