import { useState, useEffect } from 'react';
import axios from 'axios';

const UploadTemplate = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [templateLink, setTemplateLink] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:8767/api/v1/getCategory');
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8767/api/v1/templates', {
        category: selectedCategory,
        link:templateLink,
      });
      alert('Template Uploaded');
      setTemplateLink('');
      setSelectedCategory('');
    } catch (error) {
      console.error(error);
      alert('Upload Failed');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">Upload New Template</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            required
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <input
            type="url"
            required
            placeholder="Template Image Link"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={templateLink}
            onChange={(e) => setTemplateLink(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 font-bold transition duration-300"
          >
            Upload Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTemplate;
