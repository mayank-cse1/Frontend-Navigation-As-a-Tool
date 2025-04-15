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
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleStartTour = (page) => {
    const redirect_page = page === 'navbar' ? '' : page;
    if (location.pathname !== `/${redirect_page}`) {
      navigate(`/${redirect_page}`);
      setTimeout(() => startTour(redirect_page), 500);
    } else {
      startTour(redirect_page);
    }
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'purple';

      ctx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => stopListening();
    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e);
      stopListening();
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    sourceRef.current.connect(analyserRef.current);

    drawWaveform();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
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

          {isListening && (
            <div className="px-3 pb-2">
              <canvas
                ref={canvasRef}
                width={250}
                height={60}
                className="border rounded mb-2"
              />
              <button
                onClick={stopListening}
                className="text-xs text-red-600 border border-red-500 px-2 py-1 rounded hover:bg-red-100 w-full"
              >
                Stop Listening
              </button>
            </div>
          )}

          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Ask your article-related question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            {'webkitSpeechRecognition' in window || 'SpeechRecognition' in window ? (
              <button
                onClick={startListening}
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
