import { useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { useTogglable } from "../hooks/hooks";

const Togglable = forwardRef((props, ref) => {
  const togglable = useTogglable();

  const hideWhenVisible = { display: togglable.value ? "none" : "" };
  const showWhenVisible = { display: togglable.value ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
