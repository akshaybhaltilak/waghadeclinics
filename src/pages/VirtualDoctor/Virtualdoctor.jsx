import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, RefreshCcw, Info, X, Moon, Sun, Search, Clock, Calendar } from 'lucide-react';

const VirtualDoctor = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm Dr. Virtual, your AI health assistant. Please describe your symptoms or select a health condition below."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const messagesEndRef = useRef(null);

  // Health responses consolidated and organized by category
  const healthResponses = {
    // Skin conditions
    skin: {
      acne: {
        symptoms: "Acne causes pimples, blackheads, whiteheads, and cysts on the face, shoulders, chest, and back.",
        advice: "- Wash your face gently twice a day\n- Use non-comedogenic products\n- Avoid squeezing pimples\n- Apply topical treatments with benzoyl peroxide or salicylic acid",
        warning: "Seek medical attention if acne becomes severe or scarring occurs."
      },
      eczema: {
        symptoms: "Itchy, red, and inflamed skin, often in areas like the face, hands, and feet.",
        advice: "- Use moisturizers regularly\n- Apply hydrocortisone cream\n- Avoid harsh soaps or allergens\n- Take short, lukewarm baths",
        warning: "Consult a dermatologist if symptoms worsen or become infected."
      },
      psoriasis: {
        symptoms: "Characterized by red, scaly patches of skin, often on elbows, knees, and scalp.",
        advice: "- Moisturize regularly\n- Use topical corticosteroids\n- Avoid triggers like stress or certain medications",
        warning: "If psoriasis affects joints or causes severe discomfort, consult a healthcare provider."
      },
      rosacea: {
        symptoms: "Redness, visible blood vessels, and sometimes pimples on the face.",
        advice: "- Use gentle skin care products\n- Avoid triggers like hot drinks and spicy foods\n- Apply sunscreen daily",
        warning: "See a dermatologist if symptoms persist or worsen."
      }
    },
    // Hair conditions
    hair: {
      alopecia: {
        symptoms: "Sudden hair loss in small, round patches on the scalp or body.",
        advice: "- Consider corticosteroid treatments\n- Try wigs or hats to cover hair loss\n- Stress management may help",
        warning: "Consult a dermatologist for treatment options and management."
      },
      malepatternbaldness: {
        symptoms: "Gradual thinning of hair, typically starting at the temples or crown of the head.",
        advice: "- Minoxidil can help slow hair loss\n- Hair transplant surgery may be an option\n- Wear a hat or use hair fibers for coverage",
        warning: "See a dermatologist for personalized treatment options."
      },
      dandruff: {
        symptoms: "Flaky, itchy scalp with dry skin or oily buildup.",
        advice: "- Use anti-dandruff shampoo\n- Avoid scratching the scalp\n- Keep scalp moisturized",
        warning: "Seek medical advice if dandruff persists or worsens."
      }
    },
    // General conditions
    general: {
      headache: {
        symptoms: "Pain or discomfort in the head, scalp, or neck.",
        advice: "- Rest in a quiet, dark room\n- Apply a cold or warm compress\n- Stay hydrated\n- Take over-the-counter pain relievers if needed",
        warning: "Seek immediate medical attention if headache is severe, sudden, or accompanied by fever, stiff neck, confusion, seizures, or fainting."
      },
      fever: {
        symptoms: "Elevated body temperature, often with chills, sweating, headache, and muscle aches.",
        advice: "- Rest and stay hydrated\n- Take acetaminophen or ibuprofen to reduce fever\n- Use a cool compress\n- Dress in light clothing",
        warning: "Seek medical attention if fever is above 103°F (39.4°C), lasts more than three days, or is accompanied by severe symptoms."
      },
      cough: {
        symptoms: "Forceful expulsion of air from the lungs, may be dry or productive (with mucus).",
        advice: "- Stay hydrated\n- Use honey (if over 1 year old)\n- Try cough drops or lozenges\n- Use a humidifier",
        warning: "See a doctor if cough lasts more than two weeks, produces thick, discolored mucus, or is accompanied by fever or difficulty breathing."
      }
    },
    // Default response
    default: {
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
          return `**${condition.replace(/_/g, ' ').toUpperCase()}**\n\n${response.symptoms}\n\n**Recommended actions:**\n${response.advice}\n\n**Warning:**\n${response.warning}`;
        }
      }
    }
    
    return `${healthResponses.default.response}\n\n**General advice:**\n${healthResponses.default.advice}\n\n**Warning:**\n${healthResponses.default.warning}`;
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

  // Filter conditions based on search query
  const getFilteredConditions = () => {
    const allConditions = [];
    
    for (const category in healthResponses) {
      if (category === 'default') continue;
      
      for (const condition in healthResponses[category]) {
        if (!searchQuery || condition.includes(searchQuery.toLowerCase())) {
          allConditions.push({
            category,
            name: condition,
            displayName: condition.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          });
        }
      }
    }
    
    return allConditions;
  };

  return (
    <div className={`max-w-4xl mx-auto h-[700px] flex flex-col rounded-lg shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header with enhanced features */}
      <div className={`bg-gradient-to-br ${darkMode ? 'from-[#234567] to-[#123456]' : 'from-[#4DA1A9] to-[#2E5077]'} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <MessageCircle className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Virtual Doctor</h1>
            <p className="text-sm opacity-90">Your AI Health Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button 
            onClick={handleReset}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Reset conversation"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setShowBooking(!showBooking)}
            className="px-3 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Booking interface */}
      {showBooking && (
        <div className={`p-4 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-100'}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Book a Doctor's Appointment</h3>
            <button onClick={() => setShowBooking(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {["Today", "Tomorrow", "Next Week"].map(day => (
              <button 
                key={day}
                className={`p-2 rounded text-center text-sm ${darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-white hover:bg-gray-100 border border-gray-200'}`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"].map(time => (
              <button 
                key={time}
                className={`p-2 rounded text-center text-sm flex items-center justify-center gap-1 ${darkMode 
                  ? 'bg-gray-700 hover:bg-blue-700' 
                  : 'bg-white hover:bg-blue-500 hover:text-white border border-gray-200'}`}
              >
                <Clock className="h-3 w-3" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? `bg-gradient-to-br ${darkMode ? 'from-blue-700 to-blue-900' : 'from-[#4DA1A9] to-[#2E5077]'} text-white`
                    : darkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-sm`} 
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

      {/* Health Categories Section with Search */}
      <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'}`}>
        <div className="p-3">
          {/* Search */}
          <div className="mb-3 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              className={`w-full p-2 pl-10 rounded-full border 
                ${darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-600' 
                  : 'border-gray-200 focus:ring-[#4DA1A9]'}
                focus:outline-none focus:ring-2
                transition-all shadow-sm text-sm`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health conditions..."
            />
          </div>
          {/* Categories */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 flex-wrap">
              {getFilteredConditions().map(({ name, displayName, category }) => (
                <button
                  key={name}
                  onClick={() => handleConditionClick(name)}
                  className={`px-3 py-1.5 text-sm rounded-full 
                    ${darkMode 
                      ? 'bg-gray-800 hover:bg-blue-700 text-blue-300 hover:text-white border border-gray-700' 
                      : 'bg-gradient-to-r from-[#4DA1A9]/10 to-[#2E5077]/10 hover:from-[#4DA1A9] hover:to-[#2E5077] text-[#2E5077] hover:text-white border border-[#4DA1A9]/20'}
                    transition-all duration-200 transform hover:scale-105
                    hover:border-transparent
                    whitespace-nowrap shadow-sm hover:shadow-md`}
                >
                  {displayName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 pt-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              className={`flex-1 p-3 rounded-full border
                ${darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-600' 
                  : 'border-gray-200 focus:ring-[#4DA1A9]'}
                focus:outline-none focus:ring-2
                transition-all shadow-sm`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms or ask a health question..."
            />
            <button 
              type="submit" 
              className={`p-3 rounded-full 
                ${darkMode 
                  ? 'bg-blue-700 hover:bg-blue-600' 
                  : 'bg-gradient-to-r from-[#4DA1A9] to-[#2E5077] hover:opacity-90'}
                text-white 
                shadow-md hover:shadow-lg transform hover:scale-105
                transition-all duration-200`}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VirtualDoctor;
