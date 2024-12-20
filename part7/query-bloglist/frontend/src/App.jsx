import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { getBlogs } from "./services/blogs";
import { NotificationContext, AuthContext } from "./reducers/Context";
import "./App.css";

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(AuthContext);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <LogoutForm />
          <Togglable buttonLabel="Create new blog">
            <BlogForm />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} currentUser={user} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
