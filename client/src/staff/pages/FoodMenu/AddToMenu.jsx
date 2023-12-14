import { useState, useEffect } from "react";
import { Button } from "../../../components/exports";
import categories from "../../../testdata/categories.json";
import { addNewItem } from "../../../utils/functions";

export default function AddToMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [ingrValue, setIngrValue] = useState('');
  const [categoriesList, setCategoriesList] = useState(["all"])
  const [allergensList, setAllergensList] = useState([])
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: 0,
    imgUrl: "",
    categories: [],
    ingredients: [],
    allergens: [],
  });

  useEffect(() => {
    setNewItem({
      ...newItem,
      categories: categoriesList,
      allergens: allergensList,
      ingredients: ingredients,
    })
  }, [ingredients, categoriesList, allergensList]);

  const categoryOptions = categories.slice(1).map((category, i) => (
    <div key={i}>
      <label htmlFor={category.dish.toLowerCase()}>{category.dish}</label>
      <input
        type="checkbox"
        name="category"
        id={category.dish.toLowerCase()}
        onChange={(e) => addToList(e)}
      ></input>
    </div>
  ));

  const addIngredient = (e) => {
    e.preventDefault();
    if (ingrValue.length > 2) {
      setIngredients((prevIngredients) => [...prevIngredients, ingrValue]);
      setIngrValue("");
    }
    updateNewItem();
  };

  const ingredientList = ingredients.map((ingredient, i) => (
    <li key={i}>{ingredient}</li>
  ));

  const addToList = (e) => {
    const inputName = e.target.name
    const updatedList = e.target.checked
      ? [...(inputName === "allergen" ? allergensList : categoriesList), e.target.id]
      : (inputName === "allergen" ? allergensList : categoriesList).filter((item) => item !== e.target.id);
  
    if (inputName === "allergen") {
      setAllergensList(updatedList);
    } else if (inputName === "category") {
      setCategoriesList(updatedList);
    }
  
    updateNewItem();
  };
  
  

  const handleSetDish = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const updateNewItem = () => {
    setNewItem({
      ...newItem,
      categories: categoriesList,
      allergens: allergensList,
      ingredients: ingredients,
    });
  }

  return (
    <section className="addFood">
      <form
        className="addForm"
        onSubmit={(e) => addNewItem(ingredients, newItem, e)}
      >
        <section className="addForm__info">
          <p>Add info:</p>
          <input
            required
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleSetDish}
          ></input>
          <input
            required
            type="text"
            name="imgUrl"
            placeholder="Image Url"
            onChange={handleSetDish}
          ></input>
          <textarea
            required
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleSetDish}
          ></textarea>
          <input
            required
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleSetDish}
          ></input>
        </section>

        <section className="addForm__ingredients">
          <p>Add ingredients:</p>
          <input
            type="text"
            placeholder="add ingredient"
            onChange={(e) => setIngrValue(e.target.value)}
            value={ingrValue}
          />
          <Button className={"add"} onClick={(e) => addIngredient(e)}>
            Add
          </Button>
          {ingredients.length > 0 && <ul>{ingredientList}</ul>}
          {ingredients.length > 1 ? "" : "Add at least 2 ingredients"}
        </section>

        <section className="addForm__categories">
          <p>Add categories:</p>
          <ul>{categoryOptions}</ul>
        </section>

        <section className="addForm__allergens">
          <p>Add allergens:</p>
          <ul>
            {["lactose", "tomato", "gluten", "nuts"].map((allergen, i) => (
              <div key={i}>
                <label htmlFor={allergen}>{allergen}</label>
                <input
                  type="checkbox"
                  name="allergen"
                  id={allergen}
                  onChange={addToList}
                />
              </div>
            ))}
          </ul>
        </section>
        <Button type="submit">Add to menu</Button>
      </form>
    </section>
  );
}
