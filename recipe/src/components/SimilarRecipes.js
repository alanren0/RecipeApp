import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeShortInfo from "./RecipeShortInfo";

function SimilarRecipes({id}) {

  const [recipes, setRecipes] = useState();
  
  useEffect(() => {
    getSimilar();
  }, [id]);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1
    }
  };

  const getSimilar = async () => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=6`);
    const data = await res.json();
    
    const ids = data.map(recipe => recipe["id"]);
    const idsStr = ids.join();

    // another call to get the recipe images
    let bulkApi = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_API_KEY}`;
    if (idsStr) {
      bulkApi = `${bulkApi}&ids=${idsStr}`
    }

    const bulkRes = await fetch(bulkApi);
    const bulkData = await bulkRes.json();

    setRecipes(bulkData);
  }

  return (
    <>
      {recipes &&
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {recipes.map(recipe => (
          <RecipeShortInfo recipe={recipe}/>
        ))}
      </Carousel>
      }
    </>
  )
}

export default SimilarRecipes;
