// import React from 'react';
import React, { useState } from "react";
import SideBarIcons from "../Atoms/SideBarIcons";
import CreateNote from "../Atoms/CreateNote";
import image8 from "../Atoms/Images/note.svg";
import image9 from "../Atoms/Images/reminders.svg";
import image10 from "../Atoms/Images/edit.svg";
import image11 from "../Atoms/Images/archive.svg";
import image12 from "../Atoms/Images/delete.svg";

const SideBar = () => {
  return (
    <>
      <div className="sidebar-side">
        <SideBarIcons inputImages={image8} text="Notes" />

        <SideBarIcons inputImages={image9} text="reminder" />

        <SideBarIcons inputImages={image10} text="Edit Label" />

        <SideBarIcons inputImages={image11} text="Archive" />

        <SideBarIcons inputImages={image12} text="Trash" />
      </div>
    </>
  );
};

export default SideBar;
