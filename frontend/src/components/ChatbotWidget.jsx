import { useState, useEffect, useRef } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import startTour from './startTour'; // 🔥 Importing your tour utility
import 'shepherd.js/dist/css/shepherd.css';

const ChatbotWidget = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('https://potential-space-fortnight-x5p74p6qv76xf67pg-8000.app.github.dev/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const isTour = data.tour_required;

      const userBotMessage = {
        text: data.reply || 'No response received.',
        sender: 'bot',
        isTour: isTour,
        tourPage: data.tour // 👈 dynamic page name e.g., "analyze"
      };

      setMessages((prev) => [...prev, userBotMessage]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: '⚠️ Something went wrong. Please try again.', sender: 'bot' }
      ]);
    }
  };

  const handleStartTour = async (page) => {
    let redirect_page = page
    if (page == "navbar"){
        redirect_page = ""
    }
    if (location.pathname !== `/${redirect_page}`) {
      navigate(`/${redirect_page}`);
      setTimeout(() => startTour(redirect_page), 500); // small delay after navigation
    } else {
      startTour(redirect_page); // if already on the same page
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {chatOpen && (
        <div
          className="fixed bottom-20 right-4 bg-white border rounded-lg shadow-xl z-50 flex flex-col"
          style={{ width: '25%', height: '50%' }}
        >
          <div className="p-3 bg-purple-700 text-white font-semibold rounded-t-lg">
            🧠 Article Insight Guide
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-md max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-purple-100 self-end text-right ml-auto'
                    : 'bg-gray-100 self-start text-left'
                }`}
              >
                <div className="chat-message">
                    <p>{msg.text}</p>

                    {msg.isTour && (
                        <button
                        onClick={() => handleStartTour(msg.tourPage)}
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                        Start Tour 🚀
                        </button>
                    )}
                    </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Ask your article-related question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-purple-700 text-white text-sm px-3 py-1 rounded hover:bg-purple-600"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-purple-700 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-purple-600 z-50"
        title="Chat with Article Guide"
      >
        💬
      </button>
    </>
  );
};

export default ChatbotWidget;
