import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "your_web3forms_access_key", // Replace with your actual Web3Forms access key
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setError("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100" id="contact">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Left Side - Welcome Section */}
          <div className="lg:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-500 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg opacity-90 mb-6">
              We'd love to hear from you! Let us know how we can help.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <span className="text-teal-300">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="..." />
                  </svg>
                </span>
                <p>Quick Response Times</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-teal-300">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="..." />
                  </svg>
                </span>
                <p>Friendly Support Team</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-white font-semibold text-lg ${
                  isSubmitted
                    ? "bg-green-500"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
