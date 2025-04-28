

import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data } = await axios.get('http://localhost:8767/api/v1/templates');
      setTemplates(data.templates);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8767/api/v1/getCategory');
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTemplates = selectedCategory
    ? templates.filter((t) => t.category === selectedCategory)
    : templates;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4   fixed w-full top-0 left-0 z-50 shadow-lg">
        <div className="flex justify-between items-center ">
          {/* Logo or Site Name */}
          <div className="text-2xl font-bold text-white">
          <img
                src="https://byteminders.org/assets/Byteminders%20white.png"
                alt="ByteMinders Logo"
                className="w-40"
              />
          </div>
          
          {/* Navbar Links for larger screens */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="#explore-templates" className="hover:text-gray-400">Explore Templates</a>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-64 h-full bg-gray-800 p-6 space-y-4 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)} // Close the menu when clicked
              className="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <a href="/" className="block text-white hover:text-gray-400">Home</a>
          <a href="#explore-templates" className="block text-white hover:text-gray-400">Explore Templates</a>
          <a href="#contact" className="block text-white hover:text-gray-400">Contact</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20"> {/* Added padding to avoid navbar overlap */}
        <h1 className="text-4xl font-bold mb-8 text-center" id="explore-templates">
          Explore Templates
        </h1>

        <div className="flex justify-center mb-10">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              template.link ? (
                <a
                  key={template._id}
                  href={template.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  <div className="relative w-full h-48 bg-gray-700">
                    <img
                      src={`https://shot.screenshotapi.net/screenshot?token=T21JDMR-6CZM9T5-JNYSFBW-GG91SR6&url=${encodeURIComponent(template.link)}&output=image&file_type=png&wait_for_event=load`}
                      alt="Website Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{template.category}</h2>
                  </div>
                </a>
              ) : null
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-400">No templates found.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://byteminders.org/assets/Byteminders%20white.png"
                alt="ByteMinders Logo"
                className="w-40"
              />
            </div>
            <p className="text-gray-400 text-sm">
              ByteMinders is dedicated to providing top-notch digital solutions for businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-orange-400">Home</a></li>
              <li><a href="#about" className="hover:text-orange-400">About</a></li>
              <li><a href="#contact" className="hover:text-orange-400">Contact</a></li>
              <li><a href="#services" className="hover:text-orange-400">Services</a></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-orange-400"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-orange-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-orange-400"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-orange-400"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Line */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          © 2025 ByteMinders. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
