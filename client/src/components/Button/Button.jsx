import "./ButtonStyles.scss";

function Button({ children, onClick, className, type }) {
    const dynamicStyle = className ? `button--${className}` : 'button--primary';

    return (
      <button className={"btn " + dynamicStyle} type={type} onClick={onClick}>
        {children}
      </button>
    );
  }
  
  export default Button;