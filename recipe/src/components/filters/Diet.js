import { useEffect, useState } from "react";

function Diet({setDiets}) {

  const dietOptions = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
  ]

  const [checkedStates, setCheckedStates] = useState([]);

  useEffect(() => {
    fillCheckBoxes();
  }, []);

  const fillCheckBoxes = () => {
    const temp = []
    for (let i = 0; i < dietOptions.length; i++) {
      temp.push({
        "value": dietOptions[i], 
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
  
    const diets = updatedCheckedStates.filter(item => (
      item["checked"] == true
    ));

    setDiets(diets.map(diet => `\"${diet["value"]}\"`));
    setCheckedStates(updatedCheckedStates);
  };
  

  return (
    <>
      <h4>Select a Diet: </h4>
        {checkedStates &&
        <>
        {checkedStates.map((checkbox, index) => (
          <div key={`diet-checkbox-${index}`}>
            <input
              type="checkbox"
              id={`diet-checkbox-${index}`}
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

export default Diet