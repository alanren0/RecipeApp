import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {useParams} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'; 
import SimilarRecipes from '../components/SimilarRecipes';

function SpecificRecipePage() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [recipe, setRecipe] = useState();

  useEffect(() => {
    getRecipeInfo();
  }, [navigate]);

  const getRecipeInfo = async () => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const data = await res.json();
    setRecipe(data);
  }
  

  return (
    <div className="recipe-page-body">
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
      
      {recipe &&
        <>
          <div className="recipe-page-separator">
            <div className="recipe-background-large">
              <h2>{recipe.title}</h2>
              <img src={recipe.image}/>
            </div>

            <div className="instructions">
              <h3>Instructions</h3>
              <p>{ReactHtmlParser(recipe.instructions)}</p>
            </div>
          </div>
          <div className="summary">
            <h3>Summary</h3>
            <p>{ReactHtmlParser(recipe.summary)}</p>
          </div>
          
          <div className="carousel">
            <h3>Similar Recipes</h3>
            <SimilarRecipes id={id}/>
          </div>
        </>
      }
      <footer>
        Data gathered from <a href="https://spoonacular.com/food-api">https://spoonacular.com/food-api</a>
      </footer>
    </div>
    
  )
}

export default SpecificRecipePage
