import { useState, useEffect } from "react";
import { Button } from "../../../components/exports";
import categories from "../../../testdata/categories.json";
import { addNewItem } from "../../../utils/functions";

export default function AddToMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [ingrValue, setIngrValue] = useState("");
  const [categoriesList, setCategoriesList] = useState(["All"]);
  const [allergensList, setAllergensList] = useState([]);
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
    });
  }, [ingredients, categoriesList, allergensList]);

  const categoryOptions = categories.slice(1).map((category, i) => (
    <div key={i}>
      <label htmlFor={category.dish}>{category.dish}</label>
      <input
        type="checkbox"
        name="category"
        id={category.dish}
        onChange={(e) => addToList(e)}
      ></input>
    </div>
  ));

  function addIngredient(e) {
    e.preventDefault();
    if (ingrValue.length > 2) {
      setIngredients((prevIngredients) => [...prevIngredients, ingrValue]);
      setIngrValue("");
    }
    setNewItem({
      ...newItem,
      categories: categoriesList,
      allergens: allergensList,
      ingredients: ingredients,
    });
  }

  const ingredientList = ingredients.map((ingredient, i) => (
    <li key={i}>{ingredient}</li>
  ));

  function addToList(e) {
    if (e.target.name === "allergen") {
      e.target.checked && !allergensList.includes(e.target.id)
        ? setAllergensList((prev) => [...prev, e.target.id])
        : console.log("not added");
    } else if (e.target.name === "category") {
      e.target.checked && !categoriesList.includes(e.target.id)
        ? setCategoriesList((prev) => [...prev, e.target.id])
        : console.log("not added");
    }
    setNewItem({
      ...newItem,
      categories: categoriesList,
      allergens: allergensList,
      ingredients: ingredients,
    });
  }

  const handleSetDish = (e) => {
    const { name } = e.target;
    const updatedValue = e.target.value;
    setNewItem({ ...newItem, [name]: updatedValue });
  };

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
            <div>
              <label htmlFor="lactose">Lactose</label>
              <input
                type="checkbox"
                name="allergen"
                id="lactose"
                onChange={(e) => addToList(e)}
              ></input>
            </div>
            <div>
              <label htmlFor="tomato">Tomato</label>
              <input
                type="checkbox"
                name="allergen"
                id="tomato"
                onChange={(e) => addToList(e)}
              ></input>
            </div>
            <div>
              <label htmlFor="gluten">Gluten</label>
              <input
                type="checkbox"
                name="allergen"
                id="gluten"
                onChange={(e) => addToList(e)}
              ></input>
            </div>
            <div>
              <label htmlFor="nuts">Nuts</label>
              <input
                type="checkbox"
                name="allergen"
                id="nuts"
                onChange={(e) => addToList(e)}
              ></input>
            </div>
          </ul>
        </section>
        <Button type="submit">Add to menu</Button>
      </form>
    </section>
  );
}
