import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

function Search({setRecipes, cuisines, diets}) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const getRecipes = async () => {
    const cuisinesStr = cuisines.join();
    const dietsStr = diets.join();
    
    const params = {
      query: search
    }

    if (cuisinesStr) {
      params["cuisine"] = cuisinesStr;
    }

    if (dietsStr) {
      params["diet"] = dietsStr;
    }

    navigate({
      pathname: "/search",
      search: createSearchParams(params).toString()
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    getRecipes();
  }

  const inputTextHandler = (e) => {
    setSearch(e.target.value);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input className="text-input" type="text" value={search} onChange={inputTextHandler}/>
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default Search