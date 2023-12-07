import { useState } from 'react';
import { Button } from '../../../components/exports';
import categories from '../../../testdata/categories.json';

//In progress

export default function AddToMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [ingrValue, setIngrValue] = useState('');

  const categoryOptions = categories.map((category, i) => (
    <option className={category.dish} key={i}>
      {category.dish}
    </option>
  ));

  function addIngredient(e) {
    e.preventDefault();
    setIngredients((prevIngredients) => [...prevIngredients, ingrValue]);
    setIngrValue('');
  }

  const ingredientList = ingredients.map((ingredient, i) => (
    <li key={i}>{ingredient}</li>
  ));

  return (
    <section className="editFood">
      <form className="add-form">
        <input type="text" placeholder="Title"></input>
        <input type="text" placeholder="Description"></input>
        <input type="text" placeholder="Image Url"></input>
        <input type="number" placeholder="Price"></input>
        <select placeholder="add categories">{categoryOptions}</select>
        {ingredients.length > 0 && <ul>{ingredientList}</ul>}
        <div className="add-ingredients">
          <input
            type="text"
            placeholder="add ingredient"
            onChange={(e) => setIngrValue(e.target.value)}
            value={ingrValue}
          />
          <Button className={'add'} onClick={(e) => addIngredient(e)}>
            Add
          </Button>
        </div>
        <Button>Add to menu</Button>
      </form>
    </section>
  );
}
