// import Loginform from "@/app/login/Loginform";
import Loginform from  "../app/login/Loginform";
// import Header from "@/app/component/Atoms/Header";
import Header from "../app/component/Atoms/Header";

// import SideBar from "@/app/component/Molecule/SideBar";
import SideBar from "../app/component/Molecule/SideBar";

// import CreateNode from "@/app/component/Atoms/CreateNote";

import CreateNode from "../app/component/Atoms/CreateNote";

import styles from "./globals.css";
// import firebaseConfig from "@/app/login/firebase";
import { useState, useEffect } from "react";
// import UserAuthContext from "@/app/firebase/userAuthContext";
import UserAuthContext from "../../my-app/app/firebase/userAuthContext";


const Home = () => {
  return (
    <UserAuthContext>
      <div>
        <Header />

        <div className="Body-Sec">
          <SideBar />
          <CreateNode />
        </div>
      </div>
    </UserAuthContext>
  );
};

export default Home;
