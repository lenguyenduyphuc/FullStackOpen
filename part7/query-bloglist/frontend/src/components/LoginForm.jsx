'use client'

import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useField } from "../hooks/hooks";
import { login } from "../services/login";
import { NotificationContext, AuthContext } from "../reducers/Context";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = () => {
  const newUsername = useField("text");
  const newPassword = useField("password");
  const navigate = useNavigate();

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
      navigate("/users");
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: "Error: wrong username or password",
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
    <Card>
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-testid="username"
              type="text"
              placeholder="Username"
              {...newUsername}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              data-testid="password"
              type="password"
              placeholder="Password"
              {...newPassword}
            />
          </div>
          <Button type="submit">Log in</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

