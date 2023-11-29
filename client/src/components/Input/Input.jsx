import "./Input.scss";

function Input({ placeholder, type = 'text', value, name, onChange }) {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="input"
        name={name}
      />
    </>
  )
}

export default Input;
