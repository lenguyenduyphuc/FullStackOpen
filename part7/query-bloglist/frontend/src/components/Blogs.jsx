'use client'

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Blogs = ({ blogs, users, currentUser }) => {
  const id = useParams().id;
  const user = users.find((user) => String(user.id) === String(id));
  const userBlogs = blogs.filter(
    (blog) => String(blog.user.id) === String(user.id)
  );

  const canAddBlog = currentUser.username === user.username;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">Added blogs</h3>
        {canAddBlog && (
          <Togglable buttonLabel="Create new blog">
            <BlogForm />
          </Togglable>
        )}
        <ul className="list-disc list-inside space-y-2">
          {[...userBlogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`} className="text-blue-500 hover:underline">
                  {blog.title}
                </Link>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Blogs;

