'use client'

import { useField } from "../hooks/hooks";
import { createBlogs } from "../services/blogs";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationContext } from "../reducers/Context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const BlogForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast()

  const newBlogMutation = useMutation({
    mutationFn: createBlogs,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(["blogs"]);
      toast({
        title: "Blog created",
        description: `A new blog "${newBlog.title}" by ${newBlog.author} has been added.`,
      });
      navigate("/users");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({
        title: "Error",
        description: "Failed to create new blog. Please try again.",
        variant: "destructive",
      });
    },
  });

  const newTitle = useField("text");
  const newAuthor = useField("text");
  const newUrl = useField("text");
  const newContent = useField("textarea");

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      content: newContent.value,
    };
    newBlogMutation.mutate(blogObject);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addBlog} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              data-testid="title"
              placeholder="Enter blog title"
              {...newTitle}
            />
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              data-testid="author"
              placeholder="Enter author name"
              {...newAuthor}
            />
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              data-testid="url"
              placeholder="Enter blog URL"
              {...newUrl}
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              data-testid="content"
              placeholder="Write your blog content here"
              {...newContent}
            />
          </div>
          <Button type="submit">Create Blog</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;

