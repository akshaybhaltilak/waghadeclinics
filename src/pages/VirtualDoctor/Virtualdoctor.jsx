import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, RefreshCcw, Info, X, Moon, Sun, Search, Clock, Calendar, Heart, Shield, Activity, Award, Droplet } from 'lucide-react';

const VirtualDoctor = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "👋 Hello! I'm Dr. Virtual, your AI health assistant. How can I help you today? You can describe your symptoms or select a health condition below."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const messagesEndRef = useRef(null);

  // Health responses consolidated and organized by category
  const healthResponses = {
    // Skin conditions
    skin: {
      acne: {
        icon: "🔬",
        symptoms: "Acne causes pimples, blackheads, whiteheads, and cysts on the face, shoulders, chest, and back.",
        advice: "- Wash your face gently twice a day\n- Use non-comedogenic products\n- Avoid squeezing pimples\n- Apply topical treatments with benzoyl peroxide or salicylic acid",
        warning: "Seek medical attention if acne becomes severe or scarring occurs."
      },
      eczema: {
        icon: "🧴",
        symptoms: "Itchy, red, and inflamed skin, often in areas like the face, hands, and feet.",
        advice: "- Use moisturizers regularly\n- Apply hydrocortisone cream\n- Avoid harsh soaps or allergens\n- Take short, lukewarm baths",
        warning: "Consult a dermatologist if symptoms worsen or become infected."
      },
      psoriasis: {
        icon: "🔍",
        symptoms: "Characterized by red, scaly patches of skin, often on elbows, knees, and scalp.",
        advice: "- Moisturize regularly\n- Use topical corticosteroids\n- Avoid triggers like stress or certain medications",
        warning: "If psoriasis affects joints or causes severe discomfort, consult a healthcare provider."
      },
      rosacea: {
        icon: "🌡️",
        symptoms: "Redness, visible blood vessels, and sometimes pimples on the face.",
        advice: "- Use gentle skin care products\n- Avoid triggers like hot drinks and spicy foods\n- Apply sunscreen daily",
        warning: "See a dermatologist if symptoms persist or worsen."
      }
    },
    // Hair conditions
    hair: {
      alopecia: {
        icon: "💇",
        symptoms: "Sudden hair loss in small, round patches on the scalp or body.",
        advice: "- Consider corticosteroid treatments\n- Try wigs or hats to cover hair loss\n- Stress management may help",
        warning: "Consult a dermatologist for treatment options and management."
      },
      malepatternbaldness: {
        icon: "👨",
        symptoms: "Gradual thinning of hair, typically starting at the temples or crown of the head.",
        advice: "- Minoxidil can help slow hair loss\n- Hair transplant surgery may be an option\n- Wear a hat or use hair fibers for coverage",
        warning: "See a dermatologist for personalized treatment options."
      },
      dandruff: {
        icon: "❄️",
        symptoms: "Flaky, itchy scalp with dry skin or oily buildup.",
        advice: "- Use anti-dandruff shampoo\n- Avoid scratching the scalp\n- Keep scalp moisturized",
        warning: "Seek medical advice if dandruff persists or worsens."
      }
    },
    // General conditions
    general: {
      headache: {
        icon: "🤕",
        symptoms: "Pain or discomfort in the head, scalp, or neck.",
        advice: "- Rest in a quiet, dark room\n- Apply a cold or warm compress\n- Stay hydrated\n- Take over-the-counter pain relievers if needed",
        warning: "Seek immediate medical attention if headache is severe, sudden, or accompanied by fever, stiff neck, confusion, seizures, or fainting."
      },
      fever: {
        icon: "🌡️",
        symptoms: "Elevated body temperature, often with chills, sweating, headache, and muscle aches.",
        advice: "- Rest and stay hydrated\n- Take acetaminophen or ibuprofen to reduce fever\n- Use a cool compress\n- Dress in light clothing",
        warning: "Seek medical attention if fever is above 103°F (39.4°C), lasts more than three days, or is accompanied by severe symptoms."
      },
      cough: {
        icon: "😷",
        symptoms: "Forceful expulsion of air from the lungs, may be dry or productive (with mucus).",
        advice: "- Stay hydrated\n- Use honey (if over 1 year old)\n- Try cough drops or lozenges\n- Use a humidifier",
        warning: "See a doctor if cough lasts more than two weeks, produces thick, discolored mucus, or is accompanied by fever or difficulty breathing."
      }
    },
    // Default response
    default: {
      icon: "👨‍⚕️",
      response: "I understand you're experiencing health concerns. While I can provide general information, it's important to consult with a healthcare provider for proper diagnosis and treatment.",
      advice: "In the meantime:\n- Keep track of your symptoms\n- Note when they started\n- Document any triggers or patterns\n- Maintain good general health practices",
      warning: "If you experience severe symptoms or feel your condition is urgent, please seek immediate medical attention."
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate response based on user input
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Search through all categories and conditions
    for (const category in healthResponses) {
      if (category === 'default') continue;
      
      for (const condition in healthResponses[category]) {
        if (input.includes(condition)) {
          const response = healthResponses[category][condition];
          return `${response.icon} **${condition.replace(/_/g, ' ').toUpperCase()}**\n\n${response.symptoms}\n\n**✅ Recommended actions:**\n${response.advice}\n\n**⚠️ Warning:**\n${response.warning}`;
        }
      }
    }
    
    return `${healthResponses.default.icon} ${healthResponses.default.response}\n\n**✅ General advice:**\n${healthResponses.default.advice}\n\n**⚠️ Warning:**\n${healthResponses.default.warning}`;
  };

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: generateResponse(input) }]);
      setIsTyping(false);
    }, 800);
  };

  // Reset conversation
  const handleReset = () => {
    setMessages([messages[0]]);
  };

  // Handle condition selection
  const handleConditionClick = (condition) => {
    setInput(condition);
    setShowBooking(false);
  };

  // Filter conditions based on search query and active tab
  const getFilteredConditions = () => {
    const allConditions = [];
    
    for (const category in healthResponses) {
      if (category === 'default') continue;
      if (activeTab !== 'all' && activeTab !== category) continue;
      
      for (const condition in healthResponses[category]) {
        if (!searchQuery || condition.includes(searchQuery.toLowerCase())) {
          allConditions.push({
            category,
            name: condition,
            icon: healthResponses[category][condition].icon,
            displayName: condition.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          });
        }
      }
    }
    
    return allConditions;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'skin': return <Droplet className="h-4 w-4" />;
      case 'hair': return <Activity className="h-4 w-4" />;
      case 'general': return <Heart className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto h-[700px] flex flex-col rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header with enhanced features */}
      <div className={`relative overflow-hidden
        ${darkMode 
          ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900' 
          : 'bg-gradient-to-r from-[#2E5077] via-[#4DA1A9] to-[#2E5077]'} 
        text-white p-4`}>
        
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white w-20 h-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + (Math.random() * 0.1)
              }}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-white/20 ${darkMode ? 'text-purple-200' : 'text-teal-100'}`}>
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Virtual Doctor</h1>
              <p className="text-sm opacity-90">AI-Powered Health Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full hover:bg-white/20 transition-colors
                ${darkMode ? 'bg-purple-900/50' : 'bg-teal-800/30'}`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={handleReset}
              className={`p-2 rounded-full hover:bg-white/20 transition-colors
                ${darkMode ? 'bg-purple-900/50' : 'bg-teal-800/30'}`}
              aria-label="Reset conversation"
            >
              <RefreshCcw className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setShowBooking(!showBooking)}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1 transition-all
                ${darkMode ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-teal-700 hover:bg-teal-600'}`}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking interface - enhanced design */}
      {showBooking && (
        <div className={`p-4 border-b ${darkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
          : 'bg-gradient-to-br from-blue-50 to-teal-50 border-blue-100'}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <Calendar className={`h-4 w-4 ${darkMode ? 'text-purple-400' : 'text-teal-600'}`} />
              Book a Doctor's Appointment
            </h3>
            <button 
              onClick={() => setShowBooking(false)} 
              className={`p-1.5 rounded-full ${darkMode 
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {["Today", "Tomorrow", "Next Week"].map(day => (
              <button 
                key={day}
                className={`p-2 rounded-lg text-center text-sm font-medium transition-all duration-200 transform hover:scale-105 ${darkMode 
                  ? 'bg-gray-800 hover:bg-indigo-900 border border-gray-700 hover:border-indigo-700' 
                  : 'bg-white hover:bg-teal-500 hover:text-white border border-gray-200 hover:border-teal-500'}`}
              >
                {day}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"].map(time => (
              <button 
                key={time}
                className={`p-2 rounded-lg text-center text-sm flex items-center justify-center gap-1
                  transition-all duration-200 transform hover:scale-105 hover:shadow-md ${darkMode 
                  ? 'bg-gray-800 hover:bg-indigo-700 border border-gray-700 hover:border-indigo-600' 
                  : 'bg-white hover:bg-teal-500 hover:text-white border border-gray-200 hover:border-teal-500'}`}
              >
                <Clock className="h-3 w-3" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Container - Enhanced styling */}
      <div className={`flex-1 overflow-y-auto p-4 ${darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} 
                animate-fadeIn transition-all duration-300`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
                  msg.type === 'user' 
                    ? `${darkMode 
                        ? 'bg-gradient-to-br from-indigo-700 to-purple-900 text-white' 
                        : 'bg-gradient-to-br from-[#2E5077] to-[#4DA1A9] text-white'}`
                    : darkMode 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-700' 
                        : 'bg-white border border-gray-100'
                }`} 
              >
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-[#4DA1A9] animate-pulse">
              <div className="w-2 h-2 rounded-full bg-[#4DA1A9] animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-[#4DA1A9] animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-[#4DA1A9] animate-bounce delay-200"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Category tabs */}
      <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'}`}>
        <div className="flex justify-between overflow-x-auto scrollbar-hide">
          {[
            { id: 'all', name: 'All Conditions', icon: <Shield className="h-4 w-4" /> },
            { id: 'skin', name: 'Skin', icon: <Droplet className="h-4 w-4" /> },
            { id: 'hair', name: 'Hair', icon: <Activity className="h-4 w-4" /> },
            { id: 'general', name: 'General Health', icon: <Heart className="h-4 w-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 text-sm font-medium flex items-center justify-center gap-1.5
                transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? darkMode 
                      ? 'border-purple-500 text-purple-400' 
                      : 'border-teal-500 text-teal-600'
                    : darkMode
                      ? 'border-transparent text-gray-500 hover:text-gray-300' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Health Categories Section with Search */}
      <div className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'}`}>
        <div className="p-3">
          {/* Search - Enhanced styling */}
          <div className="mb-3 relative">
            <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              className={`w-full p-2 pl-10 rounded-full border 
                transition-all shadow-sm text-sm
                ${darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-600 focus:ring-purple-600' 
                  : 'border-gray-200 focus:ring-teal-500 focus:border-teal-500'}
                focus:outline-none focus:ring-2`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health conditions..."
            />
          </div>
          
          {/* Categories - Enhanced pill design */}
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="flex gap-2 flex-wrap">
              {getFilteredConditions().map(({ name, displayName, category, icon }) => (
                <button
                  key={name}
                  onClick={() => handleConditionClick(name)}
                  className={`px-3 py-1.5 text-sm rounded-full 
                    flex items-center gap-1
                    transition-all duration-200 transform hover:scale-105
                    hover:shadow-md ${darkMode 
                    ? 'bg-gray-800 hover:bg-indigo-700 text-gray-300 hover:text-white border border-gray-700 hover:border-indigo-600' 
                    : 'bg-gradient-to-r from-[#4DA1A9]/5 to-[#2E5077]/5 hover:from-[#4DA1A9] hover:to-[#2E5077] text-[#2E5077] hover:text-white border border-[#4DA1A9]/20 hover:border-transparent'}`}
                >
                  <span>{icon}</span>
                  {displayName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Form - Enhanced styling */}
        <div className="p-3 pt-1">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              className={`flex-1 p-3 rounded-full border
                transition-all shadow-md
                ${darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500' 
                  : 'border-gray-200 focus:ring-[#4DA1A9] focus:border-[#4DA1A9]'}
                focus:outline-none focus:ring-2`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms or ask a health question..."
            />
            <button 
              type="submit" 
              className={`p-3 rounded-full 
                ${darkMode 
                  ? 'bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-[#4DA1A9] to-[#2E5077] hover:from-[#5DB2BA] hover:to-[#3F6188]'}
                text-white 
                shadow-md hover:shadow-lg transform hover:scale-105
                transition-all duration-200`}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          {/* Health assistance badge */}
          <div className="mt-2 flex justify-center">
            <div className={`text-xs flex items-center gap-1 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <Award className="h-3 w-3" />
              <span>For informational purposes only • Not a substitute for professional medical advice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualDoctor;
