import RecipeShortInfo from "./RecipeShortInfo"

function RecipeList({recipes}) {
  return (
    <>
      {recipes.map(recipe => (
        <RecipeShortInfo key={recipe.id} recipe={recipe}/>
      ))}
    </>
  )
}

export default RecipeList