import { useField } from "../hooks/hooks";
import { createBlogs } from "../services/blogs";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationContext } from "../reducers/Context";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  
  const newBlogMutation = useMutation({
    mutationFn: createBlogs,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(["blogs"]);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
      navigate('/users')
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `Error create new blogs`,
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    },
  });

  const newTitle = useField("text");
  const newAuthor = useField("text");
  const newUrl = useField("text");

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
    };
    newBlogMutation.mutate(blogObject);
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid="title"
            id="title"
            name="Title: "
            placeholder="Title"
            {...newTitle}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            id="author"
            name="Author: "
            placeholder="Author"
            {...newAuthor}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            id="url"
            name="URL: "
            placeholder="URL"
            {...newUrl}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
