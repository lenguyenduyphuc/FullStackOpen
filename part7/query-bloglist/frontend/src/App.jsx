'use client'

import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { getBlogs } from "./services/blogs";
import { getUsers } from "./services/login";
import { NotificationContext, AuthContext } from "./reducers/Context";

import Home from "./components/Home";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(AuthContext);

  const blogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (blogsResult.isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading data...</div>;
  }

  const blogs = blogsResult.data;
  const users = usersResult.data;

  return (
    <div className="container mx-auto p-4">
      <Notification message={notification} />
      {!user ? (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Blogs</CardTitle>
            <p className="text-muted-foreground">{user.name} logged in</p>
            <LogoutForm />
          </CardHeader>
          <CardContent>
            <nav className="flex space-x-4 mb-4">
              <Button variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/users">Users</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </nav>

            <Routes>
              <Route path="/blogs/:id" element={<Blog blogs={blogs} currentUser={user}/>} />
              <Route path="/users/:id" element={<Blogs blogs={blogs} users={users} currentUser={user}/>} />
              <Route path="/users" element={<Users users={users} blogs={blogs}/>}/>
              <Route path="/login" element={<LoginForm />}/>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </CardContent>
          <div className="text-center text-sm text-muted-foreground mt-4">
            <i>Blogs app, Department of Computer Science 2024</i>
          </div>
        </Card>
      )}
    </div>
  );
}

export default App;
