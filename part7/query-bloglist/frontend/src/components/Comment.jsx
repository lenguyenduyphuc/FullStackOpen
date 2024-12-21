'use client'

import { useField } from "../hooks/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatedComment } from "../services/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Comment = ({blog}) => {
  const comment = useField('text')
  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: updatedComment,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (oldData) => {
        return oldData.map((blog) =>
          blog.id === updatedBlog.id
          ? {...updatedBlog, user: blog.user} 
          : blog
        );
      });
      comment.onChange({ target: {value: ''} })
    }
  })

  const addComment = (event) => {
    event.preventDefault()

    addCommentMutation.mutate(
      {
        id: blog.id,
        comment: comment.value
      }
    )
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add comments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addComment} className="flex space-x-2">
          <Input 
            placeholder="Comment"
            {...comment}
          />
          <Button type='submit'>Comment</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Comment;

