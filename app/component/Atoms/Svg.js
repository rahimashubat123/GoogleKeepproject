import React from "react";
import Image from "next/image";
// import styles from '../Atoms/Atoms.css'
const Svg = ({ image }) => {
  return (
    <>
      <div className="Svg-icons">
        <Image src={image} alt="" />
      </div>
    </>
  );
};

export default Svg;
