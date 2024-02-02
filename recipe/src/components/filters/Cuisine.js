import { useEffect, useState } from "react";

function Cuisine({setCuisines}) {

  const cuisineOptions = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ]

  const [checkedStates, setCheckedStates] = useState([]);

  useEffect(() => {
    fillCheckBoxes();
  }, []);

  const fillCheckBoxes = () => {
    const temp = []
    for (let i = 0; i < cuisineOptions.length; i++) {
      temp.push({
        "value": cuisineOptions[i], 
        "checked": false
      });
    }
    setCheckedStates(temp);
  }

  const handleOnChange = (position) => {
    const updatedCheckedStates = checkedStates.map((item, index) => {
      if (index === position) {
        return {
          "value": item["value"],
          "checked": !item["checked"]
        };
      } else {
        return item;
      }
  });
  
    const cuisines = updatedCheckedStates.filter(item => (
      item["checked"] == true
    ));

    setCuisines(cuisines.map(cuisine => cuisine["value"]));
    setCheckedStates(updatedCheckedStates);
  };
  

  return (
    <>
      <h4>Select a Cuisine: </h4>
        {checkedStates &&
        <>
        {checkedStates.map((checkbox, index) => (
          <div key={`cuisine-checkbox-${index}`}>
            <input
              type="checkbox"
              id={`cuisine-checkbox-${index}`}
              value={checkbox["value"]}
              name={checkbox["value"]}
              checked={checkbox["checked"]}
              onChange={() => handleOnChange(index)}
            />
            <label>{checkbox["value"]}</label><br></br>
          </div>
        ))}</>}
        
    </>
  )
}

export default Cuisine