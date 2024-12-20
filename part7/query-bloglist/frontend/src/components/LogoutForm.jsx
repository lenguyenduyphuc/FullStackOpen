import { useContext } from "react";
import { AuthContext, NotificationContext } from "../reducers/Context";
import blogService from "../services/blogs";

const LogoutForm = () => {
  const [, userDispatch] = useContext(AuthContext);
  const [, notificationDispatch] = useContext(NotificationContext);

  const handleLogout = () => {
    userDispatch({ type: "CLEAR_USER" });
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: "Logged out successfully",
    });
    setTimeout(
      () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
      5000
    );
  };

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default LogoutForm;
