import React from "react";
import Svg from "../Atoms/Svg";
import image2 from "../Atoms/Images/search.svg";

const Search = () => {
  return (
    <div className="Search">
      <form className=" foam-input">
        {/* < div class="search-icon">  */}
        <Svg image={image2} />

        {/* </div>  */}

        <input type="text" placeholder="Search.." name="search" />
      </form>
    </div>
  );
};

export default Search;
