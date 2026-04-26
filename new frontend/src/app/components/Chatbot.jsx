import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Plus } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);

  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFileData({
        base64: reader.result,
        fileName: file.name,
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSend = async () => {
    if (!fileData && !input.trim()) return;

    const currentFile = fileData;
    const currentInput = input.trim();

    if (currentFile) {
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: currentInput || "",
          image: currentFile.base64,
        },
      ]);
    } else if (currentInput) {
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: currentInput,
        },
      ]);
    }

    setInput("");
    setFileData(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: currentFile?.base64 || null,
          fileName: currentFile?.fileName || null,
          message: currentInput || null,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `${data.part_name}\n${data.explanation}`,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Error occurred. Try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-[#2678ff] hover:bg-[#1f6ef2] text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageCircle size={24} />
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h3 className="font-semibold text-lg">AI Chatbot</h3>
          <button onClick={() => setOpen(false)} className="cursor-pointer">
            <X />
          </button>
        </div>

        <div className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm max-w-[80%] ${
                msg.type === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  className="rounded-lg max-h-32 mb-1"
                />
              )}

              {msg.text && (
                <div
                  className={`p-2 rounded-lg whitespace-pre-line ${
                    msg.type === "user"
                      ? "bg-[#2678ff] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {loading && <p className="text-blue-500 text-sm">Analyzing...</p>}

          <div ref={chatEndRef} />
        </div>

        <div className="border-t p-3 shrink-0 bg-white">
          {fileData && (
            <div className="mb-2 relative w-[54px] h-[54px]">
              <img
                src={fileData.base64}
                alt="preview"
                className="w-full h-full object-cover rounded-lg border"
              />
              <button
                onClick={() => setFileData(null)}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />

            <button
              onClick={() => fileRef.current.click()}
              className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-lg"
            >
              <Plus size={18} />
            </button>

            <input
              type="text"
              placeholder="Ask something or upload image..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
            />

            <button
              onClick={handleSend}
              className="bg-[#2678ff] hover:bg-[#1f6ef2] text-white p-2 rounded-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}