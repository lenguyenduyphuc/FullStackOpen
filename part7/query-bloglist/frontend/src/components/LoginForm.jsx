import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useField } from "../hooks/hooks";
import { login } from "../services/login";
import { NotificationContext, AuthContext } from "../reducers/Context";
import blogService from "../services/blogs";

const LoginForm = () => {
  const newUsername = useField("text");
  const newPassword = useField("password");

  const [, userDispatch] = useContext(AuthContext);
  const [, notificationDispatch] = useContext(NotificationContext);

  const newUserMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      userDispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `Welcome ${user.name}!`,
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: "Error wrong username or password",
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      username: newUsername.value,
      password: newPassword.value,
    };
    newUserMutation.mutate(credentials);
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            name="Username"
            placeholder="Username: "
            {...newUsername}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            name="Password"
            placeholder="Password: "
            {...newPassword}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
