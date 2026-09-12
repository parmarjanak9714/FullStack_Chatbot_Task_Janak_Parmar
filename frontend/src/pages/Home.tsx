import { useState } from "react";
import { Link } from "react-router-dom";

interface Message {
  sender: "user" | "bot";
  text: string;
  showEnquiry?: boolean;
}

function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const getBotResponse = (message: string): string => {
    const text = message.toLowerCase();

    if (text.includes("course")) {
      return "We provide information and support related to our courses. Please submit an enquiry for more details.";
    }

    if (text.includes("price") || text.includes("fee")) {
      return "For current course fees and pricing details, please submit an enquiry.";
    }

    if (text.includes("contact")) {
      return "Please submit your contact details through the enquiry form and our team will get in touch with you.";
    }

    if (text.includes("admission")) {
      return "For admission-related information, please submit an enquiry with your requirements.";
    }

    if (text.includes("hello") || text.includes("hi")) {
      return "Hello! How can I assist you?";
    }

    return "I'm sorry, I didn't understand that. Please ask about courses, fees, admission or contact information.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
    };

    const botMessage: Message = {
      sender: "bot",
      text: getBotResponse(input),
      showEnquiry:
        input.toLowerCase().includes("course") ||
        input.toLowerCase().includes("price") ||
        input.toLowerCase().includes("fee") ||
        input.toLowerCase().includes("admission") ||
        input.toLowerCase().includes("contact"),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="bg-blue-600 px-6 py-5 text-white">
          <h1 className="text-xl font-bold">AI Support & Lead Assistant</h1>
          <p className="mt-1 text-sm text-blue-100">Ask us your questions</p>
          <Link
            to="/enquiry"
            className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-gray-100">
            Submit Enquiry
          </Link>
        </div>

        <div className="h-[450px] space-y-4 overflow-y-auto p-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}>
                {message.text}

                {message.showEnquiry && (
                  <Link
                    to="/enquiry"
                    className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Submit Enquiry
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 border-t p-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>

          <button
            onClick={handleSend}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
