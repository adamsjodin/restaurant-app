import "./EditIngredientsStyles.scss";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

function EditIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/testdata/ingredients.json");
      const data = await response.json();
      setIngredients(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="editCard">
        {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
            <input type="checkbox" className="editCard__ingredient" /> 
            <span>{ingredient.name}</span>
          </li>
        ))}
        
        <div>
          <input
            type="checkbox"
            className="editCard__ingredient"
          />
          <input
            type="text"
            placeholder="Add message"
            className="editCard__input"
          />
        </div>
      </div>
      <Button>Add Changes</Button>
    </div>
  );
}

export default EditIngredients;
