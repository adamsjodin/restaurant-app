import { useState } from "react";
import axios from "axios";
import "./Signup.scss";
import { MdClose } from "react-icons/md";
import { validateForm } from "../../utils/validation";
import { Button, Input } from "../exports";

function Signup({ action }) {
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [message, setMessage] = useState("");

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "member",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSignup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setMessage("");
    setShowErrorMsg(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsChecked) {
      setShowErrorMsg(false);
      const errors = validateForm(signup);

      if (Object.keys(errors).length === 0 && termsChecked) {
        axios
          .post(
            "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/user",
            signup
          )
          .then((res) => {
            setSignup({
              name: "",
              email: "",
              phone: "",
              password: "",
            });
            setFormErrors({});
            setFormSubmitted(true);

            return res;
          })
          .catch((err) => {
            setMessage(err.response.data.message);
          });
      } else {
        setFormSubmitted(false);
        setFormErrors(errors);
      }
    } else {
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <section className="signup">
        <MdClose onClick={() => action(false)} />
        <h2 className="signup--heading">Sign up</h2>

        <form className="signup--form" onSubmit={handleSubmit}>
          <section className="signup--form--inputs">
            <Input
              className="signup--input-text"
              type="text"
              placeholder="Name"
              name="name"
              value={signup.name}
              onChange={handleChange}
              errorMessage={formErrors.name}
            />
            {formErrors.name && (
              <h4 className="signup--errors">{formErrors.name}</h4>
            )}
            <Input
              className="signup--input-text"
              type="text"
              placeholder="Email"
              name="email"
              value={signup.email}
              onChange={handleChange}
              errorMessage={formErrors.email}
            />
            {formErrors.email && (
              <h4 className="signup--errors">{formErrors.email}</h4>
            )}

            <Input
              className="signup--input-text"
              type="text"
              placeholder="Phone"
              name="phone"
              value={signup.phone}
              onChange={handleChange}
            />
            {formErrors.phone && (
              <h4 className="signup--errors">{formErrors.phone}</h4>
            )}

            <Input
              className="signup--input-text"
              type="password"
              placeholder="Password"
              name="password"
              value={signup.password}
              onChange={handleChange}
              errorMessage={formErrors.password}
            />
            {formErrors.password && (
              <h4 className="signup--errors">{formErrors.password}</h4>
            )}
          </section>
          <section className="signup--input-container">
            <div className="signup--input-checkbox-container">
              <Input
                className="signup--input-checkbox"
                id="terms"
                type="checkbox"
                checked={termsChecked}
                onChange={handleTermsChange}
              />
              <label htmlFor="terms">I agree the terms and conditions</label>
              {showErrorMsg && (
                <h4 className="signup--errors">
                  Please agree to the terms and conditions
                </h4>
              )}
            </div>

            <div className="signup--input-checkbox-container">
              <input
                className="signup--input-checkbox"
                id="newsletter"
                type="checkbox"
              />
              <label htmlFor="newsletter">
                I want to sign up for the newsletter
              </label>
            </div>

            <div className="signup--input-checkbox-container">
              <input
                className="signup--input-checkbox"
                id="info"
                type="checkbox"
              />
              <label htmlFor="info">
                I agree that Claddagh saving my personal information
              </label>
            </div>
            
            {message && (
              <h2 className="signup--submitted signup--submitted--red">
                {message}
              </h2>
            )}
            {formSubmitted && (
              <h2 className="signup--submitted">Thank you for signing up!</h2>
            )}
          </section>
          <div className="signup--btn">
              <Button type="submit">Confirm sign up</Button>
            </div>
        </form>
      </section>
    </>
  );
}

export default Signup;
