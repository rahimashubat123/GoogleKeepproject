import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import image1 from "../Atoms/Images/hamburger.svg";
import Image from "next/image";
import Svg from "../Atoms/Svg";
import image3 from "../Atoms/Images/refresh.svg";
import image4 from "../Atoms/Images/view_agenda.svg";
import image5 from "../Atoms/Images/settings.svg";
import image6 from "../Atoms/Images/apps.svg";
import image7 from "../Atoms/Images/account.svg";
import Search from "./search";
import CreateNote from "./CreateNote";


import { doc, getDoc } from "firebase/firestore";
import {
  firebaseInit,
  firebaseConfig,
  db,
  auth,
  signOut,
} from "../../firebase/firebaseInit";

import { UserContext } from "../../firebase/userAuthContext";

import { useRouter } from "next/router";

const Header = ({ userId }) => {
  const a = useRouter();
  // const [notes, setNotes] = useState([]);
  const { value } = useContext(UserContext)
  const logout = async () => {
    try {
      await auth.signOut();
      console.log(value.surname, "logout");
      a.push("signup");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="wrapper">
        <div className="header-main">
          <div className="Icons">
            <Svg image={image1} alt="" />
          </div>

          <div className="keep-class">
            <img
              class="gb_Hc gb_Hd"
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              srcset="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x "
              alt=""
              aria-hidden="true"
            ></img>
          </div>

          <div className="Keep">
            <span class="Text">Keep</span>
          </div>

          <Search />

          <div className="Refresh">
            <Svg image={image3} />
          </div>

          <div class="view">
            <Svg image={image4} />
          </div>

          <div class="settings">
            <Svg image={image5} />
          </div>

          <div class="apps">
            <Svg image={image6} />
          </div>

          <div class="accounts">
            <Svg image={image7} />
          </div>

          {value ? (
            <button onClick={logout}>SIGN OUT</button>
          ) : (
            <button>Log In</button>
          )}

          <div>
            <p>{value.surname}</p>
            {/* <p> {value.email}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
