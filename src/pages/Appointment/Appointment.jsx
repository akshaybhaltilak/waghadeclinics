import React, { useState } from "react";
import { Calendar, Clock, MessageSquare, Phone, User, CheckCircle } from "lucide-react";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulating EmailJS send
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      setFormData({
        name: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          {/* Left Side - Illustration */}
          <div className="lg:w-1/2 relative bg-gradient-to-br from-indigo-500 to-blue-500 p-12 text-white">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <img
                src="/api/placeholder/800/1000"
                alt="Background pattern"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-6">Welcome to Our Medical Center</h1>
              <p className="text-xl mb-8 opacity-90">Schedule your appointment with our expert physicians</p>
              
              {/* Benefits Section */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Expert Care</h3>
                    <p className="opacity-80">Get treatment from our certified specialists</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Flexible Schedule</h3>
                    <p className="opacity-80">Choose from various available time slots</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Modern Facilities</h3>
                    <p className="opacity-80">State-of-the-art medical equipment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Book Your Appointment</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-2 text-indigo-600" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-indigo-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Date and Time Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 mr-2 text-indigo-600" />
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                      placeholder="Tell us about your concerns..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full p-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
                    isSuccess
                      ? "bg-green-500"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Appointment Scheduled!
                    </span>
                  ) : (
                    "Schedule Appointment"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
