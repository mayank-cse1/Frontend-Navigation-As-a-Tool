import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Analyze from "./pages/Analyze";
import AboutPage from "./pages/AboutPage";
import ChatbotWidget from './components/ChatbotWidget';

export default function App() {
  return (
    <Router>
      {/* Chatbot is placed outside Routes to appear on every page */}
      <ChatbotWidget />

      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/analyze" element={<Analyze />} />
        <Route exact path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
