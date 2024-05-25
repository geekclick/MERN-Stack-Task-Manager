import React, { useEffect, useState } from "react";
import { Bell, Heart, Search, SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import io from "socket.io-client";

const socket = io();

// Define the props for the ChatBubble component
interface ChatBubbleProps {
  message: string;
  isSent: boolean;
}

// ChatBubble component
const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isSent }) => (
  <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
    <div
      className={`${
        isSent ? "bg-primary rounded-br-none" : "bg-gray-600 rounded-bl-none"
      } w-fit px-4 py-2 rounded-lg`}
    >
      {message}
    </div>
  </div>
);

// ChatSection component
const ChatSection: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]); // Adjusted to string[]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Fixed ChangeEvent type
    e.preventDefault();
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (msg: string) => {
      // Added type for msg
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message"); // Changed to 'message'
    };
  }, []); // Removed dependencies

  return (
    <div className="h-fit flex flex-col">
      <div className="flex justify-between w-screen items-center sticky top-20 z-40 bg-primary py-1 px-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-white/70 flex justify-center items-center"></div>
          <div>
            <h1>Pranav Bhosale</h1>
            <p className="text-sm text-gray-200/90">Online</p>
          </div>
        </div>
        <div className="flex text-sm space-x-4">
          <Search />
          <Heart />
          <Bell />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} isSent={index % 2 === 0} />
        ))}
      </div>

      <div className="fixed bottom-0 w-full bg-white p-2">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <Input
            placeholder="Write your message!"
            className="border-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-black flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="ml-2 flex items-center space-x-1">
            <span>Send</span>
            <SendHorizontal className="w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
