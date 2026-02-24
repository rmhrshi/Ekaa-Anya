"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function GeminiChat() {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const updatedChat: Message[] = [
      ...chat,
      { role: "user", text: message },
    ];

    setChat(updatedChat);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          context: "Luxury AI fashion platform",
        }),
      });

      const data = await res.json();

      setChat([
        ...updatedChat,
        { role: "ai", text: data.reply || "No response" },
      ]);
    } catch (error) {
      setChat([
        ...updatedChat,
        { role: "ai", text: "Something went wrong." },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="bg-black text-white p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-light mb-4 tracking-wide">
        AI Fashion Assistant
      </h2>

      <div className="h-80 overflow-y-auto mb-4 space-y-3">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl ${
              msg.role === "user"
                ? "bg-white text-black ml-auto"
                : "bg-gray-900"
            } max-w-[75%]`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="animate-pulse text-gray-400">
            AI is thinking...
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-3 outline-none focus:border-white"
          placeholder="Ask about your outfit..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-white text-black px-6 rounded-xl hover:scale-105 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}