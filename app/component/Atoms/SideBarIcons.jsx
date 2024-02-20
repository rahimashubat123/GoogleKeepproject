import React from "react";
import Image from "next/image";

const SideBarIcons = ({ inputImages, text }) => {
  return (
    <div className="sidebar-block">
      <Image src={inputImages} alt="" />
      <p>{text}</p>
    </div>
  );
};

export default SideBarIcons;
