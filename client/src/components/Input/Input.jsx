import "./Input.scss";

function Input({ placeholder, type = 'text', value, onChange }) {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </>
  )
}

export default Input;
