import React from 'react';
import { Link } from 'react-router-dom';


const DoctorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4F0] to-[#E6E4E0] flex items-center justify-center py-10" id='doctors'>
      <div className="container mx-auto px-6 py-12 bg-white/80 shadow-lg shadow-[#4DA1A9]/30 rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
          {/* Doctor's Image */}
          <div className="mb-6 md:mb-0">
            {/* <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="Dr. Praful Waghade"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-8 border-[#4DA1A9] shadow-xl transform hover:scale-105 transition duration-500 ease-in-out"
            /> */}
          </div>

          {/* Doctor's Text Section */}
          <div>
            {/* Doctor's Name and Specialization */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2E5077] mb-4">
                Dr. Praful Waghade
              </h1>
              <p className="text-xl md:text-2xl text-[#4DA1A9] font-medium">
                Dermatologist & Skin Specialist
              </p>
            </div>

            {/* Doctor's Bio */}
            <div className="mb-12">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                With over a decade of experience in treating a wide range of skin and hair conditions, Dr. Praful Waghade is a trusted name in dermatology in Akola. He offers a compassionate and personalized approach to each patient, ensuring that every treatment plan is tailored to individual needs. Dr. Waghade stays up-to-date with the latest advancements in dermatology to provide the best care possible.
              </p>
            </div>

            {/* Experience Section */}
            <div className="bg-gradient-to-br from-[#4DA1A9] to-[#2E5077] text-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Experience & Expertise
              </h2>
              <ul className="list-disc pl-6 md:pl-8 space-y-3 text-lg">
                <li>10+ years of experience in dermatology</li>
                <li>Specialized in treating acne, eczema, psoriasis, and more</li>
                <li>Expert in advanced skin treatments and technologies</li>
                <li>Committed to providing personalized care and treatments</li>
                <li>Focused on patient education and long-term skin health</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2E5077] mb-4">
                Contact Information
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                You can visit Waghade Skin Clinic for consultations and treatments or contact us using the details below:
              </p>
              <p className="text-lg text-gray-700 font-semibold mb-4">
                📍 Address: Akola, Maharashtra
              </p>
              <p className="text-lg text-gray-700 font-semibold mb-4">
                📞 Phone: <span className="text-[#4DA1A9]">+91 123 456 7890</span>
              </p>
              <Link to="/bookappointment"
                href="mailto:dr.praful@example.com"
                className="inline-block mt-4 px-8 py-4 bg-[#2E5077] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-[#4DA1A9] transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
