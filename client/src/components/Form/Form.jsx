import { useState } from "react";
import { validateForm } from "../../utils/validation";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Form.scss";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(field, value) {
    setFormData({ ...formData, [field]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
    } else {
      console.error("Form validation failed:", errors);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="form">
     <section className="form__inputs">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(value) => handleChange("name", value)}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChange={(value) => handleChange("email", value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
      />
      </section>
      <Button type="submit">Confirm</Button>
    </form>
  );
}

export default Form;
