'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTogglable } from "../hooks/hooks";
import { updateBlogs, removeBlogs } from "../services/blogs";
import { useContext } from "react";
import { NotificationContext } from "../reducers/Context";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Trash2 } from 'lucide-react';
import Comment from "./Comment";

const Blog = ({ blogs, currentUser }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const togglable = useTogglable();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateBlogMutation = useMutation({
    mutationFn: updateBlogs,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (oldData) => {
        return oldData.map((blog) =>
          blog.id === updatedBlog.id
            ? { ...updatedBlog, user: blog.user }
            : blog
        );
      });
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `Blog ${updatedBlog.title} has been liked`,
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    },
    onError: (updatedBlog) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `Error liking blog ${updatedBlog.title}`,
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: removeBlogs,
    onSuccess: (_, removedBlogId) => {
      queryClient.invalidateQueries(["blogs"]);
      queryClient.setQueryData(["blogs"], (oldData) => {
        return oldData.filter((blog) => blog.id !== removedBlogId);
      });
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: "The blog has been removed",
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
      navigate("/users");
    },
  });

  const id = useParams().id;
  const blog = blogs.find((b) => String(b.id) === String(id));
  if (!blog) {
    return <div>Blog not found</div>;
  }

  const updateBlog = (event) => {
    event.preventDefault();
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user,
    });
  };

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const canDeleteBlog = currentUser.username === blog.user.username;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>by {blog.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {togglable.visible ? 'Hide Details' : 'Show Details'}
              <Badge variant="secondary">{blog.likes} likes</Badge>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <p>
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {blog.url}
              </a>
            </p>
            <div className="flex items-center justify-between">
              <Button onClick={updateBlog} size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" /> Like
              </Button>
              <p>Added by: {blog.user.name}</p>
            </div>
            {canDeleteBlog && (
              <Button onClick={removeBlog} variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
        <Comment blog={blog} />
        <ul className="list-disc list-inside mt-4">
          {blog.comments &&
            blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Blog;

