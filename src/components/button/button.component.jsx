import './button.styles.scss'


const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonTapye, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonTapye]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
