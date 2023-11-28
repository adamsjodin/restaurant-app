import "./Input.scss";

function Input({ placeholder, type = 'text', value, name, handleChange }) {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        className="input"
        name={name}
      />
    </>
  )
}

export default Input;
