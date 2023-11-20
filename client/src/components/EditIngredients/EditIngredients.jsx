import "./EditIngredientsStyles.scss";
import Button from "../Button/Button";
import { useQuery } from "@tanstack/react-query";
import { wait } from "../../utils/functions";
import toppings from '../../testdata/ingredients.json';

function EditIngredients() {
  const toppingsQuery = useQuery({
    queryKey: ["toppings"],
    queryFn: () => wait(500).then(() => [...toppings]),
  })
  
  if(toppingsQuery.isLoading) return <h1>Loading...</h1>
  if(toppingsQuery.isError) {
    return <pre>{JSON.stringify(toppingsQuery.error)}</pre>
  }

  return (
    <div className="container">
      <div className="editCard">
        {toppingsQuery.map((topping) => (
            <li key={topping.id}>
            <input type="checkbox" className="editCard__ingredient" /> 
            <span>{topping.name}</span>
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
