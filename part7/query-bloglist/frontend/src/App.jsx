import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import { getBlogs } from "./services/blogs";
import { getUsers } from "./services/login";
import { NotificationContext, AuthContext } from "./reducers/Context";
import {
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import "./App.css";

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(AuthContext);

  const padding = {
    padding: 5,
  };

  const blogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  if (blogsResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;
  const users = usersResult.data;

  return (
    <div>
      <Notification message={notification} />
      {!user ? (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      ) : (
        <div>
          <h2>Blogs</h2>
          <h3>{user.name} logged in</h3>
          <LogoutForm />
          <div>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/users">Users</Link>
            <Link style={padding} to="/login">Login</Link>
          </div>
  
          <Routes>
            <Route path="/blogs/:id" element={<Blog blogs={blogs} currentUser={user}/>} />
            <Route path="/users/:id" element={<Blogs blogs={blogs} users={users}/>} />
            <Route path="/users" element={<Users users={users} blogs={blogs}/>}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          <div>
            <i>Blogs app, Department of Computer Science 2024</i>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
