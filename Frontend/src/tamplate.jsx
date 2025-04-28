import { useState, useEffect } from 'react';
import axios from 'axios';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Templates</h1>

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
            <div
              key={template._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={template.templateLink}
                alt="Template Preview"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{template.category}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-400">No templates found.</p>
        )}
      </div>
    </div>
  );
};

export default Templates;
