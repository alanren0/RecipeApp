import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Cuisine from "../components/filters/Cuisine";
import RecipeList from "../components/RecipeList";
import Diet from "../components/filters/Diet";
import Search from "../components/Search";

function SearchPage() {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [recipes, setRecipes] = useState();
  const [offset, setOffset] = useState(0);
  const [prevApi, setPrevApi] = useState("");

  useEffect(() => {
    getRecipes();
  }, [navigate, searchParams, offset]);

  const getRecipes = async () => {
    const query = searchParams.get("query");
    const diets = searchParams.get("diet");
    const cuisines = searchParams.get("cuisine");
    
    if (!query) {
      return;
    }
    
    let api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12&query=${query}`;

    // add parameters to api call
    if (cuisines) {
      api = `${api}&cuisine=${cuisines}`;
    }
    if (diets) {
      api = `${api}&diet=${diets}`;
    }
    api = `${api}&offset=${offset}`;

    // trying to avoid multiple api calls
    if (api == prevApi) {
      return;
    }
    setPrevApi(api);

    const res = await fetch(api);
    const data = await res.json();
    setRecipes(data.results);
  }

  const prevHandler = () => {
    let newOffset = offset - 12;
    if (newOffset < 0) {
      newOffset = 0;
    }
    setOffset(newOffset);
  }

  const nextHandler = () => {
    setOffset(offset + 12);
  }


  return (
    <div>
      <div className="page-separator">
        <div>
          <div className="home-button">
            <Link to="/">Home</Link>
          </div>
          <div className="filters">
            <Search setRecipes={setRecipes} cuisines={cuisines} diets={diets}/>
            <Cuisine setCuisines={setCuisines}/>
            <Diet setDiets={setDiets}/>
          </div>
        </div>
      
        <div>
          <div className="page-buttons">
            { offset != 0 &&
              <button onClick={prevHandler}>Prev</button>
            }
            <button onClick={nextHandler}>Next</button>
          </div>
          <div className="recipes-list">
            {recipes &&
              <RecipeList recipes={recipes}/>
            }
            {!recipes &&
              <p>No Recipes Found</p>
            }
          </div>
        </div>
      </div>
      <footer>
        Data gathered from <a href="https://spoonacular.com/food-api">https://spoonacular.com/food-api</a>
      </footer>
    </div>
  )
}

export default SearchPage
