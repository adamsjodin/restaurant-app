import { useState } from 'react';
import { Button } from '../../../components/exports';
import categories from '../../../testdata/categories.json';
import axios from "axios";

//In progress
//TODO: 
//Make sure state is updated before sending - HOW!??!  
//Move functions
//Fix styling


export default function AddToMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [ingrValue, setIngrValue] = useState('');
  const [categoriesList, setCategoriesList] = useState(["All"])
  const [allergensList, setAllergensList] = useState([])
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: 0,
    imgUrl: "",
    categories: [],
    ingredients: [],
    allergens: []
  })
  
  const categoryOptions = categories.slice(1).map((category, i) => (
    <div key={i}>
      <input type='checkbox' name="category" id={category.dish} onChange={(e) => addToList(e)}></input>
      <label htmlFor={category.dish}>{category.dish}</label>
    </div>
  ))

  function addIngredient(e) {
    e.preventDefault();
    if (ingrValue.length > 2) {
      setIngredients((prevIngredients) => [...prevIngredients, ingrValue]);
      setIngrValue('');
      }
      setNewItem({...newItem, categories: categoriesList, allergens: allergensList, ingredients: ingredients})
  }

  const ingredientList = ingredients.map((ingredient, i) => (
    <li key={i}>{ingredient}</li>
  ));

function addToList(e) {
  if (e.target.name === "allergen"){
    e.target.checked && !allergensList.includes(e.target.id) ? setAllergensList(prev => [...prev, e.target.id]) : console.log("not added") }
  else if (e.target.name === "category") {
    e.target.checked && !categoriesList.includes(e.target.id) ? setCategoriesList(prev => [...prev, e.target.id]) : console.log("not added")
  } 
  setNewItem({...newItem, categories: categoriesList, allergens: allergensList, ingredients: ingredients})
  }
  
const addNewItem = async (item, e) => {
  
  if (ingredients.length > 1) {
    
    await axios
      .post(
        "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu",
        item
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });} else {
        e.preventDefault()
      }
  };

  const handleSetDish = (e) => {
    const { name } = e.target;
    const updatedValue = e.target.value;
    setNewItem({ ...newItem, [name]: updatedValue })
};
  

  return (
    <section className="addFood editFood">
      <form className="add-form" onSubmit={(e) => addNewItem(newItem, e)}>
        <section className='add-info'>
          <p>Add info:</p>
          <input required type="text" name="title" placeholder="Title" onChange={handleSetDish}></input>
          <input required type="text" name="imgUrl" placeholder="Image Url" onChange={handleSetDish}></input>
          <textarea required type="text" name="description" placeholder="Description" onChange={handleSetDish}></textarea>
          <input required type="number" name="price" placeholder="Price" onChange={handleSetDish}></input>
        </section>

        
        <section className="add-ingredients">
        <p>Add ingredients:</p>
          <input
            type="text"
            placeholder="add ingredient"
            onChange={(e) => setIngrValue(e.target.value)}
            value={ingrValue}
          />
          <Button className={'add'} onClick={(e) => addIngredient(e)}>
            Add
          </Button>
          {ingredients.length > 0 && <ul>{ingredientList}</ul>}
          {ingredients.length > 1 ? "" : "Add at least 2 ingredients"}
        </section>

        <section className='add-categories'>
          <p>Add categories:</p>
          {categoryOptions}
        </section>

        <section className='add-allergens'>
          <p>Add allergens:</p>
          <div>
            <input type='checkbox' name="allergen" id="lactose" onChange={(e) => addToList(e)}></input>
            <label htmlFor="lactose">Lactose</label>
          </div>
          <div>
            <input type='checkbox' name="allergen" id="tomatoe" onChange={(e) => addToList(e)}></input>
            <label htmlFor="tomatoe">Tomatoe</label>
          </div>
          <div>  
            <input type='checkbox' name="allergen" id="gluten" onChange={(e) => addToList(e)}></input>
            <label htmlFor="gluten">Gluten</label>
          </div>  
          <div>
            <input type='checkbox' name="allergen" id="nuts" onChange={(e) => addToList(e)}></input>
            <label htmlFor="nuts">Nuts</label>
          </div>
        </section>
        <Button type="submit">Add to menu</Button>
      </form>
    </section>
  );
}
