import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import startTour from './startTour';
import 'shepherd.js/dist/css/shepherd.css';

const ChatbotWidget = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Voice setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        console.error('🎙️ Speech recognition error:', e);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript); // Auto-send voice input
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const sendMessage = async (msgText = input) => {
    if (!msgText.trim()) return;

    const userMsg = { text: msgText, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText })
      });

      const data = await res.json();

      const userBotMessage = {
        text: data.reply || 'No response received.',
        sender: 'bot',
        isTour: data.tour_required,
        tourPage: data.tour
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
    let redirect_page = page === "navbar" ? "" : page;
    if (location.pathname !== `/${redirect_page}`) {
      navigate(`/${redirect_page}`);
      setTimeout(() => startTour(redirect_page), 500);
    } else {
      startTour(redirect_page);
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
            {/* 🎤 Voice Input Button */}
            {'webkitSpeechRecognition' in window || 'SpeechRecognition' in window ? (
              <button
                onClick={() => recognitionRef.current?.start()}
                className={`text-xl px-2 ${
                  isListening ? 'text-red-500 animate-pulse' : 'text-gray-600'
                }`}
                title="Speak your question"
              >
                🎤
              </button>
            ) : null}

            <button
              onClick={() => sendMessage()}
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
