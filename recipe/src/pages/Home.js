
import { useEffect, useState  } from "react";
import Cuisine from "../components/filters/Cuisine";
import RecipeList from "../components/RecipeList";
import Diet from "../components/filters/Diet";
import Search from "../components/Search";
import { Link } from "react-router-dom";

function Home() {

  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRandomRecipes();
  }, []);

  const getRandomRecipes = async () => {
    // get random recipes for home page
    const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`);
    const data = await res.json();
    setRecipes(data.recipes);

  }



  return (
    <div>
      <div className="top">
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
        <div className="search">
          <Search setRecipes={setRecipes} cuisines={cuisines} diets={diets}/>
        </div>
      </div>

      <div className="page-separator">
        <div className="filters">
          
          <Cuisine setCuisines={setCuisines}/>
          <Diet setDiets={setDiets}/>
        </div>
    
        <div>
          <div className="page-buttons">
            <button onClick={getRandomRecipes}>Get Random Recipes</button>
          </div>
          <div className="recipes-list">
          
            {recipes &&
            <RecipeList recipes={recipes}/>
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

export default Home
