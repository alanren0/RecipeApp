import { Link } from 'react-router-dom';

function RecipeShortInfo({recipe}) {

  let title = recipe.title;
  if (title.length > 80) {
    title = title.substring(0, 77) + "...";
  }

  return (
    
    <div>
      <Link to={`/recipes/${recipe.id}`}>
        <div className="recipe-background">
          <p>{title}</p>
          <img className="recipe-thumbnail" src={recipe.image}/> 
        </div>
      </Link>
    </div>
    
  )
}

export default RecipeShortInfo