import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link, useParams} from "react-router-dom";

const Blogs = ({ blogs, users }) => {
  const id = useParams().id;
  const user = users.find(user => String(user.id) === String(id));
  const userBlogs = blogs.filter(blog => String(blog.user.id) === String(user.id));

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        <Togglable buttonLabel="Create new blog">
          <BlogForm />
        </Togglable>
        {[...userBlogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Blogs