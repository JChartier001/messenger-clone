"use client";
import React, { useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div ref={bottomRef} className="pt-24" />
      {messages.map((message, i) => {
        return (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
    </div>
  );
};

export default Body;
