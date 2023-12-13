import { useState } from "react";
import "./Login.scss";
import { handleLogin, booleanStates, doubleStateNew, oneState, handleEnterPress } from "../../utils/functions";


function Login({ appState, setAppState }) {
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [state, setState] = useState(booleanStates());
  
  function loginFunction(event) {
      event.preventDefault();
      handleLogin({ setError, loginObj, setState });
  }

  
  return (
    <>
      <section className="login background-color__black">
        <h2 className="login--heading">Log in</h2>
        <input
          type="text"
          className="login--input"
          placeholder="Email"
          onChange={(e) => setLoginObj({ ...loginObj, email: e.target.value.toLowerCase() })}
          />
        <input
          type="password"
          className="login--input"
          placeholder="Password"
          onChange={(e) =>
            setLoginObj({ ...loginObj, password: e.target.value })
          }
          onKeyDown={(event) => handleEnterPress(event, loginFunction)}
          />
        {error && <p>Something went wrong, try again!</p>}
        <section className="login--btns">
          <button className="login--btn" onClick={(event) => loginFunction(event)}>
            Log in
          </button>
          <p
            className="login--paragraph"
            style={{ cursor: "pointer" }}
            onClick={() => doubleStateNew(setAppState, 'showSignup', 'showLogin')}
          >
            Sign up
          </p>
        </section>
        <p onClick={() => oneState(setAppState, 'showLogin')}>
          Continue as guest
        </p>
      </section>
    </>
  );
}

export default Login;
