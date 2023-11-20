import "./ButtonStyles.scss";

function Button({ children, onClick, className }) {

  
    return (
        <button className={`button--primary`} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
  
  export default Button;