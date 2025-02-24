import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  RefreshCcw, 
  Info, 
  X, 
  Bookmark, 
  Share2, 
  Menu, 
  Calendar, 
  Download, 
  Clock, 
  HelpCircle, 
  Shield,
  Moon, 
  Sun,
  Zap,
  Heart,
  AlertCircle
} from 'lucide-react';

const VirtualDoctor = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm Dr. Virtual, your AI health assistant. How can I help you today? You can describe your symptoms or select from the health categories below."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [savedResponses, setSavedResponses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('normal');
  const messagesEndRef = useRef(null);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [availableSymptoms] = useState([
    'Fever', 'Cough', 'Fatigue', 'Shortness of breath', 'Headache',
    'Sore throat', 'Runny nose', 'Body aches', 'Dizziness', 'Nausea',
    'Rash', 'Joint pain', 'Chest pain', 'Abdominal pain', 'Diarrhea'
  ]);
  const [showDiagnosticSummary, setShowDiagnosticSummary] = useState(false);
  const [diagnosticSummary, setDiagnosticSummary] = useState(null);
  
  // Health categories organized by body system
  const healthCategories = {
    "Skin Conditions": ["acne", "eczema", "psoriasis", "rosacea", "vitiligo", "fungal_infections", "impetigo", "skincancer", "contactdermatitis", "hives"],
    "Hair & Scalp": ["alopecia_areata", "malepatternbaldness", "female_pattern_hair_loss", "telogen_effluvium", "trichotillomania", "dandruff", "tinea_capitis", "folliculitis", "scalp_psoriasis", "hirsutism"],
    "Respiratory": ["asthma", "bronchitis", "pneumonia", "covid19", "flu", "sinusitis", "tuberculosis"],
    "Digestive": ["gerd", "ibs", "ulcers", "crohns", "celiac", "gallstones", "appendicitis"],
    "Cardiovascular": ["hypertension", "heartattack", "stroke", "arrhythmia", "heartfailure", "angina"],
    "Neurological": ["migraine", "epilepsy", "alzheimers", "parkinsons", "multiplesclerosis", "concussion"]
  };

  // Health responses object
  const healthResponses = {
    acne: {
        symptoms: "Acne causes pimples, blackheads, whiteheads, and cysts on the face, shoulders, chest, and back.",
        advice: "- Wash your face gently twice a day\n- Use non-comedogenic products\n- Avoid squeezing pimples\n- Apply topical treatments with benzoyl peroxide or salicylic acid",
        warning: "Seek medical attention if acne becomes severe or scarring occurs.",
        urgency: "low"
      },
      eczema: {
          symptoms: "Itchy, red, and inflamed skin, often in areas like the face, hands, and feet.",
          advice: "- Use moisturizers regularly\n- Apply hydrocortisone cream\n- Avoid harsh soaps or allergens\n- Take short, lukewarm baths",
          warning: "Consult a dermatologist if symptoms worsen or become infected.",
          urgency: "medium"
        },
        psoriasis: {
          symptoms: "Characterized by red, scaly patches of skin, often on elbows, knees, and scalp.",
          advice: "- Moisturize regularly\n- Use topical corticosteroids\n- Avoid triggers like stress or certain medications",
          warning: "If psoriasis affects joints or causes severe discomfort, consult a healthcare provider.",
          urgency: "medium"
        },
        rosacea: {
          symptoms: "Redness, visible blood vessels, and sometimes pimples on the face.",
          advice: "- Use gentle skin care products\n- Avoid triggers like hot drinks and spicy foods\n- Apply sunscreen daily",
          warning: "See a dermatologist if symptoms persist or worsen.",
          urgency: "low"
        },
        vitiligo: {
          symptoms: "Loss of skin color, leading to white patches on different parts of the body.",
          advice: "- Protect skin from the sun\n- Use cosmetics to conceal spots\n- Consider treatments like topical steroids",
          warning: "Consult a healthcare provider for treatment options.",
          urgency: "low"
        },
        fungal_infections: {
          symptoms: "Red, itchy, scaly patches on the skin, sometimes with blisters.",
          advice: "- Keep affected area dry and clean\n- Use antifungal creams\n- Avoid sharing personal items",
          warning: "Seek medical help if infection spreads or doesn't improve.",
          urgency: "medium"
        },
        impetigo: {
          symptoms: "Red sores that can ooze and crust over, often around the nose and mouth.",
          advice: "- Wash affected areas gently\n- Apply prescribed antibiotic ointment\n- Avoid scratching",
          warning: "Contact a healthcare professional for prescription treatments.",
          urgency: "medium"
        },
        skincancer: {
          symptoms: "Changes in the appearance of moles or skin lesions, such as irregular edges or unusual growth.",
          advice: "- Regularly check your skin for changes\n- Apply sunscreen daily\n- Avoid tanning beds",
          warning: "Seek immediate medical attention if you notice changes in existing moles or skin lesions.",
          urgency: "high"
        },
        contactdermatitis: {
          symptoms: "Red, itchy rash caused by direct contact with an irritant or allergen.",
          advice: "- Avoid the substance that caused the rash\n- Use anti-itch creams\n- Take cool baths",
          warning: "Consult a healthcare provider if rash worsens or spreads.",
          urgency: "medium"
        },
        hives: {
          symptoms: "Raised, red, itchy welts on the skin, often triggered by stress or allergens.",
          advice: "- Take antihistamines\n- Apply cool compresses\n- Avoid known triggers",
          warning: "If hives persist or are accompanied by difficulty breathing, seek immediate medical attention.",
          urgency: "medium-high"
        },
        alopecia_areata: {
          symptoms: "Sudden hair loss in small, round patches on the scalp or body.",
          advice: "- Consider corticosteroid treatments\n- Try wigs or hats to cover hair loss\n- Stress management may help",
          warning: "Consult a dermatologist for treatment options and management.",
          urgency: "low"
        },
        malepatternbaldness: {
          symptoms: "Gradual thinning of hair, typically starting at the temples or crown of the head.",
          advice: "- Minoxidil can help slow hair loss\n- Hair transplant surgery may be an option\n- Wear a hat or use hair fibers for coverage",
          warning: "See a dermatologist for personalized treatment options.",
          urgency: "low"
        },
        female_pattern_hair_loss: {
          symptoms: "Thinning of hair along the crown or parting area, without bald spots.",
          advice: "- Use volumizing shampoos\n- Consider medications like minoxidil\n- Avoid tight hairstyles that stress the hair",
          warning: "Consult a healthcare provider to rule out underlying causes.",
          urgency: "low"
        },
        telogen_effluvium: {
          symptoms: "Temporary hair shedding due to stress, illness, or hormonal changes.",
          advice: "- Practice stress-reducing activities\n- Avoid harsh hair treatments\n- Maintain a balanced diet",
          warning: "Consult a doctor if hair loss continues for more than six months.",
          urgency: "low"
        },
        trichotillomania: {
          symptoms: "Compulsive hair-pulling, often leading to noticeable hair loss.",
          advice: "- Seek therapy or counseling\n- Practice relaxation techniques\n- Use behavioral interventions",
          warning: "Consult a mental health professional for therapy options.",
          urgency: "medium"
        },
        dandruff: {
          symptoms: "Flaky, itchy scalp with dry skin or oily buildup.",
          advice: "- Use anti-dandruff shampoo\n- Avoid scratching the scalp\n- Keep scalp moisturized",
          warning: "Seek medical advice if dandruff persists or worsens.",
          urgency: "low"
        },
        tinea_capitis: {
          symptoms: "Scaly patches on the scalp, sometimes with hair loss.",
          advice: "- Use antifungal shampoo or treatment\n- Avoid sharing combs or hats\n- Keep scalp dry and clean",
          warning: "Consult a doctor if symptoms don't improve with over-the-counter treatment.",
          urgency: "medium"
        },
        folliculitis: {
          symptoms: "Red, inflamed hair follicles, often with pimples or pustules.",
          advice: "- Wash the area gently\n- Apply warm compresses\n- Use antibiotic ointment if prescribed",
          warning: "If infection persists or spreads, see a healthcare provider.",
          urgency: "medium"
        },
        scalp_psoriasis: {
          symptoms: "Scaly, red patches on the scalp, often accompanied by itching.",
          advice: "- Use medicated shampoos\n- Apply topical corticosteroids\n- Avoid scratching",
          warning: "Consult a dermatologist for treatment options.",
          urgency: "medium"
        },
        hirsutism: {
          symptoms: "Excessive hair growth on the face, chest, or back in women.",
          advice: "- Consider hair removal options like waxing or shaving\n- Hormonal treatments may be effective\n- Maintain a healthy diet and weight",
          warning: "Consult a healthcare provider to determine the underlying cause.",
          urgency: "low"
        },
        // Added new conditions for other categories
        asthma: {
          symptoms: "Wheezing, shortness of breath, chest tightness, and coughing.",
          advice: "- Use prescribed inhalers as directed\n- Avoid known triggers\n- Create an asthma action plan",
          warning: "Seek emergency care if experiencing severe shortness of breath that doesn't improve with medication.",
          urgency: "medium-high"
        },
        covid19: {
          symptoms: "Fever, cough, fatigue, loss of taste or smell, shortness of breath.",
          advice: "- Rest and stay hydrated\n- Monitor symptoms closely\n- Isolate to prevent spreading\n- Take over-the-counter medications for symptom relief",
          warning: "Seek immediate medical attention if experiencing severe shortness of breath, persistent chest pain, confusion, or bluish lips or face.",
          urgency: "high"
        },
        hypertension: {
          symptoms: "Often asymptomatic, but may include headaches, shortness of breath, or nosebleeds in severe cases.",
          advice: "- Monitor blood pressure regularly\n- Maintain a healthy diet low in sodium\n- Exercise regularly\n- Take prescribed medications as directed",
          warning: "Seek emergency care if blood pressure is extremely high (180/120 or higher) and accompanied by symptoms.",
          urgency: "medium-high"
        },
        migraine: {
          symptoms: "Intense, throbbing headache, often with nausea, vomiting, and sensitivity to light and sound.",
          advice: "- Rest in a dark, quiet room\n- Apply cold compresses\n- Take prescribed medications at first sign of migraine\n- Identify and avoid triggers",
          warning: "Seek immediate medical attention if headache is sudden and severe, or accompanied by fever, stiff neck, confusion, seizures, double vision, weakness, numbness, or difficulty speaking.",
          urgency: "medium"
        },
        default: {
          response: "I understand you're experiencing health concerns. While I can provide general information, it's important to consult with a healthcare provider for proper diagnosis and treatment. They can perform a physical examination and order any necessary tests.",
          advice: "In the meantime:\n- Keep track of your symptoms\n- Note when they started\n- Document any triggers or patterns\n- Maintain good general health practices",
          warning: "If you experience severe symptoms or feel your condition is urgent, please seek immediate medical attention.",
          urgency: "unknown"
        }
      };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const disease = Object.keys(healthResponses).find(disease => input.includes(disease));
    
    if (disease) {
      const response = healthResponses[disease];
      setUrgencyLevel(response.urgency || 'normal');
      return `**${disease.replace(/_/g, ' ').toUpperCase()}**\n\n${response.symptoms}\n\n**Recommended actions:**\n${response.advice}\n\n**Warning:**\n${response.warning}`;
    } else {
      setUrgencyLevel('normal');
      return `${healthResponses.default.response}\n\n**General advice:**\n${healthResponses.default.advice}\n\n**Warning:**\n${healthResponses.default.warning}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Generate response with typing effect
    setTimeout(() => {
      const botResponse = { type: 'bot', content: generateResponse(input) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleReset = () => {
    setMessages([{
      type: 'bot',
      content: "Hello! I'm Dr. Virtual, your AI health assistant. How can I help you today? You can describe your symptoms or select from the health categories below."
    }]);
    setUrgencyLevel('normal');
    setShowDiagnosticSummary(false);
  };

  const handleDiseaseClick = (disease) => {
    setInput(disease);
    setShowCategories(false);
  };
  
  const saveResponse = (message) => {
    if (message.type === 'bot') {
      setSavedResponses(prev => [...prev, message.content]);
    }
  };
  
  const handleSymptomToggle = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };
  
  const analyzeSymptoms = () => {
    if (symptoms.length === 0) return;
    
    setIsTyping(true);
    
    setTimeout(() => {
      // Simple logic to determine possible conditions based on symptoms
      let possibleConditions = [];
      
      if (symptoms.includes('Fever') && symptoms.includes('Cough')) {
        possibleConditions.push('Flu');
        if (symptoms.includes('Shortness of breath')) {
          possibleConditions.push('COVID-19');
          possibleConditions.push('Pneumonia');
        }
      }
      
      if (symptoms.includes('Rash')) {
        if (symptoms.includes('Fever')) {
          possibleConditions.push('Allergic reaction');
          possibleConditions.push('Viral infection');
        } else {
          possibleConditions.push('Contact dermatitis');
          possibleConditions.push('Eczema');
        }
      }
      
      if (symptoms.includes('Headache')) {
        if (symptoms.includes('Nausea')) {
          possibleConditions.push('Migraine');
        }
        if (symptoms.includes('Fever')) {
          possibleConditions.push('Infection');
        }
      }
      
      if (symptoms.includes('Abdominal pain')) {
        if (symptoms.includes('Nausea') || symptoms.includes('Diarrhea')) {
          possibleConditions.push('Gastroenteritis');
          possibleConditions.push('Food poisoning');
        }
      }
      
      // If no specific matches, provide generic possibilities
      if (possibleConditions.length === 0) {
        possibleConditions = ['Common cold', 'Stress-related symptoms', 'Minor viral infection'];
      }
      
      const summary = {
        symptoms: symptoms,
        possibleConditions: possibleConditions,
        recommendedActions: symptoms.length > 3 || 
                           possibleConditions.includes('COVID-19') || 
                           possibleConditions.includes('Pneumonia') 
                           ? 'Consider consulting a healthcare provider'
                           : 'Monitor symptoms and rest',
        urgency: symptoms.includes('Chest pain') || 
                symptoms.includes('Shortness of breath') || 
                (symptoms.includes('Fever') && symptoms.length > 3)
                ? 'high'
                : 'medium'
      };
      
      setDiagnosticSummary(summary);
      setShowDiagnosticSummary(true);
      setShowSymptomChecker(false);
      setUrgencyLevel(summary.urgency);
      
      // Add the analysis to chat
      const analysisMessage = `**Symptom Analysis**\n\nBased on your reported symptoms: ${symptoms.join(', ')}\n\n**Possible conditions to discuss with your doctor:**\n${possibleConditions.join('\n')}\n\n**Recommended action:**\n${summary.recommendedActions}\n\n**Note:** This is not a diagnosis. Please consult a healthcare professional for proper evaluation.`;
      
      setMessages(prev => [...prev, { type: 'bot', content: analysisMessage }]);
      setIsTyping(false);
      setSymptoms([]);
    }, 2000);
  };
  
  const handleScheduleAppointment = () => {
    const appointmentMessage = { 
      type: 'bot', 
      content: "I've noted your interest in scheduling an appointment. To connect with a real healthcare provider, you would typically:\n\n1. Contact your primary care physician\n2. Use a telemedicine service\n3. Visit an urgent care facility if needed\n\nWould you like me to provide more information about any of these options?"
    };
    setMessages(prev => [...prev, appointmentMessage]);
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Bullet points
        if (line.trim().startsWith('- ')) {
          return `<li>${line.trim().substring(2)}</li>`;
        }
        
        return line;
      })
      .join('<br/>');
  };

  const getUrgencyColor = (level) => {
    switch(level) {
      case 'high':
        return 'from-red-500 to-rose-600';
      case 'medium-high':
        return 'from-orange-500 to-amber-600';
      case 'medium':
        return 'from-yellow-500 to-amber-600';
      case 'low':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-[#4DA1A9] to-[#2E5077]';
    }
  };

  return (
    <div className={`max-w-4xl mx-auto h-[700px] flex flex-col rounded-lg shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Enhanced Header */}
      <div className={`bg-gradient-to-br ${getUrgencyColor(urgencyLevel)} text-white p-6 flex items-center justify-between relative overflow-hidden`}>
        <div className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Virtual Doctor</h1>
            <p className="text-sm opacity-90">Your AI Health Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button 
            onClick={() => setShowSymptomChecker(true)}
            className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Symptom Checker
          </button>
          
          <button 
            onClick={() => setShowCategories(!showCategories)}
            className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2"
          >
            <Info className="h-4 w-4" />
            Health Categories
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/20 filter blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-white/10 filter blur-3xl"></div>
        </div>
      </div>

      {/* Health Categories Dropdown */}
      {showCategories && (
        <div className={`p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} animate-fadeIn`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Health Categories</h3>
            <button onClick={() => setShowCategories(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(healthCategories).map(([category, diseases]) => (
              <div key={category} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <h4 className="font-medium mb-2 text-sm">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {diseases.map(disease => (
                    <button
                      key={disease}
                      onClick={() => handleDiseaseClick(disease)}
                      className={`px-3 py-1 text-xs rounded-full 
                        ${darkMode 
                          ? 'bg-gray-600 hover:bg-indigo-600 text-gray-200 hover:text-white' 
                          : 'bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700'} 
                        transition-all duration-300 flex items-center gap-1`}
                    >
                      {disease.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symptom Checker Modal */}
      {showSymptomChecker && (
        <div className={`absolute inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn`}>
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowSymptomChecker(false)}></div>
          <div className={`relative max-w-lg w-full rounded-2xl shadow-2xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Symptom Checker</h3>
              <button onClick={() => setShowSymptomChecker(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="mb-4 text-sm opacity-75">Select the symptoms you're experiencing:</p>
            
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto mb-6">
              {availableSymptoms.map(symptom => (
                <div key={symptom} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={symptom} 
                    checked={symptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="mr-2 h-4 w-4 accent-indigo-600"
                  />
                  <label htmlFor={symptom} className="text-sm">{symptom}</label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setShowSymptomChecker(false)}
                className={`px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'}`}
              >
                Cancel
              </button>
              <button 
                onClick={analyzeSymptoms}
                disabled={symptoms.length === 0}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white ${symptoms.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-violet-700'}`}
              >
                Analyze Symptoms
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Container with Enhanced Styling */}
      <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                  msg.type === 'user' 
                    ? `bg-gradient-to-br ${getUrgencyColor(urgencyLevel)} text-white`
                    : darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                } relative group`}
              >
                <p 
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                ></p>
                
                {msg.type === 'bot' && (
                  <div className="absolute -right-3 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => saveResponse(msg)}
                      className="p-2 bg-indigo-100 text-indigo-600 rounded-full shadow-md hover:bg-indigo-200 transition-colors"
                      title="Save this information"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {msg.type === 'bot' && (
                  <div className="mt-2 text-xs opacity-50">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className={`flex items-center gap-2 ${darkMode ? 'text-indigo-400' : 'text-[#4DA1A9]'} animate-pulse`}>
              <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-[#4DA1A9]'} animate-bounce`}></div>
              <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-[#4DA1A9]'} animate-bounce delay-100`}></div>
              <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-[#4DA1A9]'} animate-bounce delay-200`}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Interactive Action Bar */}
      <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className={`
