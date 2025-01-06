import React, { useState } from 'react';
import { MessageCircle, Send, RefreshCcw } from 'lucide-react';

const VirtualDoctor = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm Dr. Virtual, your AI health assistant. Please describe your symptoms or health concerns, and I'll do my best to provide information and guidance. Remember, I'm not a replacement for real medical care - always consult a healthcare professional for serious concerns."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const healthResponses = {
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
    },
    vitiligo: {
      symptoms: "Loss of skin color, leading to white patches on different parts of the body.",
      advice: "- Protect skin from the sun\n- Use cosmetics to conceal spots\n- Consider treatments like topical steroids",
      warning: "Consult a healthcare provider for treatment options."
    },
    fungal_infections: {
      symptoms: "Red, itchy, scaly patches on the skin, sometimes with blisters.",
      advice: "- Keep affected area dry and clean\n- Use antifungal creams\n- Avoid sharing personal items",
      warning: "Seek medical help if infection spreads or doesn't improve."
    },
    impetigo: {
      symptoms: "Red sores that can ooze and crust over, often around the nose and mouth.",
      advice: "- Wash affected areas gently\n- Apply prescribed antibiotic ointment\n- Avoid scratching",
      warning: "Contact a healthcare professional for prescription treatments."
    },
    skin_cancer: {
      symptoms: "Changes in the appearance of moles or skin lesions, such as irregular edges or unusual growth.",
      advice: "- Regularly check your skin for changes\n- Apply sunscreen daily\n- Avoid tanning beds",
      warning: "Seek immediate medical attention if you notice changes in existing moles or skin lesions."
    },
    contact_dermatitis: {
      symptoms: "Red, itchy rash caused by direct contact with an irritant or allergen.",
      advice: "- Avoid the substance that caused the rash\n- Use anti-itch creams\n- Take cool baths",
      warning: "Consult a healthcare provider if rash worsens or spreads."
    },
    hives: {
      symptoms: "Raised, red, itchy welts on the skin, often triggered by stress or allergens.",
      advice: "- Take antihistamines\n- Apply cool compresses\n- Avoid known triggers",
      warning: "If hives persist or are accompanied by difficulty breathing, seek immediate medical attention."
    },
    alopecia_areata: {
      symptoms: "Sudden hair loss in small, round patches on the scalp or body.",
      advice: "- Consider corticosteroid treatments\n- Try wigs or hats to cover hair loss\n- Stress management may help",
      warning: "Consult a dermatologist for treatment options and management."
    },
    male_pattern_baldness: {
      symptoms: "Gradual thinning of hair, typically starting at the temples or crown of the head.",
      advice: "- Minoxidil can help slow hair loss\n- Hair transplant surgery may be an option\n- Wear a hat or use hair fibers for coverage",
      warning: "See a dermatologist for personalized treatment options."
    },
    female_pattern_hair_loss: {
      symptoms: "Thinning of hair along the crown or parting area, without bald spots.",
      advice: "- Use volumizing shampoos\n- Consider medications like minoxidil\n- Avoid tight hairstyles that stress the hair",
      warning: "Consult a healthcare provider to rule out underlying causes."
    },
    telogen_effluvium: {
      symptoms: "Temporary hair shedding due to stress, illness, or hormonal changes.",
      advice: "- Practice stress-reducing activities\n- Avoid harsh hair treatments\n- Maintain a balanced diet",
      warning: "Consult a doctor if hair loss continues for more than six months."
    },
    trichotillomania: {
      symptoms: "Compulsive hair-pulling, often leading to noticeable hair loss.",
      advice: "- Seek therapy or counseling\n- Practice relaxation techniques\n- Use behavioral interventions",
      warning: "Consult a mental health professional for therapy options."
    },
    dandruff: {
      symptoms: "Flaky, itchy scalp with dry skin or oily buildup.",
      advice: "- Use anti-dandruff shampoo\n- Avoid scratching the scalp\n- Keep scalp moisturized",
      warning: "Seek medical advice if dandruff persists or worsens."
    },
    tinea_capitis: {
      symptoms: "Scaly patches on the scalp, sometimes with hair loss.",
      advice: "- Use antifungal shampoo or treatment\n- Avoid sharing combs or hats\n- Keep scalp dry and clean",
      warning: "Consult a doctor if symptoms don't improve with over-the-counter treatment."
    },
    folliculitis: {
      symptoms: "Red, inflamed hair follicles, often with pimples or pustules.",
      advice: "- Wash the area gently\n- Apply warm compresses\n- Use antibiotic ointment if prescribed",
      warning: "If infection persists or spreads, see a healthcare provider."
    },
    scalp_psoriasis: {
      symptoms: "Scaly, red patches on the scalp, often accompanied by itching.",
      advice: "- Use medicated shampoos\n- Apply topical corticosteroids\n- Avoid scratching",
      warning: "Consult a dermatologist for treatment options."
    },
    hirsutism: {
      symptoms: "Excessive hair growth on the face, chest, or back in women.",
      advice: "- Consider hair removal options like waxing or shaving\n- Hormonal treatments may be effective\n- Maintain a healthy diet and weight",
      warning: "Consult a healthcare provider to determine the underlying cause."
    },
    default: {
      response: "I understand you're experiencing health concerns. While I can provide general information, it's important to consult with a healthcare provider for proper diagnosis and treatment. They can perform a physical examination and order any necessary tests.",
      advice: "In the meantime:\n- Keep track of your symptoms\n- Note when they started\n- Document any triggers or patterns\n- Maintain good general health practices",
      warning: "If you experience severe symptoms or feel your condition is urgent, please seek immediate medical attention."
    }
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const disease = Object.keys(healthResponses).find(disease => input.includes(disease));
    if (disease) {
      return `${healthResponses[disease].symptoms}\n\nRecommended actions:\n${healthResponses[disease].advice}\n\nWarning:\n${healthResponses[disease].warning}`;
    } else {
      return `${healthResponses.default.response}\n\nGeneral advice:\n${healthResponses.default.advice}\n\nWarning:\n${healthResponses.default.warning}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: generateResponse(input) }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col border rounded-lg shadow-md">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center gap-2">
        <MessageCircle className="h-6 w-6" />
        <h1 className="text-lg font-bold">Virtual Doctor Consultation</h1>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`bg-${message.type === 'user' ? 'blue' : 'gray'}-200 p-3 rounded-lg max-w-xs`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms"
              className="flex-1 p-2 border rounded-lg"
            />
            <button type="submit" className="text-blue-500">
              <Send />
            </button>
            <button type="button" onClick={handleReset} className="text-gray-500">
              <RefreshCcw />
            </button>
          </form>
          {isTyping && (
            <div className="text-gray-500 text-sm mt-2">Doctor is typing...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualDoctor;