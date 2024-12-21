'use client'

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Notification = ({ message }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (message) {
      const isError = message.includes("Error");
      toast({
        title: isError ? "Error" : "Success",
        description: message,
        variant: isError ? "destructive" : "default",
        duration: 5000,
      });
    }
  }, [message, toast]);

  return <Toaster />;
};

export default Notification;

