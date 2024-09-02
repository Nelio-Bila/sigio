import React, { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useRemember } from '@inertiajs/react';

type Message = string;

export function ToastNotification() {
  const { toast } = useToast();
  const [messages, setMessages] = useRemember<Message[]>([]);

  useEffect(() => {
    const flashMessage = messages.pop();
    if (flashMessage) {
      toast({
        title: "Success",
        description: flashMessage,
        duration: 3000,
      });
      setMessages([]);
    }
  }, [messages, toast]);

  return null;
}

export function useFlash() {
  const [messages, setMessages] = useRemember<Message[]>([]);

  return {
    setMessage: (message: Message) => setMessages((prev) => [...prev, message]),
    messages,
  };
}
