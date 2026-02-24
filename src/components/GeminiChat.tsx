"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const updatedChat = [...chat, { role: "user", text: message }];
    setChat(updatedChat);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setChat([
        ...updatedChat,
        { role: "ai", text: data.reply || "Let me restyle that thought ✨" },
      ]);
    } catch {
      setChat([
        ...updatedChat,
        { role: "ai", text: "Oops. Even fashion AI needs a moment 💅" },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#C9956A] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[420px] bg-[#1A1A2E] text-white rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden z-50">
          <div className="p-4 border-b border-gray-800 font-semibold">
            StyleSense AI ✦
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-white text-black ml-auto"
                    : "bg-gray-800"
                } max-w-[75%]`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="animate-pulse text-gray-400 text-sm">
                Styling your response ✨
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-800 flex gap-2">
            <input
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-2 text-sm outline-none"
              placeholder="Ask about your outfit..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-[#C9956A] px-4 rounded-xl text-sm hover:scale-105 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}