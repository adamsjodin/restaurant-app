import "./EditIngredientsStyles.scss";
import { useState } from "react";
import Button from "../Button/Button";
import { MdClose } from "react-icons/md";

function EditIngredients({ product, addToCart, toggleEditIngredients }) {
  const { ingredients } = product;
  const [changedCheckboxes, setChangedCheckboxes] = useState({});
  const [message, setMessage] = useState("");
  const addOns = ["Cheese", "White Sauce", "Gluten-free", "Spicy"];
  const totalList = [...ingredients, ...addOns];

  const [checkboxValues, setCheckboxValues] = useState(
    totalList.reduce((acc, ingredient) => {
      acc[ingredient] = ingredients.includes(ingredient); 
      return acc;
    }, {})
  );


  const handleCheckboxChange = (ingredient) => {
    setCheckboxValues((prevValues) => {
      const newValue = !prevValues[ingredient];
      setChangedCheckboxes((prevChanged) => ({
        ...prevChanged,
        [ingredient]: newValue,
      }));
      return { ...prevValues, [ingredient]: newValue };
    });
  
    
    setChangedCheckboxes((prevChanged) => ({
      ...prevChanged,
      [ingredient]: !changedCheckboxes[ingredient],
    }));
  };

  const handleAddToCart = () => {
    const changedCheckboxValues = Object.keys(changedCheckboxes).reduce((acc, ingredient) => {
      if (changedCheckboxes[ingredient]) {
        acc[ingredient] = checkboxValues[ingredient];
      }
      
      return acc;
    }, {});
    
    
    addToCart({ ...product, changes: changedCheckboxValues, message });
    toggleEditIngredients();
    
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };


  return (
    <div className="popup">
      <MdClose onClick={() => {
        toggleEditIngredients()
      }}
       />
      <div className="editCard">
        <ul>
          {totalList.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <input
                type="checkbox"
                className="editCard__ingredient"
                checked={checkboxValues[ingredient]}
                onChange={() => handleCheckboxChange(ingredient)}
              />
            </li>
          ))}
        </ul>

        <div>
          <input
            type="text"
            placeholder="Add message"
            className="editCard__input"
            value={message}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}

export default EditIngredients;