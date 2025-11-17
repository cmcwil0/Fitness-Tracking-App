import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Nutrition from './pages/Nutrition';
import Fitness from './pages/Fitness';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GoalForm from './pages/GoalForm';
import SignUpForm from './pages/SignUpForm';
import UserProfile from './pages/UserProfile';
import { ChatProvider, ChatWidget } from './chatbot';

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goalform" element={<GoalForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
      <ChatWidget />
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;